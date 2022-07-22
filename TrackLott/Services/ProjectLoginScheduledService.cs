using System.Net.Mime;
using System.Text;
using System.Text.Json;
using TrackLott.Constants;
using TrackLott.Models.DTOs;

namespace TrackLott.Services;

public class ProjectLoginScheduledService : IHostedService, IDisposable
{
  private readonly IServiceScopeFactory _scopeFactory;
  private Timer? _timer;
  private WebTokenDto? _webTokenDto;
  private double _minutesLeftToTokenRenew;

  public ProjectLoginScheduledService(IServiceScopeFactory scopeFactory)
  {
    _scopeFactory = scopeFactory;
  }

  private string? AcquireAccessToken()
  {
    var details = Environment.GetEnvironmentVariable(EnvVarName.TracklottProjectDetails);
    if (details == null) return null;
    var parsedDetails = details.Split('|');

    using var scope = _scopeFactory.CreateScope();
    var httpClient = scope.ServiceProvider.GetRequiredService<HttpClient>();

    var httpRequestMessage = new HttpRequestMessage()
    {
      Method = HttpMethod.Post,
      RequestUri = new Uri($"{DomainName.Localhost5001}{EndRoute.ProjectAccessTokenExt}"),
      Content = new StringContent(
        JsonSerializer.Serialize(new ProjectLoginDto()
        {
          Id = parsedDetails[0],
          CodeAccessor = parsedDetails[1]
        }),
        Encoding.UTF8,
        MediaTypeNames.Application.Json
      )
    };

    try
    {
      Console.WriteLine("CALLED");
      Console.WriteLine("CALLED");

      var res = httpClient.Send(httpRequestMessage);
      _webTokenDto = res.Content.ReadFromJsonAsync<WebTokenDto>().Result;
    }
    catch (Exception)
    {
      return null;
    }

    return _webTokenDto?.JwtToken;
  }

  private void SaveProjectToken(object? state)
  {
    var token = AcquireAccessToken();
    if (token == null) return;
    Environment.SetEnvironmentVariable(EnvVarName.TrackLottProjectJwtToken, token);
  }

  public Task StartAsync(CancellationToken cancellationToken)
  {
    _minutesLeftToTokenRenew = DateTime.Today.AddDays(1).Subtract(DateTime.Now).TotalMinutes;
    _timer = new Timer(SaveProjectToken, null, TimeSpan.Zero,
      TimeSpan.FromMinutes(_minutesLeftToTokenRenew + 2));
    return Task.CompletedTask;
  }

  public Task StopAsync(CancellationToken cancellationToken)
  {
    _timer?.Change(Timeout.Infinite, 0);
    return Task.CompletedTask;
  }

  public void Dispose()
  {
    _timer?.Dispose();
  }
}