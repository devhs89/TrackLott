using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
    var result = await _context.LotteryResults.OrderByDescending(lottery => lottery.DrawDateTime)
      .FirstOrDefaultAsync();

    if (result?.Id == null) return NotFound("No Result Found");

    return new LottoResultDto()
    {
      DrawName = result.DrawName,
      DrawNumber = result.DrawNumber,
      DrawDateTime = result.DrawDateTime,
      WinningNumbers = result.WinningNumbers.Split(','),
      SuppNumbers = result.SuppNumbers.Split(',')
    };
  }
}