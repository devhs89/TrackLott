using System.ComponentModel.DataAnnotations;

namespace TrackLott.Models;

public class LottoResultModel
{
  [Required] public string ProductId { get; set; }
  [Required] public int DrawNumber { get; set; }
  [Required] public string PrimaryNumbers { get; set; }
  [Required] public DateTime DrawDate { get; set; }
  public string DisplayName { get; set; }
  public string SecondaryNumbers { get; set; }
  public string Region { get; set; }
  public string Game { get; set; }
  public ICollection<CombinationModel> Combinations { get; set; }
}