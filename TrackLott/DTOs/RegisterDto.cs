using System.ComponentModel.DataAnnotations;

namespace TrackLott.DTOs;

public class RegisterDto
{
  [Required] public string UserName { get; set; }

  [Required] [EmailAddress] public string Email { get; set; }

  [Required] public string Password { get; set; }

  [Required] public string GivenName { get; set; }

  [Required] public string Surname { get; set; }

  [Required] public string Dob { get; set; }

  [Required] public bool TermsCheck { get; set; }

  [Required] public string Country { get; set; }
}