namespace TrackLott.DTOs;

public class AccountDto
{
  public string UserName { get; set; }

  public string GivenName { set; get; }

  public string Surname { get; set; }

  public DateTime Dob { get; set; }

  public string Email { get; set; }

  public string Country { get; set; }
}