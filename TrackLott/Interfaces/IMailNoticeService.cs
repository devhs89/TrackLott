using TrackLott.Models;

namespace TrackLott.Interfaces;

public interface IMailNoticeService
{
  void RegisterNotification(AppUser appUser);

  void LoginNotification(AppUser appUser, bool attemptStatus);
}