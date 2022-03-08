namespace TrackLott.DTOs;

public class MatchComboResponseDto
{
  public List<MatchingCombinationDto> CombinationsList { get; set; }

  public int totalMatches { get; set; }
}

public class MatchingCombinationDto
{
  public string DateAdded { get; set; }

  public string PickedNumbers { get; set; }
}