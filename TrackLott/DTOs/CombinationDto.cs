using System.Text.Json.Nodes;

namespace TrackLott.DTOs;

public class CombinationDto
{
  public string? LottoName { get; set; }

  public DateTime DateAdded { get; set; }

  public JsonObject[] PickedNumbers { get; set; }
}