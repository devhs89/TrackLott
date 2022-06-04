using System.ComponentModel.DataAnnotations;

namespace TrackLott.Models;

public class LottoResult
{
  public Guid Id { get; set; }
  public string SecondaryNumbers { get; set; }
  public string Dividends { get; set; }
  [Required] public string PrimaryNumbers { get; set; }
  [Required] public string ProductId { get; set; }
  public string TicketNumbers { get; set; }
  [Required] public DateTime DrawDate { get; set; }
  [Required] public int DrawNumber { get; set; }
  public string Region { get; set; }
  public string Game { get; set; }
  public ICollection<Combination> Combinations { get; set; }
}