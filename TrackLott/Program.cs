using System.Net;
using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Identity;
using TrackLott.Data;
using TrackLott.Entities;

namespace TrackLott
{
  public class Program
  {
    public static async Task Main(string[] args)
    {
      var host = CreateHostBuilder(args).Build();

      using var scope = host.Services.CreateScope();

      try
      {
        var context = scope.ServiceProvider.GetRequiredService<TrackLottContext>();
        var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<Ability>>();

        await InitialSeed.SeedData(context, roleManager);
      }
      catch (Exception e)
      {
        Console.WriteLine(e.Message);
        throw;
      }

      await host.RunAsync();
    }

    private static IHostBuilder CreateHostBuilder(string[] args) =>
      Host.CreateDefaultBuilder(args)
        .ConfigureWebHostDefaults(webBuilder =>
        {
          var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

          if (env is "Production")
          {
            webBuilder.ConfigureKestrel(options =>
            {
              var pemCertEnv = Environment.GetEnvironmentVariable("HTTPS_CERT");
              var pemKeyEnv = Environment.GetEnvironmentVariable("HTTPS_CERT_KEY");

              if (pemCertEnv == null || pemKeyEnv == null) return;

              var httpsCert = X509Certificate2.CreateFromPemFile(pemCertEnv, pemKeyEnv);
              options.Listen(IPAddress.Loopback, 5001,
                listenOptions => listenOptions.UseHttps(httpsCert));
            });
          }

          webBuilder.UseStartup<Startup>();
        });
  }
}