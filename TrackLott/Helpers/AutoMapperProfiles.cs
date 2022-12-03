using AutoMapper;
using TrackLott.Models;
using TrackLott.Models.DTOs;

namespace TrackLott.Helpers;

public class AutoMapperProfiles : Profile
{
  public AutoMapperProfiles()
  {
    CreateMap<RegisterDto, TrackLottUserModel>()
      .ForMember(model => model.UserName,
        expression => expression.MapFrom(dto => dto.Email));

    CreateMap<TrackLottUserModel, ProfileDto>();

    CreateMap<ProfileUpdateDto, TrackLottUserModel>()
      .ForMember(model => model.GivenName, expression =>
      {
        expression.PreCondition(dto => !string.IsNullOrWhiteSpace(dto.GivenName));
        expression.MapFrom(dto => dto.GivenName);
      })
      .ForMember(model => model.Surname, expression =>
      {
        expression.PreCondition(dto => !string.IsNullOrWhiteSpace(dto.Surname));
        expression.MapFrom(dto => dto.Surname);
      })
      .ForMember(model => model.Country, expression =>
      {
        expression.PreCondition(dto => !string.IsNullOrWhiteSpace(dto.Country));
        expression.MapFrom(dto => dto.Country);
      });

    CreateMap<LottoResultModel, LottoResultDto>();
  }
}