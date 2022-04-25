namespace TrackLott.Models;

public class Combination
{
  public Guid Id { get; set; }

  public string DateAdded { get; set; }

  public string PickedNumbers { get; set; }

  public AppUser AppUser { get; set; }
  public Guid AppUserId { get; set; }

  public LotteryResult? LotteryResult { get; set; }
  public Guid? LotteryResultId { get; set; }
}