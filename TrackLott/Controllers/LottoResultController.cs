using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TrackLott.Constants;
using TrackLott.Data;
using TrackLott.DTOs;

namespace TrackLott.Controllers;

public class LottoResultController : BaseApiController
{
  private readonly TrackLottDbContext _dbContext;

  public LottoResultController(TrackLottDbContext dbContext)
  {
    _dbContext = dbContext;
  }

  [HttpGet("latest")]
  [AllowAnonymous]
  public async Task<ActionResult<LottoResultDto>> GetLottoResult()
  {
    var result = await _dbContext.LottoResults.OrderByDescending(lottery => lottery.DrawDate)
      .FirstOrDefaultAsync(model => !model.ProductId.Equals("SetForLife744") && !model.ProductId.Equals("Super66"));

    if (result == null)
      return NotFound(new ErrorResponseDto()
        { Code = ErrorCodes.NoLatestLotto.ToString(), Description = "No Result Found" });

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