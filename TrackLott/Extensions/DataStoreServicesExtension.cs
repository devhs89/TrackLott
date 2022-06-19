using Microsoft.EntityFrameworkCore;
using TrackLott.Constants;
using TrackLott.Data;
using TrackLott.Services;

namespace TrackLott.Extensions;

public static class DataStoreServicesExtension
{
  public static IServiceCollection AddDataStoreServices(this IServiceCollection services, IWebHostEnvironment env)
  {
    services.AddScoped<TokenService>();

    services.AddDbContext<TrackLottDbContext>(options =>
    {
      var connectionString = Environment.GetEnvironmentVariable(EnvVarName.TrackLottConnStr);

      if (connectionString == null) throw new Exception(ErrorResponse.TrackLottDbConnFail);

      var serverVersion = new MySqlServerVersion(new Version(8, 0, 28));
      options.UseMySql(connectionString, serverVersion);
    });

    return services;
  }
}