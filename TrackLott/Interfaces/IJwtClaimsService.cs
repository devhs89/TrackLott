namespace TrackLott.Interfaces;

public interface IJwtClaimsService
{
  public Guid? GetGuidIdClaim();
  public string? GetNormalisedEmailClaim();
  public string? GetSecuredAccountClaim();
  public List<string>? GetNormalisedUserRolesClaim();
}