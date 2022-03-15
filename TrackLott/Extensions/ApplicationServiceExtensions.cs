using Microsoft.EntityFrameworkCore;
using TrackLott.Data;
using TrackLott.Services;

namespace TrackLott.Extensions;

public static class ApplicationServiceExtensions
{
  public static IServiceCollection AddApplicationServices(this IServiceCollection services)
  {
    services.AddScoped<TokenService>();

    services.AddDbContext<TrackLottContext>(options =>
    {
      var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

      var connectionString = Environment.GetEnvironmentVariable(env is "Production" ? "SQL_URL" : "SQL_DEV_URL");

      if (connectionString == null) throw new Exception("Database connection failed!");

      var serverVersion = new MySqlServerVersion(new Version(8, 0, 28));
      options.UseMySql(connectionString, serverVersion);
    });

    return services;
  }
}