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

  public async Task<string> RegisterNotification(AppUser appUser)
  {
    var res = await PerformCall($"{appUser.GivenName} {appUser.Surname}", appUser.Email,
      "TrackLott - New User Registration",
      $"Selected Country: {appUser.Country}<br /><br />Terms Accepted: {appUser.TermsCheck}");
    return res;
  }

  public async Task<string> LoginNotification(AppUser appUser, bool attemptStatus)
  {
    var res = await PerformCall($"{appUser.GivenName} {appUser.Surname}", appUser.Email,
      "TrackLott - Login Attempt",
      $"Selected Country: {appUser.Country}<br /><br />Successful: {attemptStatus}");
    return res;
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