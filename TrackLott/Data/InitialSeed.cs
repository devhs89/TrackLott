using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TrackLott.Models;

namespace TrackLott.Data;

public class InitialSeed
{
  public static async Task SeedData(TrackLottContext trackLottContext, RoleManager<AppRole> roleManager)
  {
    if (!(await trackLottContext.Roles.AnyAsync()))
    {
      var roles = new List<AppRole>()
      {
        new() {Name = "User"},
        new() {Name = "Admin"}
      };

      foreach (var role in roles)
      {
        await roleManager.CreateAsync(role);
      }
    }

    if (!(await trackLottContext.LotteryResults.AnyAsync()))
    {
      await trackLottContext.LotteryResults.AddRangeAsync(new LottoResult()
        {
          DrawDate = new DateTime(2022, 03, 07),
          ProductId = "monday lotto",
          DrawNumber = 4162,
          PrimaryNumbers = string.Join(',', new List<int>() {34, 19, 30, 4, 33, 15}),
          SecondaryNumbers = string.Join(',', new List<int>() {6, 16})
        },
        new LottoResult()
        {
          DrawDate = new DateTime(2022, 03, 08),
          ProductId = "oz lotto",
          DrawNumber = 1464,
          PrimaryNumbers = string.Join(',', new List<int>() {35, 44, 7, 45, 24, 14, 26}),
          SecondaryNumbers = string.Join(',', new List<int>() {12, 5})
        },
        new LottoResult()
        {
          DrawDate = new DateTime(2022, 03, 09),
          ProductId = "wednesday lotto",
          DrawNumber = 4163,
          PrimaryNumbers = string.Join(',', new List<int>() {4, 17, 14, 8, 44, 36}),
          SecondaryNumbers = string.Join(',', new List<int>() {33, 35})
        },
        new LottoResult()
        {
          DrawDate = new DateTime(2022, 03, 03),
          ProductId = "powerball",
          DrawNumber = 1346,
          PrimaryNumbers = string.Join(',', new List<int>() {4, 27, 24, 28, 2, 12, 18}),
          SecondaryNumbers = string.Join(',', new List<int>() {4})
        },
        new LottoResult()
        {
          DrawDate = new DateTime(2022, 03, 05),
          ProductId = "tatts lotto",
          DrawNumber = 4239,
          PrimaryNumbers = string.Join(',', new List<int>() {19, 40, 18, 30, 16, 2}),
          SecondaryNumbers = string.Join(',', new List<int>() {9, 28})
        }
      );
      await trackLottContext.SaveChangesAsync();
    }
  }
}