using System.ComponentModel.DataAnnotations;

namespace TrackLott.Models.DTOs;

public class RegisterDto
{
  [Required, EmailAddress] public string Email { get; set; }

  [Required, StringLength(100, MinimumLength = 8)]
  public string Password { get; set; }

  [Required] public string RepeatPassword { get; set; }
  [Required] public string GivenName { get; set; }
  [Required] public string Surname { get; set; }

  [Required, RegularExpression("\\d\\d\\d\\d-\\d\\d-\\d\\d")]
  public string Dob { get; set; }

  [Required] public string Country { get; set; }
  [Required] public bool TermsCheck { get; set; }
}