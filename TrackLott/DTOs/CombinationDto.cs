namespace TrackLott.DTOs;

public class CombinationDto
{
  public string? LottoName { get; set; }

  public DateTime DateAdded { get; set; }

  public int[] PickedNumbers { get; set; }

  public int[]? OptionalNumbers { get; set; }
}