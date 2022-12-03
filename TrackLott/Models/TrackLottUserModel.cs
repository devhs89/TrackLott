using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace TrackLott.Models;

public class TrackLottUserModel : IdentityUser<Guid>
{
  [Required, DataType(DataType.Text)] public string GivenName { set; get; }
  [Required, DataType(DataType.Text)] public string Surname { get; set; }

  [Required, DataType(DataType.DateTime)]
  public DateTime Dob { get; set; }

  [Required, DataType(DataType.Text)] public string Country { get; set; }
  [Required] public bool TermsCheck { get; set; }
  public ICollection<CombinationModel> Combinations { get; set; }
}