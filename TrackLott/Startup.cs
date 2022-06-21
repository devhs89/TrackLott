using Microsoft.AspNetCore.HttpOverrides;
using TrackLott.Constants;
using TrackLott.Extensions;

namespace TrackLott
{
  public class Startup
  {
    private readonly IWebHostEnvironment _env;

    public Startup(IConfiguration config, IWebHostEnvironment env)
    {
      _env = env;
    }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddControllers();

      // Database related services
      services.AddDataStoreServices(_env);

      // Authentication and Authorization related services
      services.AddAuthServices(_env);
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment()) app.UseDeveloperExceptionPage();

      // Forward headers in production for reverse proxy
      if (env.IsProduction())
      {
        app.UseForwardedHeaders(new ForwardedHeadersOptions()
        {
          ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
        });
      }

      app.UseHttpsRedirection();

      app.UseRouting();

      // Allow Cors from Client App when developing
      if (!env.IsProduction())
        app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().WithOrigins(DomainName.Localhost44497));

      app.UseAuthentication();

      app.UseAuthorization();

      app.UseDefaultFiles();
      app.UseStaticFiles();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();

        // Let Client App handle routes not recognised by backend
        endpoints.MapFallbackToController("Index", "Fallback");
      });
    }
  }
}