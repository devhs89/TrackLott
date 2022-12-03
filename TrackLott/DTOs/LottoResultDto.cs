namespace TrackLott.Models.DTOs;

public class LottoResultDto
{
  public string ProductId { get; set; }
  public string DisplayName { get; set; }
  public int DrawNumber { get; set; }
  public DateTime DrawDate { get; set; }
  public string PrimaryNumbers { get; set; }
  public string SecondaryNumbers { get; set; }
}