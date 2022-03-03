export interface MatchingComboResponse {
  combinationsList: CombinationsResponse[];
  totalMatches: number;
}

export interface CombinationsResponse {
  dateAdded: string;
  pickedNumbers: string;
}

export interface MatchingCombo {
  dateAdded: string;
  mainNums: number[];
  jackpot?: number;
}
