export interface MatchingComboResult {
  dateAdded: string;
  pickedNumbers: string;
}

export interface MatchingCombo {
  dateAdded: string;
  mainNums: number[];
  jackpot?: number;
  matches: number;
}
