using System.Security.Cryptography.X509Certificates;
using TrackLott.Constants;

namespace TrackLott
{
  public static class Program
  {
    public static async Task Main(string[] args)
    {
      var host = CreateHostBuilder(args).Build();
      await host.RunAsync();
    }

    private static IHostBuilder CreateHostBuilder(string[] args)
    {
      return Host.CreateDefaultBuilder(args).ConfigureWebHostDefaults(webBuilder =>
        webBuilder.UseKestrel(options =>
        {
          options.ListenLocalhost(50015);

          var certsDir = Environment.GetEnvironmentVariable(EnvVarName.HttpsCertsDir);
          if (certsDir == null) return;

          var pemFilePath = Path.Combine(certsDir, "tracklott.pem");
          var keyFilePath = Path.Combine(certsDir, "tracklott.key");

          if (File.Exists(pemFilePath) && File.Exists(keyFilePath))
          {
            options.ListenLocalhost(60015,
              listenOptions => listenOptions.UseHttps(adapterOptions =>
                adapterOptions.ServerCertificate = X509Certificate2.CreateFromPemFile(pemFilePath, keyFilePath)));
          }
        }).UseStartup<Startup>());
    }
  }
}