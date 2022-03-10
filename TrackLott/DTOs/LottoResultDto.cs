namespace TrackLott.DTOs;

public class LottoResultDto
{
  public string DrawName { get; set; }
  public int DrawNum { get; set; }
  public DateTime DrawDate { get; set; }
  public string[] WinNums { get; set; }
  public string[] SuppNums { get; set; }
}