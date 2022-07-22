using Microsoft.AspNetCore.Identity;
using TrackLott.Data;
using TrackLott.Models.DataModels;

namespace TrackLott.Extensions;

public static class IdentityServicesExtension
{
  public static IServiceCollection AddIdentityServices(this IServiceCollection serviceCollection)
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
          DefaultLockoutTimeSpan = new TimeSpan(8, 0, 0)
        };
      })
      .AddRoles<TrackLottAppRoleModel>()
      .AddSignInManager<SignInManager<TrackLottUserModel>>()
      .AddEntityFrameworkStores<TrackLottDbContext>()
      .AddDefaultTokenProviders();
    return serviceCollection;
  }
}