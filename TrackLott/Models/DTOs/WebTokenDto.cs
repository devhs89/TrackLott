namespace TrackLott.Models.DTOs;

public class WebTokenDto
{
  public WebTokenDto(string? jwtToken)
  {
    JwtToken = jwtToken;
  }

  public string? JwtToken { get; set; }
}