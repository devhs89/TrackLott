using TrackLott.Helpers;

namespace TrackLott.Extensions;

public static class CommonServicesExtension
{
  public static IServiceCollection AddHelperServices(this IServiceCollection serviceCollection)
  {
    serviceCollection.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
    return serviceCollection;
  }
}