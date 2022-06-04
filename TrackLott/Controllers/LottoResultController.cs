using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TrackLott.Constants;
using TrackLott.Data;
using TrackLott.DTOs;

namespace TrackLott.Controllers;

public class LottoResultController : BaseApiController
{
  private readonly TrackLottContext _context;

  public LottoResultController(TrackLottContext context)
  {
    _context = context;
  }

  [HttpGet]
  [AllowAnonymous]
  public async Task<ActionResult<LottoResultDto>> GetLottoResult()
  {
    var result = await _context.LotteryResults.OrderByDescending(lottery => lottery.DrawDate)
      .FirstOrDefaultAsync();

    if (result?.Id == null)
      return NotFound(new ErrorResponseDto()
        { Code = ErrorCodes.NoLatestLotto.ToString(), Description = "No Result Found" });

    return new LottoResultDto()
    {
      DrawName = result.ProductId,
      DrawNum = result.DrawNumber,
      DrawDate = result.DrawDate,
      WinNums = result.PrimaryNumbers.Split(','),
      SuppNums = result.SecondaryNumbers.Split(',')
    };
  }
}