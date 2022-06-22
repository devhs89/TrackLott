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
  }
}