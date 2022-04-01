using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TrackLott.Constants;
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

    if (appUser == null)
      return BadRequest(new ErrorResponseDto()
        {Code = ErrorCodes.InvalidUser.ToString(), Description = "User not found"});

    var missingLottoNames = 0;
    var saveResp = "Combination Saved";
    var allCombinations = new List<Combination>();

    foreach (var combo in combinationDto)
    {
      var combination = new Combination()
      {
        MemberId = appUser.Id,
        DateAdded = combo.DateAdded,
        PickedNumbers = JsonSerializer.Serialize(combo.PickedNumbers,
          new JsonSerializerOptions() {PropertyNamingPolicy = JsonNamingPolicy.CamelCase}),
      };

      if (combo.LottoName != null)
      {
        var lottoName = combo.LottoName.ToLower();

        if (lottoName.Equals("monday lotto") || lottoName.Equals("oz lotto") || lottoName.Equals("wednesday lotto") ||
            lottoName.Equals("powerball") || lottoName.Equals("tatts lotto"))
        {
          var lottoResult = CheckLottery(lottoName).Result;
          combination.LotteryResultId = lottoResult?.Id;
        }
        else
        {
          missingLottoNames++;
        }
      }
      else
      {
        missingLottoNames++;
      }

      allCombinations.Add(combination);
    }


    if (missingLottoNames > 0) saveResp = missingLottoNames + " combinations saved without lottery name";

    await _context.Combinations.AddRangeAsync(allCombinations);
    allCombinations.Clear();

    await _context.SaveChangesAsync();
    return saveResp;
  }

  [HttpPost("matchCombos")]
  [Authorize]
  public async Task<ActionResult<MatchComboResponseDto>> GetMatchingCombos(string lottoName, int pageIndex,
    int pageSize)
  {
    var appUser = await GetUser();

    if (appUser == null)
      return BadRequest(new ErrorResponseDto()
        {Code = ErrorCodes.InvalidUser.ToString(), Description = "User not found"});

    var lotteryResult = await CheckLottery(lottoName);

    if (lotteryResult == null)
      return BadRequest(new ErrorResponseDto()
        {Code = ErrorCodes.NoLatestLotto.ToString(), Description = "No last draw to match combinations against"});

    var combinationsCount =
      await _context.Combinations.CountAsync(combo =>
        combo.LotteryResultId == lotteryResult.Id && combo.MemberId == appUser.Id);

    if (combinationsCount < 1)
      return BadRequest(new ErrorResponseDto()
        {Code = ErrorCodes.NoCombos.ToString(), Description = "No matching combinations found"});

    var combinationsResult = _context.Combinations
      .Where(combo => combo.LotteryResultId == lotteryResult.Id && combo.MemberId == appUser.Id)
      .OrderByDescending(combo => combo.DateAdded).Skip(pageIndex * pageSize).Take(pageSize);

    var matchingCombos = new List<MatchingCombinationDto>();

    foreach (var combination in combinationsResult)
    {
      matchingCombos.Add(new MatchingCombinationDto()
      {
        DateAdded = combination.DateAdded,
        PickedNumbers = combination.PickedNumbers
      });
    }

    return new MatchComboResponseDto() {CombinationsList = matchingCombos, totalMatches = combinationsCount};
  }

  private async Task<Member?> GetUser()
  {
    var userName = User.GetUserName();

    var member =
      await _context.Users.SingleOrDefaultAsync(member => userName != null && member.UserName.Equals(userName));

    return member;
  }

  private async Task<LotteryResult?> CheckLottery(string lottoName)
  {
    return await _context.LotteryResults.FirstOrDefaultAsync(result => result.DrawName.Equals(lottoName.ToLower()));
  }
}