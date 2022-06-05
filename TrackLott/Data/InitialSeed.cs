using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TrackLott.Models;

namespace TrackLott.Data;

public class InitialSeed
{
  public static async Task SeedData(TrackLottDbContext trackLottDbContext, RoleManager<AppRole> roleManager)
  {
    if (!(await trackLottDbContext.Roles.AnyAsync()))
    {
      var roles = new List<AppRole>()
      {
        new() { Name = "User" },
        new() { Name = "Admin" }
      };

      foreach (var role in roles)
      {
        await roleManager.CreateAsync(role);
      }
    }

    if (!(await trackLottDbContext.LottoResults.AnyAsync()))
    {
      await trackLottDbContext.LottoResults.AddRangeAsync(
        new LottoResultModel()
        {
          ProductId = "SetForLife744",
          DrawNumber = 2494,
          PrimaryNumbers = string.Join(',', new List<int>()
          {
            10,
            7,
            20,
            11,
            44,
            36,
            22
          }),
          DrawDate = DateTime.Parse("2022-06-04T00:00:00"),
          TicketNumbers = "",
          SecondaryNumbers = string.Join(',', new List<int>()
          {
            15,
            6
          }),
          Dividends = string.Join(',', new List<int>()),
          Region = "au",
          Game = "SetForLife744",
          DisplayName = "Set For Life"
        }
      );
      await trackLottDbContext.SaveChangesAsync();
    }
  }
}