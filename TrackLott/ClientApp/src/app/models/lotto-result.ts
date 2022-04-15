import {SplitDateTime} from "./basic-models";

export interface LottoResult {
  drawName: string;
  drawNumber: number;
  drawDateTime: string;
  winningNumbers: number[];
  suppNumbers: number[];
}

export interface SavedLottoResult {
  dateSaved: SplitDateTime;
  result: LottoResult;
}
