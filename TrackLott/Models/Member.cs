using Microsoft.AspNetCore.Identity;

namespace TrackLott.Models;

public class Member : IdentityUser<Guid>
{
  public string GivenName { set; get; }

  public string Surname { get; set; }

  public DateTime Dob { get; set; }

  public string Country { get; set; }

  public bool TermsCheck { get; set; }

  public ICollection<Combination> Combinations { get; set; }
}