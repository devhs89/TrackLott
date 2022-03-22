using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TrackLott.Entities;

namespace TrackLott.Data;

public class InitialSeed
{
  public static async Task SeedData(TrackLottContext trackLottContext, RoleManager<Ability> roleManager)
  {
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

    if (!(await trackLottContext.LotteryResults.AnyAsync()))
    {
      await trackLottContext.LotteryResults.AddRangeAsync(new LotteryResult()
        {
          DrawDateTime = new DateTime(2022, 03, 07),
          DrawName = "monday lotto",
          DrawNumber = 4162,
          WinningNumbers = string.Join(',', new List<int>() {34, 19, 30, 4, 33, 15}),
          SuppNumbers = string.Join(',', new List<int>() {6, 16})
        },
        new LotteryResult()
        {
          DrawDateTime = new DateTime(2022, 03, 08),
          DrawName = "oz lotto",
          DrawNumber = 1464,
          WinningNumbers = string.Join(',', new List<int>() {35, 44, 7, 45, 24, 14, 26}),
          SuppNumbers = string.Join(',', new List<int>() {12, 5})
        },
        new LotteryResult()
        {
          DrawDateTime = new DateTime(2022, 03, 09),
          DrawName = "wednesday lotto",
          DrawNumber = 4163,
          WinningNumbers = string.Join(',', new List<int>() {4, 17, 14, 8, 44, 36}),
          SuppNumbers = string.Join(',', new List<int>() {33, 35})
        },
        new LotteryResult()
        {
          DrawDateTime = new DateTime(2022, 03, 03),
          DrawName = "powerball",
          DrawNumber = 1346,
          WinningNumbers = string.Join(',', new List<int>() {4, 27, 24, 28, 2, 12, 18}),
          SuppNumbers = string.Join(',', new List<int>() {4})
        },
        new LotteryResult()
        {
          DrawDateTime = new DateTime(2022, 03, 05),
          DrawName = "tatts lotto",
          DrawNumber = 4239,
          WinningNumbers = string.Join(',', new List<int>() {19, 40, 18, 30, 16, 2}),
          SuppNumbers = string.Join(',', new List<int>() {9, 28})
        }
      );
      await trackLottContext.SaveChangesAsync();
    }
  }
}