using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using TrackLott.Models;

namespace TrackLott.Services;

public class TokenService
{
  private readonly UserManager<UserModel> _userManager;
  private readonly SymmetricSecurityKey _key;

  public TokenService(IConfiguration config, UserManager<UserModel> userManager)
  {
    _userManager = userManager;
    _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TOKEN_KEY"]));
  }

  public async Task<string> CreateToken(UserModel userModel)
  {
    var claims = new List<Claim>()
    {
      new(JwtRegisteredClaimNames.Email, userModel.NormalizedEmail)
    };

    var roles = await _userManager.GetRolesAsync(userModel);

    claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

    var credentials = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

    var descriptor = new SecurityTokenDescriptor()
    {
      Subject = new ClaimsIdentity(claims),
      Expires = DateTime.Today.AddDays(7),
      SigningCredentials = credentials
    };

    var tokenHandler = new JwtSecurityTokenHandler();
    var token = tokenHandler.CreateToken(descriptor);

    return tokenHandler.WriteToken(token);
  }
}