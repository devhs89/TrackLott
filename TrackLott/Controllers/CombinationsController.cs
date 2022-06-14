using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TrackLott.Constants;
using TrackLott.Data;
using TrackLott.DTOs;
using TrackLott.Extensions;
using TrackLott.Models;

namespace TrackLott.Controllers;

public class CombinationsController : BaseApiController
{
  private readonly TrackLottDbContext _dbContext;

  public CombinationsController(TrackLottDbContext dbContext)
  {
    _dbContext = dbContext;
  }

  [HttpPost("add")]
  [Authorize]
  public async Task<ActionResult<string>> AddCombo(CombinationDto[] combinationDto)
  {
    var appUser = await GetUser();

    if (appUser == null)
      return BadRequest(new ErrorResponseDto()
        { Code = ErrorCodes.InvalidUser.ToString(), Description = "User not found" });

    var missingLottoNames = 0;
    var saveResp = "Combination Saved";
    var allCombinations = new List<Combination>();

    foreach (var combo in combinationDto)
    {
      var combination = new Combination()
      {
        AppUserId = appUser.Id,
        DateAdded = combo.DateAdded,
        PickedNumbers = JsonSerializer.Serialize(combo.PickedNumbers,
          new JsonSerializerOptions() { PropertyNamingPolicy = JsonNamingPolicy.CamelCase }),
      };

      if (combo.LottoName != null)
      {
        var lottoName = combo.LottoName.ToLower();

        if (lottoName.Equals("MonWedLotto") || lottoName.Equals("OzLotto") || lottoName.Equals("Powerball") ||
            lottoName.Equals("TattsLotto") || lottoName.Equals("SetForLife744") || lottoName.Equals("Super66"))
        {
          var lottoResult = CheckLottery(lottoName).Result;
          combination.LottoResultProductId = lottoResult?.ProductId;
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

    await _dbContext.Combinations.AddRangeAsync(allCombinations);
    allCombinations.Clear();

    await _dbContext.SaveChangesAsync();
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
        { Code = ErrorCodes.InvalidUser.ToString(), Description = "User not found" });

    var lotteryResult = await CheckLottery(lottoName);

    if (lotteryResult == null)
      return BadRequest(new ErrorResponseDto()
        { Code = ErrorCodes.NoLatestLotto.ToString(), Description = "No last draw to match combinations against" });

    var combinationsCount =
      await _dbContext.Combinations.CountAsync(combo =>
        combo.LottoResultProductId == lotteryResult.ProductId && combo.AppUserId == appUser.Id);

    if (combinationsCount < 1)
      return BadRequest(new ErrorResponseDto()
        { Code = ErrorCodes.NoCombos.ToString(), Description = "No matching combinations found" });

    var combinationsResult = _dbContext.Combinations
      .Where(combo => combo.LottoResultProductId == lotteryResult.ProductId && combo.AppUserId == appUser.Id)
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

    return new MatchComboResponseDto() { CombinationsList = matchingCombos, totalMatches = combinationsCount };
  }

  private async Task<AppUser?> GetUser()
  {
    var userName = User.GetUserName();

    var appUser =
      await _dbContext.Users.SingleOrDefaultAsync(member => userName != null && member.UserName.Equals(userName));

    return appUser;
  }

  private async Task<LottoResultModel?> CheckLottery(string lottoName)
  {
    return await _dbContext.LottoResults.FirstOrDefaultAsync(result => result.ProductId.Equals(lottoName.ToLower()));
  }
}