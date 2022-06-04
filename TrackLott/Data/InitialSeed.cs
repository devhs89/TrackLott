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
        new() { Name = "User" },
        new() { Name = "Admin" }
      };

      foreach (var role in roles)
      {
        await roleManager.CreateAsync(role);
      }
    }

    if (!(await trackLottContext.LotteryResults.AnyAsync()))
    {
      await trackLottContext.LotteryResults.AddRangeAsync(
        new LottoResult()
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
          Game = "SetForLife744"
        },
        new LottoResult()
        {
          ProductId = "TattsLotto",
          DrawNumber = 4265,
          PrimaryNumbers = string.Join(',', new List<int>()
          {
            23,
            25,
            7,
            13,
            8,
            17
          }),
          DrawDate = DateTime.Parse("2022-06-04T00:00:00"),
          TicketNumbers = "",
          SecondaryNumbers = string.Join(',', new List<int>()
          {
            42,
            31
          }),
          Dividends = string.Join(',', new List<int>()),
          Region = "au",
          Game = "TattsLotto"
        },
        new LottoResult()
        {
          ProductId = "Super66",
          DrawNumber = 4265,
          PrimaryNumbers = string.Join(',', new List<int>()
          {
            1,
            0,
            4,
            9,
            9,
            5
          }),
          DrawDate = DateTime.Parse("2022-06-04T00:00:00"),
          TicketNumbers = "",
          SecondaryNumbers = string.Join(',', new List<int>()),
          Dividends = string.Join(',', new List<int>()),
          Region = "au",
          Game = "Super66"
        },
        new LottoResult()
        {
          ProductId = "Powerball",
          DrawNumber = 1359,
          PrimaryNumbers = string.Join(',', new List<int>()
          {
            8,
            15,
            31,
            21,
            11,
            6,
            33
          }),
          DrawDate = DateTime.Parse("2022-06-02T00:00:00"),
          TicketNumbers = "",
          SecondaryNumbers = string.Join(',', new List<int>() { 7 }),
          Dividends = string.Join(',', new List<int>()),
          Region = "au",
          Game = "Powerball"
        },
        new LottoResult()
        {
          ProductId = "MonWedLotto",
          DrawNumber = 4187,
          PrimaryNumbers = string.Join(',', new List<int>()
          {
            8,
            15,
            31,
            5,
            42,
            10
          }),
          DrawDate = DateTime.Parse("2022-06-01T00:00:00"),
          TicketNumbers = "",
          SecondaryNumbers = string.Join(',', new List<int>()
          {
            7,
            36
          }),
          Dividends = string.Join(',', new List<int>()),
          Region = "au",
          Game = "MonWedLotto"
        },
        new LottoResult()
        {
          ProductId = "OzLotto",
          DrawNumber = 1476,
          PrimaryNumbers = string.Join(',', new List<int>()
          {
            20,
            32,
            40,
            27,
            36,
            30,
            21
          }),
          DrawDate = DateTime.Parse("2022-05-31T00:00:00"),
          TicketNumbers = "",
          SecondaryNumbers = string.Join(',', new List<int>()
          {
            8,
            28,
            14
          }),
          Dividends = string.Join(',', new List<int>()),
          Region = "au",
          Game = "OzLotto"
        },
        new LottoResult()
        {
          ProductId = "MonWedLotto",
          DrawNumber = 4186,
          PrimaryNumbers = string.Join(',', new List<int>()
          {
            21,
            36,
            18,
            26,
            20,
            1
          }),
          DrawDate = DateTime.Parse("2022-05-30T00:00:00"),
          TicketNumbers = "",
          SecondaryNumbers = string.Join(',', new List<int>()
          {
            8,
            12,
            10
          }),
          Dividends = string.Join(',', new List<int>()),
          Region = "au",
          Game = "MonWedLotto"
        }
      );
      await trackLottContext.SaveChangesAsync();
    }
  }
}