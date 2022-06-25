using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TrackLott.Constants;
using TrackLott.Data;
using TrackLott.Interfaces;
using TrackLott.Models.DataModels;
using TrackLott.Models.DTOs;

namespace TrackLott.Controllers;

public class CombinationController : BaseApiController
{
  private readonly TrackLottDbContext _dbContext;
  private readonly IUserClaimsService _userClaimsService;
  private readonly ILogger<CombinationController> _logger;

  public CombinationController(TrackLottDbContext dbContext, IUserClaimsService userClaimsService,
    ILogger<CombinationController> logger)
  {
    _dbContext = dbContext;
    _userClaimsService = userClaimsService;
    _logger = logger;
  }

  [HttpPost(EndRoute.Add)]
  public async Task<ActionResult<string>> AddCombo(CombinationDto[] combinations)
  {
    var user = await GetUser();
    if (user.Value == null) return Unauthorized(ResponseMsg.UserNotExist);

    var allCombinations = new List<CombinationModel>();
    foreach (var combo in combinations)
    {
      var combination = new CombinationModel()
      {
        UserModelId = user.Value.Id,
        DateAdded = combo.DateAdded,
        PickedNumbers = combo.PickedNumbers
      };

      LottoResultModel? lottoResult = null;
      if (combo.LottoName != null) lottoResult = await GetFirstMatchingLotto(combo.LottoName);

      _logger.LogCritical(combo.LottoName);
      _logger.LogCritical(lottoResult?.DisplayName);

      if (lottoResult != null)
      {
        combination.LottoProductId = lottoResult.ProductId;
        combination.LottoDrawNumber = lottoResult.DrawNumber;
      }

      allCombinations.Add(combination);
    }

    await _dbContext.Combinations.AddRangeAsync(allCombinations);
    allCombinations.Clear();
    await _dbContext.SaveChangesAsync();
    return ResponseMsg.ComboSaved;
  }

  [HttpPost(EndRoute.MatchCombos)]
  public async Task<ActionResult<MatchComboResponseDto>> GetMatchingCombos(string productId, int pageIndex,
    int pageSize)
  {
    var user = await GetUser();
    if (user.Value == null) return Unauthorized(ResponseMsg.UserNotExist);

    var lottoResult = await GetFirstMatchingLotto(productId);
    if (lottoResult == null) return NotFound(ResponseMsg.NoLatestLottoResult);

    var totalResults = await _dbContext.Combinations.Where(model =>
      model.LottoProductId != null &&
      model.LottoProductId.ToLower().Equals(lottoResult.ProductId.ToLower()) &&
      model.UserModelId.Equals(user.Value.Id)).CountAsync();

    var combinationsResult = await _dbContext.Combinations.Where(model =>
        model.LottoProductId != null &&
        model.LottoProductId.ToLower().Equals(lottoResult.ProductId.ToLower()) &&
        model.UserModelId.Equals(user.Value.Id))
      .Skip(pageIndex * pageSize)
      .Take(pageSize)
      .ToListAsync();
    if (!combinationsResult.Any()) return NotFound(ResponseMsg.NoMatchingCombinations);

    var matchingCombos = combinationsResult.Select(combination =>
        new MatchingCombinationDto { DateAdded = combination.DateAdded, PickedNumbers = combination.PickedNumbers })
      .ToList();
    return new MatchComboResponseDto { CombinationsList = matchingCombos, totalMatches = totalResults };
  }

  private async Task<ActionResult<UserModel?>> GetUser()
  {
    var userEmail = _userClaimsService.GetNormalisedEmail();
    if (userEmail == null) return Unauthorized(ResponseMsg.InvalidToken);
    return await _dbContext.Users.SingleOrDefaultAsync(model => model.NormalizedEmail.Equals(userEmail));
  }

  private async Task<LottoResultModel?> GetFirstMatchingLotto(string lottoName)
  {
    return await _dbContext.LottoResults.FirstOrDefaultAsync(result =>
      result.ProductId.ToLower().Equals(lottoName.ToLower()));
  }
}