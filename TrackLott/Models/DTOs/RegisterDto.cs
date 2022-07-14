using System.ComponentModel.DataAnnotations;

namespace TrackLott.Models.DTOs;

public class RegisterDto
{
  [Required, EmailAddress] public string Email { get; set; }

  [Required, DataType(DataType.Password), StringLength(100, MinimumLength = 8)]
  public string Password { get; set; }

  [Required, DataType(DataType.Password)]
  public string RepeatPassword { get; set; }

  [Required, DataType(DataType.Text)] public string GivenName { get; set; }
  [Required, DataType(DataType.Text)] public string Surname { get; set; }

  [Required, DataType(DataType.DateTime)]
  public DateTime Dob { get; set; }

  [Required, DataType(DataType.Text)] public string Country { get; set; }
  [Required, RegularExpression("true")] public string TermsCheck { get; set; }
}