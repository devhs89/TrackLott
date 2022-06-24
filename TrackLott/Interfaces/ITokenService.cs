using TrackLott.Models.DataModels;

namespace TrackLott.Interfaces;

public interface ITokenService
{
  public Task<string> CreateToken(UserModel userModel);
}