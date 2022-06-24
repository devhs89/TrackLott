using AutoMapper;
using TrackLott.Models.DataModels;
using TrackLott.Models.DTOs;

namespace TrackLott.Helpers;

public class AutoMapperProfiles : Profile
{
  public AutoMapperProfiles()
  {
    CreateMap<RegisterDto, UserModel>()
      .ForMember(model => model.UserName,
        expression => expression.MapFrom(dto => dto.Email))
      .ForMember(model => model.Dob,
        expression => expression.MapFrom(dto => DateOnly.FromDateTime(DateTime.Parse(dto.Dob))));

    CreateMap<UserModel, ProfileDto>()
      .ForMember(dto => dto.Dob,
        expression => expression.MapFrom(model => model.Dob.ToString()));

    CreateMap<ProfileUpdateDto, UserModel>()
      .ForMember(model => model.GivenName, expression =>
      {
        expression.PreCondition(dto => dto.GivenName != null);
        expression.MapFrom(dto => dto.GivenName);
      })
      .ForMember(model => model.Surname, expression =>
      {
        expression.PreCondition(dto => dto.Surname != null);
        expression.MapFrom(dto => dto.Surname);
      })
      .ForMember(model => model.Country, expression =>
      {
        expression.PreCondition(dto => dto.Country != null);
        expression.MapFrom(dto => dto.Country);
      });

    CreateMap<LottoResultModel, LottoResultDto>();
  }
}