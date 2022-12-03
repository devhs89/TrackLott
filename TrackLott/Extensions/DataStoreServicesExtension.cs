using Microsoft.EntityFrameworkCore;
using TrackLott.Constants;
using TrackLott.Data;

namespace TrackLott.Extensions;

public static class DataStoreServicesExtension
{
  public static void AddDataStoreServices(this IServiceCollection services)
  {
    services.AddDbContext<TrackLottDbContext>(options =>
    {
      var connectionString = Environment.GetEnvironmentVariable(EnvVarName.TrackLottConnStr);
      if (connectionString == null) throw new Exception(MessageResp.TrackLottDbConnFail);

      var serverVersion = new MySqlServerVersion(new Version(8, 0, 29));
      options.UseMySql(connectionString, serverVersion);
    });
  }
}