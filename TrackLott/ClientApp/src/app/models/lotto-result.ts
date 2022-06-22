import {SplitDateTime} from "./basic-models";

export interface LottoResult {
  displayName: string;
  drawNumber: number;
  drawDate: string;
  primaryNumbers: number[];
  secondaryNumbers: number[];
}

export interface SavedLottoResult {
  dateSaved: SplitDateTime;
  result: LottoResult;
}
