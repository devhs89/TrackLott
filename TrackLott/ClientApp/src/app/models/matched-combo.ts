export interface MatchedCombo {
  dateAdded: string;
  pickedNumbers: string;
}

export interface MatchComboResponse {
  combinationsList: MatchedCombo[];
  totalMatches: number;
}

export interface TableComboModel {
  dateAdded: string;
  matchesPerCombo: number;
  primaryNumbers: number[];
  secondaryNumbers?: number[];
}
