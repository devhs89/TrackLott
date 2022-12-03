using System.ComponentModel.DataAnnotations.Schema;

namespace TrackLott.Models;

public class CombinationModel
{
  public Guid Id { get; set; }
  public string DateAdded { get; set; }
  public string PickedNumbers { get; set; }
  public TrackLottUserModel TrackLottUser { get; set; }
  [Column("UserId")] public Guid TrackLottUserId { get; set; }
  public LottoResultModel? LottoResult { get; set; }
  public string? LottoProductId { get; set; }
  public int? LottoDrawNumber { get; set; }
}