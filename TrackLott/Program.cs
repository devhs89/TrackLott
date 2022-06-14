using System.Net;
using System.Security.Cryptography.X509Certificates;

namespace TrackLott
{
  public class Program
  {
    public static async Task Main(string[] args)
    {
      var host = CreateHostBuilder(args).Build();
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
              options.Listen(IPAddress.Loopback, 8000);

              var certEnv = Environment.GetEnvironmentVariable("TRACKLOTT_CERT");
              var keyEnv = Environment.GetEnvironmentVariable("TRACKLOTT_CERT_KEY");

              if (certEnv != null && keyEnv != null)
              {
                var httpsCert = X509Certificate2.CreateFromPemFile(certEnv, keyEnv);
                options.Listen(IPAddress.Loopback, 8001,
                  listenOptions => listenOptions.UseHttps(httpsCert));
              }
              else
              {
                options.Listen(IPAddress.Loopback, 8001);
              }
            });
          }

          webBuilder.UseStartup<Startup>();
        });
  }
}