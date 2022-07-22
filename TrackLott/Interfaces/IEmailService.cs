using TrackLott.Models.DTOs;

namespace TrackLott.Interfaces;

public interface IEmailService
{
  public Task<string?> SendConfirmationEmailAsync(EmailPropsDto dataDto);
}