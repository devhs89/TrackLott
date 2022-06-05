using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using TrackLott.Data;
using TrackLott.Models;

namespace TrackLott.Extensions;

public static class IdentityServiceExtensions
{
  public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
  {
    services.AddIdentityCore<AppUser>(options => options.Password.RequireNonAlphanumeric = false)
      .AddRoles<AppRole>()
      .AddRoleManager<RoleManager<AppRole>>()
      .AddSignInManager<SignInManager<AppUser>>()
      .AddRoleValidator<RoleValidator<AppRole>>()
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