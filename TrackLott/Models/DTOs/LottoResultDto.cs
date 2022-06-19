namespace TrackLott.Models.DTOs;

public class LottoResultDto
{
  public string DrawName { get; set; }
  public int DrawNum { get; set; }
  public DateTime DrawDate { get; set; }
  public List<int> WinNums { get; set; }
  public List<int> SuppNums { get; set; }
}