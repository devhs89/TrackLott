using System.ComponentModel.DataAnnotations;

namespace TrackLott.Models.DTOs;

public class ConfirmationEmailTemplateDataDto
{
  [Required, DataType(DataType.Text)] public string EmailSubject { get; set; }
  [Required, DataType(DataType.Text)] public string? TrackLottReceiverGivenName { get; set; }
  [Required, DataType(DataType.Text)] public string? TrackLottReceiverSurname { get; set; }
  [Required, EmailAddress] public string? TrackLottReceiverAddress { get; set; }
  [Required, DataType(DataType.Text)] public string? TrackLottEmailConfirmationTokenUrl { get; set; }
}