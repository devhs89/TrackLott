using TrackLott.Interfaces;
using TrackLott.Models;

namespace TrackLott.Services;

public class MailNoticeService : IMailNoticeService
{
  private readonly ILogger<MailNoticeService> _logger;

  public MailNoticeService(ILogger<MailNoticeService> logger)
  {
    _logger = logger;
  }

  public void RegisterNotification(AppUser appUser)
  {
    var _ = PerformCall($"{appUser.GivenName} {appUser.Surname}", appUser.Email,
      "TrackLott - New User Registration",
      $"Selected Country: {appUser.Country}<br /><br />Terms Accepted: {appUser.TermsCheck}");
  }

  public void LoginNotification(AppUser appUser, bool attemptStatus)
  {
    var _ = PerformCall($"{appUser.GivenName} {appUser.Surname}", appUser.Email,
      "TrackLott - Login Attempt",
      $"Selected Country: {appUser.Country}<br /><br />Successful: {attemptStatus}");
  }

  private async Task<string> PerformCall(string senderName, string senderAddress, string emailSubject,
    string emailMessage)
  {
    try
    {
      var emailServerUri = Environment.GetEnvironmentVariable("WEBMAIL_URL");

      if (emailServerUri == null) throw new Exception("Null EmailServer Url");

      var resp = await new HttpClient().PostAsJsonAsync(emailServerUri,
        new Dictionary<string, string>()
        {
          { "SenderName", senderName },
          { "SenderAddress", senderAddress },
          { "EmailSubject", emailSubject },
          { "EmailMessage", emailMessage }
        });
      return await resp.Content.ReadAsStringAsync();
    }
    catch (Exception e)
    {
      _logger.LogCritical(e, "SENDGRID_MAIL_ERROR");
      return "Something went wrong!";
    }
  }
}