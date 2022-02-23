using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using TrackLott.Entities;

namespace TrackLott.Services;

public class TokenService
{
  private readonly UserManager<Member> _userManager;
  private readonly SymmetricSecurityKey _key;

  public TokenService(IConfiguration config, UserManager<Member> userManager)
  {
    _userManager = userManager;
    _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
  }

  public async Task<string> CreateToken(Member user)
  {
    var claims = new List<Claim>()
    {
      new(JwtRegisteredClaimNames.NameId, user.UserName)
    };

    var roles = await _userManager.GetRolesAsync(user);

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