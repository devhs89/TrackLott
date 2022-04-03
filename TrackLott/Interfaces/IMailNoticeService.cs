using TrackLott.Entities;

namespace TrackLott.Interfaces;

public interface IMailNoticeService
{
  Task<string> RegisterNotification(Member member);

  Task<string> LoginNotification(Member member, bool attemptStatus);
}