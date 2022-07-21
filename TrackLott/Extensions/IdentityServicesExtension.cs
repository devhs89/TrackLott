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
        options.Password.RequiredLength = 8;
        options.Password.RequireLowercase = true;
        options.Password.RequireUppercase = true;
        options.Password.RequireDigit = true;
        options.Password.RequireNonAlphanumeric = true;
        options.Lockout = new LockoutOptions()
        {
          MaxFailedAccessAttempts = 3,
          DefaultLockoutTimeSpan = new TimeSpan(8, 0, 0)
        };
      })
      .AddRoles<TrackLottAppRoleModel>()
      .AddSignInManager<SignInManager<TrackLottUserModel>>()
      .AddEntityFrameworkStores<TrackLottDbContext>();
    return serviceCollection;
  }
}