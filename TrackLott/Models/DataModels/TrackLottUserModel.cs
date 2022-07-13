using Microsoft.AspNetCore.Identity;

namespace TrackLott.Models.DataModels;

public class TrackLottUserModel : IdentityUser<Guid>
{
  public string GivenName { set; get; }
  public string Surname { get; set; }
  public DateOnly Dob { get; set; }
  public string Country { get; set; }
  public bool TermsCheck { get; set; }
  public ICollection<CombinationModel> Combinations { get; set; }
}