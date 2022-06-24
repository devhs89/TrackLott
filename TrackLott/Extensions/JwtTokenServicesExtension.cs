using TrackLott.Interfaces;
using TrackLott.Services;

namespace TrackLott.Extensions;

public static class JwtTokenServicesExtension
{
  public static IServiceCollection AddJwtTokenServices(this IServiceCollection serviceCollection)
  {
    serviceCollection.AddScoped<ITokenService, TokenService>();
    serviceCollection.AddScoped<IUserClaimsService, UserClaimsService>();
    return serviceCollection;
  }
}