using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TrackLott.Entities;

namespace TrackLott.Data;

public class Seed
{
  public static async Task SeedData(TrackLottContext trackLottContext, RoleManager<Ability> roleManager)
  {
    if (!(await trackLottContext.LotteryResults.AnyAsync()))
    {
      await trackLottContext.LotteryResults.AddAsync(new LotteryResult()
      {
        DrawDateTime = DateTime.Today,
        DrawName = "mon & wed lotto",
        DrawNumber = 1433,
        WinningNumbers = string.Join(',', new List<int>() {12, 23, 4, 33, 7, 1}),
        SuppNumbers = string.Join(',', new List<int>() {11, 19})
      });

      await trackLottContext.SaveChangesAsync();
    }

    if (!(await trackLottContext.Roles.AnyAsync()))
    {
      var roles = new List<Ability>()
      {
        new() {Name = "Member"},
        new() {Name = "Admin"}
      };

      foreach (var role in roles)
      {
        await roleManager.CreateAsync(role);
      }
    }
  }
}