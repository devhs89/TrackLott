using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using TrackLott.Constants;
using TrackLott.Interfaces;
using TrackLott.Models.DataModels;
using TrackLott.Security;

namespace TrackLott.Services;

public class TokenService : ITokenService
{
  private readonly UserManager<TrackLottUserModel> _userManager;
  private readonly IWebHostEnvironment _env;

  public TokenService(UserManager<TrackLottUserModel> userManager, IWebHostEnvironment env)
  {
    _userManager = userManager;
    _env = env;
  }

  public async Task<string> CreateToken(TrackLottUserModel TrackLottUserModel)
  {
    var claims = new List<Claim>()
    {
      new(ClaimTypes.Email, TrackLottUserModel.NormalizedEmail)
    };
    var roles = await _userManager.GetRolesAsync(TrackLottUserModel);
    claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

    var rsa = await CryptoSystem.GetRsaKey();
    var credentials = new SigningCredentials(new RsaSecurityKey(rsa), SecurityAlgorithms.RsaSha256);

    var jwtSecurityToken = new JwtSecurityToken(
      new JwtHeader(credentials),
      new JwtPayload(
        _env.IsProduction() ? DomainName.TrackLottUsualAppsCom : DomainName.Localhost8001,
        _env.IsProduction() ? DomainName.TrackLottUsualAppsCom : DomainName.Localhost8001,
        claims,
        DateTime.Now,
        DateTime.Now.AddDays(7)));

    var writtenToken = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
    if (writtenToken == null) throw new SecurityTokenException(MessageResp.UnableToWriteToken);
    return writtenToken;
  }
}