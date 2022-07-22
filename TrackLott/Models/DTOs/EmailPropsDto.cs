using System.ComponentModel.DataAnnotations;

namespace TrackLott.Models.DTOs;

public class EmailPropsDto
{
  [Required, DataType(DataType.Text)] public string? TemplateId { get; set; }
  [Required, EmailAddress] public string? Address { get; set; }
  [Required] public ConfirmationEmailTemplateDataDto TemplateDataDto { get; set; }
}