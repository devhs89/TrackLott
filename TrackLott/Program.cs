using System.Net;
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

        await Seed.SeedData(context, roleManager);
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
          webBuilder.ConfigureKestrel(options =>
          {
            options.Listen(IPAddress.Loopback, 5000);

            var httpCert = Environment.GetEnvironmentVariable("HTTPS_CERT");
            var httpsCertPass = Environment.GetEnvironmentVariable("HTTPS_CERT_PASS");

            if (httpCert != null && httpsCertPass != null)
            {
              options.Listen(IPAddress.Loopback, 5001,
                listenOptions => listenOptions.UseHttps(httpCert, httpsCertPass));
            }
          });

          webBuilder.UseStartup<Startup>();
        });
  }
}