namespace TrackLott.DTOs;

public class AccountUpdateDto
{
  public string? GivenName { set; get; }

  public string? Surname { get; set; }

  public string? Email { get; set; }

  public string? Country { get; set; }
}