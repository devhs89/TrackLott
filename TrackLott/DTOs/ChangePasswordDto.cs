namespace TrackLott.Models.DTOs;

public class ChangePasswordDto
{
  public string currentPassword { get; set; }
  public string newPassword { get; set; }
  public string repeatPassword { get; set; }
}