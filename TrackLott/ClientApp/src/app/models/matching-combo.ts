import {PickedNumbers} from "./combination";

export interface MatchingComboResult {
  dateAdded: string;
  pickedNumbers: string;
}

export interface MatchingCombos {
  dateAdded: Date;
  pickedNumbers: PickedNumbers;
}
