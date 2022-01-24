using System.Security.Claims;

namespace TrackLott.Extensions;

public static class ClaimsPrincipalExtensions
{
  public static string? GetUserId(this ClaimsPrincipal claimsPrincipal)
  {
    return claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
  }
}