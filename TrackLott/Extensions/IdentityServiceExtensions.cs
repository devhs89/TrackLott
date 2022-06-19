using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using TrackLott.Data;
using TrackLott.Models.DataModels;

namespace TrackLott.Extensions;

public static class IdentityServiceExtensions
{
  public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
  {
    services.AddIdentityCore<UserModel>(options =>
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
      .AddRoles<UserRoleModel>()
      .AddSignInManager<SignInManager<UserModel>>()
      .AddEntityFrameworkStores<TrackLottDbContext>();

    services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
      options.TokenValidationParameters = new TokenValidationParameters()
      {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TOKEN_KEY"])),
        ValidateIssuer = false,
        ValidateAudience = false
      });

    services.AddAuthorization(options =>
    {
      options.AddPolicy("RequireAdminRole", builder => builder.RequireRole("Admin"));
      options.AddPolicy("RequireUserRole", builder => builder.RequireRole("User"));
    });

    return services;
  }
}