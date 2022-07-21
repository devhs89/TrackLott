using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using TrackLott.Constants;
using TrackLott.Interfaces;
using TrackLott.Security;
using TrackLott.Services;

namespace TrackLott.Extensions;

public static class AuthServicesExtension
{
  public static IServiceCollection AddAuthServices(this IServiceCollection serviceCollection, IWebHostEnvironment env)
  {
    serviceCollection.AddScoped<ITokenService, TokenService>();

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

    var requireAuthenticatedUserPolicy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();

    serviceCollection.AddAuthorization(options =>
    {
      options.AddPolicy(AuthPolicyName.RequireAuthenticatedUser, requireAuthenticatedUserPolicy);
      options.DefaultPolicy = requireAuthenticatedUserPolicy;
      options.FallbackPolicy = requireAuthenticatedUserPolicy;
    });

    serviceCollection.AddScoped<IUserClaimsService, UserClaimsService>();

    return serviceCollection;
  }
}