using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TrackLott.Constants;
using TrackLott.Data;
using TrackLott.Models.DTOs;

namespace TrackLott.Controllers;

public class LottoResultController : BaseApiController
{
  private readonly TrackLottDbContext _dbContext;

  public LottoResultController(TrackLottDbContext dbContext)
  {
    _dbContext = dbContext;
  }

  [HttpGet(EndRoute.Latest)]
  [AllowAnonymous]
  public async Task<ActionResult<LottoResultDto>> GetLatestLottoResult()
  {
    var result = await _dbContext.LottoResults.OrderByDescending(lottery => lottery.DrawDate)
      .FirstOrDefaultAsync(model =>
        !model.ProductId.Equals(LottoName.SetForLife744Id) &&
        !model.ProductId.Equals(LottoName.Super66Id));

    if (result == null)
      return NotFound(ErrorResponse.NoLatestLottoResult);

    return new LottoResultDto()
    {
      DrawName = result.DisplayName,
      DrawNum = result.DrawNumber,
      DrawDate = result.DrawDate,
      WinNums = result.PrimaryNumbers.Split(',').Select(int.Parse).ToList(),
      SuppNums = result.SecondaryNumbers.Split(',').Select(int.Parse).ToList()
    };
  }
}