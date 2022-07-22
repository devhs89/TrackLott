using TrackLott.Helpers;

namespace TrackLott.Extensions;

public static class HelperServicesExtension
{
  public static IServiceCollection AddHelperServices(this IServiceCollection serviceCollection)
  {
    serviceCollection.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
    return serviceCollection;
  }
}