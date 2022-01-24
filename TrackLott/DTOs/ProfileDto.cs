namespace TrackLott.DTOs;

public class ProfileDto
{
  public string UserName { get; set; }

  public string GivenName { set; get; }

  public string Surname { get; set; }

  public DateTime Dob { get; set; }

  public string Email { get; set; }

  public string Country { get; set; }

  public string Token { get; set; }
}