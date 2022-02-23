using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using TrackLott.Data;
using TrackLott.Entities;

namespace TrackLott.Extensions;

public static class IdentityServiceExtensions
{
  public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
  {
    services.AddIdentityCore<Member>(options => options.Password.RequireNonAlphanumeric = false)
      .AddRoles<Ability>()
      .AddRoleManager<RoleManager<Ability>>()
      .AddSignInManager<SignInManager<Member>>()
      .AddRoleValidator<RoleValidator<Ability>>()
      .AddEntityFrameworkStores<TrackLottContext>();

    services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
      options.TokenValidationParameters = new TokenValidationParameters()
      {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"])),
        ValidateIssuer = false,
        ValidateAudience = false
      });

    services.AddAuthorization(options =>
    {
      options.AddPolicy("RequireAdminRole", builder => builder.RequireRole("Admin"));
      options.AddPolicy("RequireMemberRole", builder => builder.RequireRole("Member"));
    });

    return services;
  }
}