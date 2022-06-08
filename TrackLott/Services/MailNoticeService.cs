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
    var resp = await PerformCall("New Registration",
      $"New User Registration<br /><br />User: {appUser.GivenName} {appUser.Surname} <{appUser.Email}><br />Selected Country: {appUser.Country}<br /><br />Terms Accepted: {appUser.TermsCheck}");
    return resp;
  }

  public async Task<string> LoginNotification(AppUser appUser, bool attemptStatus)
  {
    var resp = await PerformCall("Login Attempt",
      $"Login Attempt<br /><br />User: {appUser.GivenName} {appUser.Surname} <{appUser.Email}><br />Selected Country: {appUser.Country}<br /><br />Successful: {attemptStatus}");
    return resp;
  }

  private async Task<string> PerformCall(string emailSubject, string emailMessage)
  {
    try
    {
      var emailServer = Environment.GetEnvironmentVariable("WEBMAIL_URL");
      var serverAdmin = Environment.GetEnvironmentVariable("SERVER_ADMIN_EMAIL");

      if (emailServer == null || serverAdmin == null) throw new Exception("Null EmailServer or AdminEmail");

      var resp = await new HttpClient().PostAsJsonAsync(emailServer,
        new Dictionary<string, string>()
        {
          { "ToName", "TrackLott" },
          { "ToAddress", serverAdmin },
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