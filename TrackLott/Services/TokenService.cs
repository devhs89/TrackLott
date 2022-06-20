using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using TrackLott.Constants;
using TrackLott.Models.DataModels;
using TrackLott.Security;

namespace TrackLott.Services;

public class TokenService
{
  private readonly UserManager<UserModel> _userManager;

  public TokenService(UserManager<UserModel> userManager)
  {
    _userManager = userManager;
  }

  public async Task<string> CreateToken(UserModel userModel)
  {
    var claims = new List<Claim>()
    {
      new(JwtRegisteredClaimNames.Email, userModel.NormalizedEmail)
    };
    var roles = await _userManager.GetRolesAsync(userModel);
    claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

    var rsa = await CryptoSystem.GetPrivateRsaKey();
    var credentials = new SigningCredentials(new RsaSecurityKey(rsa), SecurityAlgorithms.RsaSha256);

    var jwtSecurityToken = new JwtSecurityToken(new JwtHeader(credentials),
      new JwtPayload("localhost", "localhost", claims, DateTime.Now, DateTime.Now.AddDays(7)));

    var writtenToken = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
    if (writtenToken == null) throw new SecurityTokenException(ErrorResponse.UnableToWriteToken);
    return writtenToken;
  }
}