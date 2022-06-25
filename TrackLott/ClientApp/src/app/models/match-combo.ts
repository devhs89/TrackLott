export interface MatchComboApiResponse {
  combinationsList: CombinationResponse[];
  totalMatches: number;
}

export interface CombinationResponse {
  dateAdded: string;
  pickedNumbers: string;
}

export interface MatchCombo {
  dateAdded: string;
  matchesPerCombo: number;
  primaryNumbers: number[];
  secondaryNumbers?: number[];
}
