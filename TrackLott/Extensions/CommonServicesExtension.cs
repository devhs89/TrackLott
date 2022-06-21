using AutoMapper;

namespace TrackLott.Extensions;

public static class CommonServicesExtension
{
  public static IServiceCollection AddHelperServices(this IServiceCollection serviceCollection)
  {
    serviceCollection.AddAutoMapper(typeof(Mapper).Assembly);
    return serviceCollection;
  }
}