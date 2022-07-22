using TrackLott.Interfaces;
using TrackLott.Services;

namespace TrackLott.Extensions;

public static class CommunicationServicesExtension
{
  public static IServiceCollection AddCommunicationServices(this IServiceCollection serviceCollection)
  {
    serviceCollection.AddTransient<IEmailService, EmailService>();
    return serviceCollection;
  }
}