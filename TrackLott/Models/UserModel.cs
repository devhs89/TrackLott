using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace TrackLott.Models;

public class UserModel : IdentityUser<Guid>
{
  [Required] public string GivenName { set; get; }
  [Required] public string Surname { get; set; }
  [Required] public DateOnly Dob { get; set; }
  [Required] public string Country { get; set; }
  [Required] public bool TermsCheck { get; set; }

  public ICollection<CombinationModel> Combinations { get; set; }
}