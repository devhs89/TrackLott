using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TrackLott.Constants;
using TrackLott.Data;
using TrackLott.Interfaces;
using TrackLott.Models.DataModels;
using TrackLott.Models.DTOs;

namespace TrackLott.Controllers;

[Authorize(AuthPolicyName.RequireAuthenticatedUser)]
public class CombinationController : BaseApiController
{
  private readonly TrackLottDbContext _dbContext;
  private readonly IUserClaimsService _userClaimsService;

  public CombinationController(TrackLottDbContext dbContext, IUserClaimsService userClaimsService)
  {
    _dbContext = dbContext;
    _userClaimsService = userClaimsService;
  }

  [HttpPost(EndRoute.Add)]
  public async Task<ActionResult<string>> AddCombo(CombinationDto[] combinationDto)
  {
    var appUser = await GetUser();
    if (appUser == null)
      return BadRequest(ResponseMsg.UserNotExist);

    var missingLottoNames = 0;
    var saveResp = "Combination Saved";
    var allCombinations = new List<CombinationModel>();

    foreach (var combo in combinationDto)
    {
      var combination = new CombinationModel()
      {
        UserModelId = appUser.Id,
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

  [HttpPost(EndRoute.MatchCombos)]
  public async Task<ActionResult<MatchComboResponseDto>> GetMatchingCombos(string lottoName, int pageIndex,
    int pageSize)
  {
    var user = await GetUser();
    if (user == null)
      return BadRequest(ResponseMsg.UserNotExist);

    var lotteryResult = await CheckLottery(lottoName);
    if (lotteryResult == null)
      return BadRequest(ResponseMsg.NoLatestLottoResult);

    var combinationsCount =
      await _dbContext.Combinations.CountAsync(combo =>
        combo.LottoResultProductId == lotteryResult.ProductId && combo.UserModelId == user.Id);

    if (combinationsCount < 1)
      return BadRequest(ResponseMsg.NoMatchingCombinations);

    var combinationsResult = _dbContext.Combinations
      .Where(combo => combo.LottoResultProductId == lotteryResult.ProductId && combo.UserModelId == user.Id)
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

  private async Task<UserModel?> GetUser()
  {
    var userName = _userClaimsService.GetNormalisedEmail();
    ;

    var user =
      await _dbContext.Users.SingleOrDefaultAsync(model => userName != null && model.UserName.Equals(userName));

    return user;
  }

  private async Task<LottoResultModel?> CheckLottery(string lottoName)
  {
    return await _dbContext.LottoResults.FirstOrDefaultAsync(result => result.ProductId.Equals(lottoName.ToLower()));
  }
}