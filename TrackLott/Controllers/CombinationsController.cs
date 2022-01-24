using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TrackLott.Data;
using TrackLott.DTOs;
using TrackLott.Extensions;
using TrackLott.Models;

namespace TrackLott.Controllers;

public class CombinationsController : BaseApiController
{
  private readonly TrackLottContext _context;

  public CombinationsController(TrackLottContext context)
  {
    _context = context;
  }

  [HttpPost("add")]
  [Authorize]
  public async Task<ActionResult<string>> AddCombo(CombinationDto combinationDto)
  {
    var appUser = await GetUser();

    if (appUser == null) return BadRequest("User not found");

    var lottoResult = CheckLottery(combinationDto.LottoName?.ToLower()).Result;

    var combination = new Combination()
    {
      DateAdded = new DateTime(combinationDto.DateAdded.Millisecond),
      PickedNumbers = JsonSerializer.Serialize(combinationDto.PickedNumbers),
      MemberId = appUser.Id
    };

    if (combinationDto.OptionalNumbers != null)
      combination.OptionalNumbers = JsonSerializer.Serialize(combinationDto.OptionalNumbers);
    if (lottoResult != null) combination.LotteryResultId = lottoResult.Id;

    await _context.Combinations.AddAsync(combination);
    await _context.SaveChangesAsync();

    return lottoResult == null
      ? "Invalid or missing lottery name. Combination saved without the lottery name."
      : "Combination Saved";
  }

  [HttpPost("match-combos")]
  [Authorize]
  public async Task<ActionResult<List<MatchCombinationDto>>> GetMatchingCombos(string lottoName)
  {
    var appUser = await GetUser();

    if (appUser == null) return BadRequest("User not found");

    var matchingLottoName =
      await _context.LotteryResults.FirstOrDefaultAsync(result => result.DrawName.Equals(lottoName.ToLower()));

    if (matchingLottoName == null) return BadRequest("No last draw to match combinations against");


    var combinationsResult = _context.Combinations
      .Where(result => result.LotteryResultId == matchingLottoName.Id && result.MemberId == appUser.Id);

    var matchingCombos = new List<MatchCombinationDto>();

    foreach (var combination in combinationsResult)
    {
      matchingCombos.Add(new MatchCombinationDto()
      {
        DateAdded = combination.DateAdded,
        PickedNumbers = combination.PickedNumbers,
        OptionalNumbers = combination.OptionalNumbers
      });
    }

    return matchingCombos;
  }

  private async Task<Member?> GetUser()
  {
    var userId = User.GetUserId();

    // TODO - Find a way to make this Guid a readonly static property to increase performance
    var appUser =
      await _context.Users.SingleOrDefaultAsync(member => userId != null && member.Id.Equals(Guid.Parse(userId)));

    return appUser;
  }

  private async Task<LotteryResult?> CheckLottery(string? lottoName)
  {
    return await _context.LotteryResults.Where(result => result.DrawName.Equals(lottoName))
      .FirstOrDefaultAsync();
  }
}