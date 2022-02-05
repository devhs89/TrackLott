using System.Text.Json.Nodes;

namespace TrackLott.DTOs;

public class MatchCombinationDto
{
  public DateTime DateAdded { get; set; }

  public string PickedNumbers { get; set; }
}