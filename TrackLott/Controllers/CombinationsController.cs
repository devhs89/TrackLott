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

    var combination = new Combination()
    {
      MemberId = appUser.Id,
      DateAdded = new DateTime(combinationDto.DateAdded.Millisecond),
      PickedNumbers = JsonSerializer.Serialize(combinationDto.PickedNumbers),
    };

    if (combinationDto.LottoName != null)
    {
      var lottoResult = CheckLottery(combinationDto.LottoName.ToLower()).Result;
      if (lottoResult == null) return BadRequest("Lottery name not found");
      combination.LotteryResultId = lottoResult.Id;
    }

    await _context.Combinations.AddAsync(combination);
    await _context.SaveChangesAsync();

    return "Combination Saved";
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
        PickedNumbers = combination.PickedNumbers
      });
    }

    return matchingCombos;
  }

  private async Task<Member?> GetUser()
  {
    var userName = User.GetUserName();

    // TODO - Find a way to make this Guid a readonly static property to increase performance
    var member =
      await _context.Users.SingleOrDefaultAsync(member => userName != null && member.UserName.Equals(userName));

    return member;
  }

  private async Task<LotteryResult?> CheckLottery(string? lottoName)
  {
    return await _context.LotteryResults.Where(result => result.DrawName.Equals(lottoName))
      .FirstOrDefaultAsync();
  }
}