using TrackLott.Services;

namespace TrackLott.Controllers;

public static class ScheduledServicesExtension
{
  public static IServiceCollection AddScheduledServices(this IServiceCollection serviceCollection)
  {
    serviceCollection.AddHostedService<ProjectLoginScheduledService>();
    serviceCollection.AddHttpClient<ProjectLoginScheduledService>();
    return serviceCollection;
  }
}