namespace TrackLott.Constants;

public static class EmailContent
{
  public const string ConfirmEmailSubject = "Confirm your Email Address";

  public static string ConfirmEmail(string fqdn, string relativeUrl, string givenName, string surname, string email,
    string userId, string encodedToken)
  {
    return $"Hi {givenName},<br /><br />" +
           $"Please confirm your email address by clicking on the link below.<br />" +
           $"<p><a href='{fqdn}/{relativeUrl}?userId={userId}&code={encodedToken}'>Confirm Email Address</a></p>" +
           $"If the activation link does not work, please copy and paste the link below in browser address bar.<br /><br />" +
           $"<div style='word-wrap:break-word;text-decoration:none;'>" +
           $"{fqdn}/{relativeUrl}?userId={userId}&code={encodedToken}" +
           $"</div><br /><br />" +
           $"Kind regards<br />" +
           $"UsualApps Team";
  }
}