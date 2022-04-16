using TrackLott.Entities;
using TrackLott.Interfaces;

namespace TrackLott.Services;

public class MailNoticeService : IMailNoticeService
{
  private readonly ILogger<MailNoticeService> _logger;

  public MailNoticeService(ILogger<MailNoticeService> logger)
  {
    _logger = logger;
  }

  public async Task<string> RegisterNotification(Member member)
  {
    var resp = await PerformCall(member, "New Registration",
      $"New User Registration\n\nSelected Country: {member.Country}\n\nTerms Accepted: {member.TermsCheck}");
    return resp;
  }

  public async Task<string> LoginNotification(Member member, bool attemptStatus)
  {
    var resp = await PerformCall(member, "Login Attempt",
      $"Login Attempt\n\nSelected Country: {member.Country}\n\nSuccessful: {attemptStatus}");
    return resp;
  }

  private async Task<string> PerformCall(Member member, string emailSubject, string emailMessage)
  {
    try
    {
      var emailServer = Environment.GetEnvironmentVariable("WEBMAIL_URL");

      var resp = await new HttpClient().PostAsJsonAsync(emailServer,
        new Dictionary<string, string>()
        {
          {"SenderName", $"{member.GivenName} {member.Surname}"},
          {"SenderAddress", member.Email},
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