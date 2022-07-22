using System.Net.Http.Headers;
using System.Net.Mime;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using TrackLott.Constants;
using TrackLott.Interfaces;
using TrackLott.Models.DTOs;

namespace TrackLott.Services;

public class EmailService : IEmailService
{
  private readonly IWebHostEnvironment _env;
  private readonly HttpClient _httpClient;

  public EmailService(IWebHostEnvironment env, HttpClient httpClient)
  {
    _env = env;
    _httpClient = httpClient;
  }

  public async Task<string?> SendConfirmationEmailAsync(EmailPropsDto dataDto)
  {
    var res = await SendHttpRequest(EndRoute.AdminEmailSendExt, HttpMethod.Post, dataDto);
    Console.WriteLine("________________");
    Console.WriteLine(res);
    Console.WriteLine("________________");
    return res;
  }

  private async Task<string?> SendHttpRequest(string endPoint, HttpMethod method, object dataDto)
  {
    var projectToken = Environment.GetEnvironmentVariable(EnvVarName.TrackLottProjectJwtToken);
    if (projectToken == null) return null;

    var adminProject = _env.IsProduction() ? DomainName.AdminUsualAppsCom : DomainName.Localhost5001;
    var adminEmailSendUri = new Uri($"{adminProject}{endPoint}");

    var httpRequestMessage = new HttpRequestMessage()
    {
      Method = method,
      RequestUri = adminEmailSendUri,
      Headers =
      {
        Authorization = new AuthenticationHeaderValue(JwtBearerDefaults.AuthenticationScheme,
          projectToken)
      },
      Content = new StringContent(JsonSerializer.Serialize(dataDto),
        Encoding.UTF8, MediaTypeNames.Application.Json)
    };

    var resp = await _httpClient.SendAsync(httpRequestMessage,
      HttpCompletionOption.ResponseContentRead);
    return await resp.Content.ReadAsStringAsync();
  }
}