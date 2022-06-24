namespace TrackLott.Interfaces;

public interface IUserClaimsService
{
  public string? GetNormalisedEmail();
  public string? GetNormalisedUserRole();
}