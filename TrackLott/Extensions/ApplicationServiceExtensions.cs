using Microsoft.EntityFrameworkCore;
using TrackLott.Data;
using TrackLott.Services;

namespace TrackLott.Extensions;

public static class ApplicationServiceExtensions
{
  public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
  {
    services.AddScoped<TokenService>();

    services.AddDbContext<TrackLottContext>(options =>
    {
      var connectionString = "server=localhost";

      var env = Environment.GetEnvironmentVariable("SQL_URL");

      if (env != null) connectionString = env;

      var serverVersion = new MySqlServerVersion(new Version(8, 0, 28));

      options.UseMySql(connectionString, serverVersion);
    });

    return services;
  }
}