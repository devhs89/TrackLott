import {SplitDateTime} from "./basic-models";

export interface LottoResultResponse {
  productId: string;
  displayName: string;
  drawNumber: number;
  drawDate: string;
  primaryNumbers: string;
  secondaryNumbers: string;
}

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
