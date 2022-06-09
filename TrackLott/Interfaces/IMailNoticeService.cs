using TrackLott.Models;

namespace TrackLott.Interfaces;

public interface IMailNoticeService
{
  Task<string> RegisterNotification(AppUser appUser);

  Task<string> LoginNotification(AppUser appUser, bool attemptStatus);
}