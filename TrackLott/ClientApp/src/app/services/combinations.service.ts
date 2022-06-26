import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CombinationPayload} from "../models/combination";
import {MatchComboResponse} from "../models/matched-combo";
import {endRoute} from "../constants/end-route";

@Injectable({
  providedIn: 'root'
})
export class CombinationsService {

  constructor(private httpClient: HttpClient) {
  }

  addCombinations(combinationPayloads: CombinationPayload[]) {
    return this.httpClient.post(endRoute.comboAdd, combinationPayloads, {responseType: "text"});
  }

  matchCombinations(productId: string, pageIndex: number, pageSize: number) {
    return this.httpClient.post<MatchComboResponse>(endRoute.matchCombos, {}, {
      params: {productId: productId, pageIndex: pageIndex, pageSize: pageSize}
    });
  }
}
