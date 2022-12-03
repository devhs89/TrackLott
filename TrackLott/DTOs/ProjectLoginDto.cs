using System.ComponentModel.DataAnnotations;

namespace TrackLott.Models.DTOs;

public class ProjectLoginDto
{
  [Required, DataType(DataType.Text)] public string Id { get; set; }

  [Required, DataType(DataType.Password)]
  public string CodeAccessor { get; set; }
}