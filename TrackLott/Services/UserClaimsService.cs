using System.Security.Claims;
using TrackLott.Interfaces;

namespace TrackLott.Services;

public class UserClaimsService : IUserClaimsService
{
  private readonly IHttpContextAccessor _httpContextAccessor;

  public UserClaimsService(IHttpContextAccessor httpContextAccessor)
  {
    _httpContextAccessor = httpContextAccessor;
  }

  public string? GetNormalisedEmail()
  {
    return _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.Email).Normalize().ToUpper();
  }

  public string? GetNormalisedUserRole()
  {
    return _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.Role).Normalize().ToUpper();
  }
}