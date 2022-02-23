namespace TrackLott.Entities;

public class Combination
{
  public Guid Id { get; set; }

  public DateTime DateAdded { get; set; }

  public string PickedNumbers { get; set; }

  public Member Member { get; set; }
  public Guid MemberId { get; set; }

  public LotteryResult? LotteryResult { get; set; }
  public Guid? LotteryResultId { get; set; }
}