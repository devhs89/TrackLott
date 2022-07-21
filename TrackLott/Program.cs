using System.Net;

namespace TrackLott
{
  public class Program
  {
    public static async Task Main(string[] args)
    {
      var host = CreateHostBuilder(args).Build();
      await host.RunAsync();
    }

    private static IHostBuilder CreateHostBuilder(string[] args)
    {
      return Host.CreateDefaultBuilder(args).ConfigureWebHostDefaults(webBuilder =>
      {
        var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
        if (env is "Production")
        {
          webBuilder.UseKestrel(options =>
          {
            options.Listen(IPAddress.Loopback, 8000);
            options.Listen(IPAddress.Loopback, 8001);
          });
        }

        webBuilder.UseStartup<Startup>();
      });
    }
  }
}