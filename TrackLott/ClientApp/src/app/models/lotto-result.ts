import {SplitDateTime} from "./basic-models";

export interface LottoResult {
  drawName: string;
  drawNum: number;
  drawDate: string;
  winNums: number[];
  suppNums: number[];
}

export interface SavedLottoResult {
  dateSaved: SplitDateTime;
  result: LottoResult;
}
