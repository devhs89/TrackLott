using Microsoft.AspNetCore.HttpOverrides;
using TrackLott.Constants;
using TrackLott.Controllers;
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

    public void ConfigureServices(IServiceCollection services)
    {
      services.AddControllers();

      // COMMON SERVICES LIKE HELPER SERVICES
      services.AddHelperServices();

      // DATABASE RELATED SERVICES
      services.AddDataStoreServices();

      // IDENTITY RELATED SERVICES
      services.AddIdentityServices(_env);

      // AUTHENTICATION AND AUTHORIZATION RELATED SERVICES
      services.AddAuthServices(_env);

      // ADD COMMUNICATION SERVICES
      services.AddCommunicationServices();

      // SCHEDULED JOBS & SERVICES
      services.AddScheduledServices();
    }

    public void Configure(IApplicationBuilder app)
    {
      if (_env.IsDevelopment()) app.UseDeveloperExceptionPage();

      // FORWARD HEADERS IN PRODUCTION FOR REVERSE PROXY
      if (_env.IsProduction())
      {
        app.UseForwardedHeaders(new ForwardedHeadersOptions()
        {
          ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
        });
      }

      app.UseHttpsRedirection();

      app.UseDefaultFiles();
      app.UseStaticFiles();

      app.UseRouting();

      // ALLOW CORS FROM CLIENT APP WHEN DEVELOPING
      if (!_env.IsProduction())
      {
        app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().WithOrigins(DomainName.Localhost44497));
      }

      app.UseAuthentication();
      app.UseAuthorization();

      app.UseEndpoints(builder =>
      {
        builder.MapControllers();

        // LET CLIENT APP HANDLE ROUTES NOT RECOGNISED BY BACKEND
        builder.MapFallbackToController("Index", "Fallback");
      });
    }
  }
}