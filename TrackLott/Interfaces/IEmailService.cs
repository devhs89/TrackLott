using System.Net;
using TrackLott.DTOs;

namespace TrackLott.Interfaces;

public interface IEmailService
{
  public Task<HttpStatusCode> SendConfirmationEmailAsync(ConfirmationEmailTemplateDataDto dataDto);
}