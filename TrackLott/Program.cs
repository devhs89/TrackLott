using System.Net;
using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Identity;
using TrackLott.Data;
using TrackLott.Models;

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
        var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<AppRole>>();

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
              options.Listen(IPAddress.Loopback, 5000);

              var certEnv = Environment.GetEnvironmentVariable("TRACKLOTT_CERT");
              var keyEnv = Environment.GetEnvironmentVariable("TRACKLOTT_CERT_KEY");

              if (certEnv != null && keyEnv != null)
              {
                var httpsCert = X509Certificate2.CreateFromPemFile(certEnv, keyEnv);
                options.Listen(IPAddress.Loopback, 5001,
                  listenOptions => listenOptions.UseHttps(httpsCert));
              }
              else
              {
                options.Listen(IPAddress.Loopback, 5001);
              }
            });
          }

          webBuilder.UseStartup<Startup>();
        });
  }
}