using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Extensions;
using TrackLott.Constants;
using TrackLott.Data;
using TrackLott.DTOs;
using TrackLott.Entities;

namespace TrackLott.Controllers;

public class LottoResultController : BaseApiController
{
  private readonly TrackLottContext _context;

  public LottoResultController(TrackLottContext context)
  {
    _context = context;
  }

  [HttpPost("saveRecentDraw")]
  [Authorize(Roles = "Admin")]
  public async Task<ActionResult<string>> SaveRecentDraw(LottoResultDto lottoResultDto)
  {
    var result = await _context.LotteryResults.AnyAsync(lr => lr.DrawNumber == lottoResultDto.DrawNumber);

    if (result)
      return BadRequest(new ErrorResponseDto()
      {
        Code = ErrorCodes.DuplicateRecentLotto.GetDisplayName(),
        Description = "Draw Number already present.\nUnique Constraint Failed."
      });

    await _context.LotteryResults.AddAsync(new LotteryResult()
    {
      DrawName = lottoResultDto.DrawName,
      DrawNumber = lottoResultDto.DrawNumber,
      DrawDateTime = lottoResultDto.DrawDateTime,
      WinningNumbers = JsonSerializer.Serialize(lottoResultDto.WinningNumbers),
      SuppNumbers = JsonSerializer.Serialize(lottoResultDto.SuppNumbers)
    });

    await _context.SaveChangesAsync();
    return Ok("Recent Draw Saved");
  }

  [HttpGet("getLottoResult")]
  [AllowAnonymous]
  public async Task<ActionResult<LottoResultDto>> GetLottoResult()
  {
    var result = await _context.LotteryResults.OrderByDescending(lottery => lottery.DrawDateTime)
      .FirstOrDefaultAsync();

    if (result?.Id == null)
      return NotFound(new ErrorResponseDto()
        {Code = ErrorCodes.NoLatestLotto.ToString(), Description = "No Result Found"});

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