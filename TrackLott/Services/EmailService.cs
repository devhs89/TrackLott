using System.Net;
using System.Text;
using System.Text.Json;
using SendGrid;
using SendGrid.Helpers.Mail;
using TrackLott.Constants;
using TrackLott.DTOs;
using TrackLott.Interfaces;

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

  public async Task<HttpStatusCode> SendConfirmationEmailAsync(ConfirmationEmailTemplateDataDto dataDto)
  {
    // If not in production, send emails to file
    if (!_env.IsProduction())
    {
      return EmailToFile(new { dataDto.TemplateId, receiverEmailAddress = dataDto.TrackLottReceiverAddress });
    }

    var client = new SendGridClient(GetEmailServerApi());
    var msg = new SendGridMessage
    {
      From = new EmailAddress(ServerInfo.NoReplyServerEmail, ServerInfo.NoReplyProjectName),
      TemplateId = dataDto.TemplateId
    };
    var subject = _env.IsProduction() ? dataDto.EmailSubject : $"Development: {dataDto.EmailSubject}";

    msg.SetTemplateData(dataDto);
    msg.AddTo(dataDto.TrackLottReceiverAddress);

    // Disable all tracking
    msg.SetOpenTracking(false);
    msg.SetClickTracking(false, false);
    msg.SetGoogleAnalytics(false);

    var resp = await client.SendEmailAsync(msg);
    return resp?.StatusCode ?? HttpStatusCode.InternalServerError;
  }

  // METHOD: GET EMAIL SERVER API
  private static string GetEmailServerApi()
  {
    return Environment.GetEnvironmentVariable(EnvVarName.SendgridApi) ??
           throw new Exception(MessageResp.SendGridServiceApiNotSet);
  }

  // METHOD: EMAIL TO FILE
  private static HttpStatusCode EmailToFile(object args)
  {
    // Create DevFolder if not already exists
    var devFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "DevFolder");
    if (!Directory.Exists(devFolderPath))
    {
      var devFolder = Path.Combine(Directory.GetCurrentDirectory(), "DevFolder");
      var _ = Directory.CreateDirectory(devFolder);
    }

    // Write email content to file
    using var fileStream = File.Create(Path.Combine(devFolderPath,
      $"EmailService_{DateTime.Now:dddd_yyyy-MM-dd_HH-mm-ss-fff}.json"));
    var fileWritten = fileStream.WriteAsync(Encoding.UTF8.GetBytes(JsonSerializer.Serialize(args)));
    return fileWritten.IsCompletedSuccessfully ? HttpStatusCode.Accepted : HttpStatusCode.BadRequest;
  }
}