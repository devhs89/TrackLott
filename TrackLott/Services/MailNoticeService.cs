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
    var resp = await PerformCall(appUser, "New Registration",
      $"New User Registration\n\nSelected Country: {appUser.Country}\n\nTerms Accepted: {appUser.TermsCheck}");
    return resp;
  }

  public async Task<string> LoginNotification(AppUser appUser, bool attemptStatus)
  {
    var resp = await PerformCall(appUser, "Login Attempt",
      $"Login Attempt\n\nSelected Country: {appUser.Country}\n\nSuccessful: {attemptStatus}");
    return resp;
  }

  private async Task<string> PerformCall(AppUser appUser, string emailSubject, string emailMessage)
  {
    try
    {
      var emailServer = Environment.GetEnvironmentVariable("WEBMAIL_URL");

      var resp = await new HttpClient().PostAsJsonAsync(emailServer,
        new Dictionary<string, string>()
        {
          {"SenderName", $"{appUser.GivenName} {appUser.Surname}"},
          {"SenderAddress", appUser.Email},
          {"EmailSubject", emailSubject},
          {"EmailMessage", emailMessage}
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