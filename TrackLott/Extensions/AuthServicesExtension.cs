using System.Security.Claims;
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
  public static void AddAuthServices(this IServiceCollection serviceCollection, IWebHostEnvironment env)
  {
    // DEFAULT AUTHENTICATION SCHEME AND TOKEN VALIDATION PARAMETERS
    serviceCollection.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
      .AddJwtBearer(options => options.TokenValidationParameters = new TokenValidationParameters()
      {
        ValidIssuers = env.IsProduction()
          ? new[] { DomainName.TrackLottUsualAppsCom, DomainName.WwwTrackLottUsualAppsCom }
          : new[] { DomainName.Localhost8001 },
        ValidAudiences = env.IsProduction()
          ? new[] { DomainName.TrackLottUsualAppsCom, DomainName.WwwTrackLottUsualAppsCom }
          : new[] { DomainName.Localhost8001 },
        IssuerSigningKey = CryptoSystem.GetRsaSecurityKey(),
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateIssuerSigningKey = true
      });

    // AUTHORIZATION POLICY TO REQUIRE AUTHENTICATED & CONFIRMED ACCOUNT
    var requireConfirmedAccountPolicy = new AuthorizationPolicyBuilder()
      .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
      .RequireAuthenticatedUser()
      .RequireClaim(ClaimTypes.NameIdentifier)
      .RequireRole(AppRole.User)
      .RequireClaim(CustomClaimType.ConfirmedAccount, CustomClaimValue.True).Build();

    // AUTHORIZATION POLICY TO ALLOW UNCONFIRMED BUT AUTHENTICATED ACCOUNT
    var allowUnConfirmedAccountPolicy = new AuthorizationPolicyBuilder()
      .RequireAuthenticatedUser()
      .RequireClaim(ClaimTypes.NameIdentifier)
      .RequireRole(AppRole.User).Build();

    // REGISTER AUTHORIZATION POLICIES
    serviceCollection.AddAuthorization(options =>
    {
      options.AddPolicy(AuthorizationPolicyName.RequireConfirmedAccount, requireConfirmedAccountPolicy);
      options.AddPolicy(AuthorizationPolicyName.AllowUnConfirmedAccount, allowUnConfirmedAccountPolicy);
      options.DefaultPolicy = requireConfirmedAccountPolicy;
      options.FallbackPolicy = requireConfirmedAccountPolicy;
    });

    // TOKEN SERVICE FOR PROVIDING JWT TOKENS
    serviceCollection.AddScoped<ITokenService, TokenService>();

    // REGISTER JWT CLAIMS SERVICE
    serviceCollection.AddScoped<IJwtClaimsService, JwtClaimsService>();
  }
}