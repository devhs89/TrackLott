namespace TrackLott.Models;

public class CombinationModel
{
  public Guid Id { get; set; }
  public string DateAdded { get; set; }
  public string PickedNumbers { get; set; }
  public UserModel UserModel { get; set; }
  public Guid UserModelId { get; set; }
  public LottoResultModel? LotteryResult { get; set; }
  public string? LottoResultProductId { get; set; }
  public int? LottoResultDrawNumber { get; set; }
}