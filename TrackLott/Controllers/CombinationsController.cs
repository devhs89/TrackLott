using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TrackLott.Data;
using TrackLott.DTOs;
using TrackLott.Entities;
using TrackLott.Extensions;

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
  public async Task<ActionResult<string>> AddCombo(CombinationDto[] combinationDto)
  {
    var appUser = await GetUser();

    if (appUser == null) return BadRequest("User not found");

    var saveResp = "Combination Saved";
    var allCombinations = new List<Combination>();

    foreach (var combo in combinationDto)
    {
      var combination = new Combination()
      {
        MemberId = appUser.Id,
        DateAdded = combo.DateAdded,
        PickedNumbers = JsonSerializer.Serialize(combo.PickedNumbers),
      };

      if (combo.LottoName != null)
      {
        var lottoName = combo.LottoName.ToLower();

        Console.WriteLine(lottoName);

        if (lottoName.Equals("mondaylotto") || lottoName.Equals("ozlotto") || lottoName.Equals("wednesdaylotto") ||
            lottoName.Equals("powerball") || lottoName.Equals("tattslotto"))
        {
          var lottoResult = CheckLottery(lottoName).Result;
          combination.LotteryResultId = lottoResult?.Id;
        }
        else
        {
          saveResp = "Combination saved without lottery name";
        }
      }

      allCombinations.Add(combination);
    }

    await _context.Combinations.AddRangeAsync(allCombinations);
    allCombinations.Clear();

    await _context.SaveChangesAsync();
    return saveResp;
  }

  [HttpPost("matchCombos")]
  [Authorize]
  public async Task<ActionResult<List<MatchCombinationDto>>> GetMatchingCombos(string lottoName)
  {
    var appUser = await GetUser();

    if (appUser == null) return BadRequest("User not found");

    var lotteryResult =
      await _context.LotteryResults.FirstOrDefaultAsync(result => result.DrawName.Equals(lottoName.ToLower()));

    if (lotteryResult == null) return BadRequest("No last draw to match combinations against");

    var combinationsResult = _context.Combinations
      .Where(result => result.LotteryResultId == lotteryResult.Id && result.MemberId == appUser.Id);

    if (combinationsResult.Any() == false) return BadRequest("No matching combinations found");

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