using Microsoft.AspNetCore.Identity;
using TrackLott.Data;
using TrackLott.Models.DataModels;

namespace TrackLott.Extensions;

public static class IdentityServicesExtension
{
  public static void AddIdentityServices(this IServiceCollection serviceCollection, IWebHostEnvironment env)
  {
    serviceCollection.AddIdentityCore<TrackLottUserModel>(options =>
      {
        options.SignIn = new SignInOptions()
        {
          RequireConfirmedEmail = true
        };
        options.Password = new PasswordOptions()
        {
          RequiredLength = 8,
          RequireLowercase = true,
          RequireUppercase = true,
          RequireDigit = true,
          RequireNonAlphanumeric = true
        };
        options.Lockout = new LockoutOptions()
        {
          MaxFailedAccessAttempts = 3,
          DefaultLockoutTimeSpan = env.IsProduction() ? TimeSpan.FromHours(8) : TimeSpan.FromMinutes(1)
        };
      })
      .AddRoles<TrackLottAppRoleModel>()
      .AddEntityFrameworkStores<TrackLottDbContext>()
      .AddDefaultTokenProviders();
  }
}