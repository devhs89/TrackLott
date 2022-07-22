using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using TrackLott.Constants;
using TrackLott.Interfaces;
using TrackLott.Security;

namespace TrackLott.Services;

public class TokenService : ITokenService
{
  private readonly IWebHostEnvironment _env;

  public TokenService(IWebHostEnvironment env)
  {
    _env = env;
  }

  public string? CreateToken(IEnumerable<Claim> claimsList)
  {
    var rsaSecurityKey = CryptoSystem.GetRsaSecurityKey();
    var credentials = new SigningCredentials(rsaSecurityKey, SecurityAlgorithms.RsaSha256);

    var jwtSecurityToken = new JwtSecurityToken(
      new JwtHeader(credentials),
      new JwtPayload(
        _env.IsProduction() ? DomainName.TrackLottUsualAppsCom : DomainName.Localhost8001,
        _env.IsProduction() ? DomainName.TrackLottUsualAppsCom : DomainName.Localhost8001,
        claimsList,
        DateTime.Now,
        DateTime.Now.AddDays(7)));

    var writtenToken = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
    return writtenToken;
  }
}