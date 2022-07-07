using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using TrackLott.Constants;
using TrackLott.Data;
using TrackLott.Models.DataModels;
using TrackLott.Security;

namespace TrackLott.Extensions;

public static class AuthServicesExtension
{
  public static IServiceCollection AddAuthServices(this IServiceCollection serviceCollection, IWebHostEnvironment env)
  {
    serviceCollection.AddIdentityCore<TrackLottUserModel>(options =>
      {
        options.Password.RequireNonAlphanumeric = true;
        options.Password.RequireDigit = true;
        options.Password.RequiredLength = 8;
        options.Password.RequireLowercase = true;
        options.Password.RequireUppercase = true;
        options.Lockout = new LockoutOptions()
        {
          MaxFailedAccessAttempts = 3,
          DefaultLockoutTimeSpan = new TimeSpan(8, 0, 0)
        };
      })
      .AddRoles<TrackLottAppRoleModel>()
      .AddSignInManager<SignInManager<TrackLottUserModel>>()
      .AddEntityFrameworkStores<TrackLottDbContext>();

    serviceCollection.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
      options.TokenValidationParameters = new TokenValidationParameters()
      {
        ValidIssuers = env.IsProduction()
          ? new[] { DomainName.TrackLottUsualAppsCom, DomainName.WwwTrackLottUsualAppsCom }
          : new[] { DomainName.Localhost8001 },
        ValidAudiences = env.IsProduction()
          ? new[] { DomainName.TrackLottUsualAppsCom, DomainName.WwwTrackLottUsualAppsCom }
          : new[] { DomainName.Localhost8001 },
        IssuerSigningKey = new RsaSecurityKey(CryptoSystem.GetRsaKey().Result),
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateIssuerSigningKey = true
      });

    serviceCollection.AddAuthorization(options =>
    {
      options.AddPolicy(AuthPolicyName.RequireAuthenticatedUser, builder => builder.RequireAuthenticatedUser());
    });

    return serviceCollection;
  }
}