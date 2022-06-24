using AutoMapper;
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
  private readonly IMapper _mapper;

  public LottoResultController(TrackLottDbContext dbContext, IMapper mapper)
  {
    _dbContext = dbContext;
    _mapper = mapper;
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
      return NotFound(ResponseMsg.NoLatestLottoResult);

    return new LottoResultDto()
    {
      DisplayName = result.DisplayName,
      DrawNumber = result.DrawNumber,
      DrawDate = result.DrawDate,
      PrimaryNumbers = result.PrimaryNumbers,
      SecondaryNumbers = result.SecondaryNumbers
    };
  }
}