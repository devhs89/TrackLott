namespace TrackLott.Models;

public class LotteryResult
{
  public Guid Id { get; set; }

  public string DrawName { get; set; }

  public int DrawNumber { get; set; }

  public DateTime DrawDateTime { get; set; }

  public string WinningNumbers { get; set; }

  public string SuppNumbers { get; set; }

  public ICollection<Combination> Combinations { get; set; }
}