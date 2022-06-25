using System.ComponentModel.DataAnnotations.Schema;

namespace TrackLott.Models.DataModels;

public class CombinationModel
{
  public Guid Id { get; set; }
  public string DateAdded { get; set; }
  public string PickedNumbers { get; set; }
  public UserModel UserModel { get; set; }
  [Column("UserId")] public Guid UserModelId { get; set; }
  public LottoResultModel? LotteryResult { get; set; }
  public string? LottoProductId { get; set; }
  public int? LottoDrawNumber { get; set; }
}