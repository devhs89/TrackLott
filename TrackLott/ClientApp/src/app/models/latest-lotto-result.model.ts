import {DateTimeModel} from "./date-time.model";

export interface LottoResultResponse {
  productId: string;
  displayName: string;
  drawNumber: number;
  drawDate: string;
  primaryNumbers: string;
  secondaryNumbers: string;
}

export interface LottoResult {
  productId: string;
  displayName: string;
  drawNumber: number;
  drawDate: string;
  primaryNumbers: number[];
  secondaryNumbers: number[];
}

export interface SavedLottoResult {
  dateSaved: DateTimeModel;
  result: LottoResult;
}
