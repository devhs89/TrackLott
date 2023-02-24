using System.Security.Claims;
using TrackLott.Interfaces;

namespace TrackLott.Services;

public class JwtClaimsService : IJwtClaimsService
{
  private readonly ClaimsPrincipal? _claimsPrinciple;

  public JwtClaimsService(IHttpContextAccessor httpContextAccessor)
  {
    _claimsPrinciple = httpContextAccessor.HttpContext?.User;
  }

  public Guid? GetGuidIdClaim()
  {
    var id = _claimsPrinciple?.FindFirstValue(ClaimTypes.NameIdentifier);
    Console.WriteLine(id);
    Console.WriteLine(id);
    Console.WriteLine(id);
    Console.WriteLine(id);
    Console.WriteLine(id);
    Console.WriteLine(id);
    Console.WriteLine(id);
    Console.WriteLine(id);
    return id == null ? null : Guid.Parse(id);
  }

  public string? GetNormalisedEmailClaim()
  {
    return _claimsPrinciple?.FindFirstValue(ClaimTypes.Email).Normalize().ToUpper();
  }

  public string? GetSecuredAccountClaim()
  {
    return _claimsPrinciple?.FindFirstValue(ClaimTypes.Email).Normalize().ToUpper();
  }

  public List<string>? GetNormalisedUserRolesClaim()
  {
    var roles = _claimsPrinciple?.FindAll(ClaimTypes.Role)
      .Select(claim => claim.Value.Normalize().ToUpper()).ToList();
    return roles;
  }
}