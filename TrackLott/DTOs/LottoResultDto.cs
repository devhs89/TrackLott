namespace TrackLott.DTOs;

public class LottoResultDto
{
  public string DrawName { get; set; }
  public int DrawNumber { get; set; }
  public DateTime DrawDateTime { get; set; }
  public string[] WinningNumbers { get; set; }
  public string[] SuppNumbers { get; set; }
}