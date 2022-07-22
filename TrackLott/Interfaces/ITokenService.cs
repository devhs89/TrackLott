using System.Security.Claims;

namespace TrackLott.Interfaces;

public interface ITokenService
{
  public string? CreateToken(IEnumerable<Claim> claimsList);
}