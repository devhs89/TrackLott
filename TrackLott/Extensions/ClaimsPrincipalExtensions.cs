using System.Security.Claims;

namespace TrackLott.Extensions;

public static class ClaimsPrincipalExtensions
{
  public static string? GetUserName(this ClaimsPrincipal claimsPrincipal)
  {
    return claimsPrincipal.FindFirst(ClaimTypes.Email)?.Value;
  }
}