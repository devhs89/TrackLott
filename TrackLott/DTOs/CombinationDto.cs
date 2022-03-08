using System.Text.Json.Nodes;

namespace TrackLott.DTOs;

public class CombinationDto
{
  public string? LottoName { get; set; }

  public string DateAdded { get; set; }

  public PickedNumbersDto PickedNumbers { get; set; }
}

public class PickedNumbersDto
{
  public JsonArray MainNums { get; set; }

  public int Jackpot { get; set; }
}