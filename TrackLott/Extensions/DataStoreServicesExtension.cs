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
      var connectionString = Environment.GetEnvironmentVariable(EnvVarName.DbConnStr);
      if (connectionString == null) throw new Exception(MessageResp.TrackLottDbConnFail);
      options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString),
        builder => builder.EnableRetryOnFailure(3, TimeSpan.FromSeconds(5), null));
    });
  }
}