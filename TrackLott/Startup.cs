using Microsoft.AspNetCore.Hosting.Server.Features;
using Microsoft.AspNetCore.HttpOverrides;
using TrackLott.Constants;
using TrackLott.Extensions;

namespace TrackLott
{
  public class Startup
  {
    private readonly IWebHostEnvironment _env;

    public Startup(IWebHostEnvironment env)
    {
      _env = env;
    }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddControllers();

      // Common services like helper services
      services.AddHelperServices();

      // Database related services
      services.AddDataStoreServices(_env);

      // Identity related services
      services.AddIdentityServices();

      // Authentication and Authorization related services
      services.AddAuthServices(_env);
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app)
    {
      if (_env.IsDevelopment()) app.UseDeveloperExceptionPage();

      // Forward headers in production for reverse proxy
      if (_env.IsProduction())
      {
        app.UseForwardedHeaders(new ForwardedHeadersOptions()
        {
          ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
        });
      }

      // Use Https Connection if listening on addresses other than localhost
      var firstServerAddress = app.ServerFeatures.Get<IServerAddressesFeature>()?.Addresses.ToList().FirstOrDefault();
      if (firstServerAddress != null && !firstServerAddress.Contains("localhost") &&
          !firstServerAddress.Contains("127.0.0.1"))
      {
        app.UseHttpsRedirection();
      }

      app.UseDefaultFiles();
      app.UseStaticFiles();

      app.UseRouting();

      // Allow Cors from Client App when developing
      if (!_env.IsProduction())
      {
        app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().WithOrigins(DomainName.Localhost44497));
      }

      app.UseAuthentication();
      app.UseAuthorization();

      app.UseEndpoints(builder =>
      {
        builder.MapControllers();
        // Let Client App handle routes not recognised by backend
        builder.MapFallbackToController("Index", "Fallback");
      });
    }
  }
}