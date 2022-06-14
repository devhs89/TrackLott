namespace TrackLott.DTOs;

public class RegisterDto
{
  public string Email { get; set; }
  public string Password { get; set; }
  public string RepeatPassword { get; set; }
  public string GivenName { get; set; }
  public string Surname { get; set; }
  public string Dob { get; set; }
  public bool TermsCheck { get; set; }
  public string Country { get; set; }
}