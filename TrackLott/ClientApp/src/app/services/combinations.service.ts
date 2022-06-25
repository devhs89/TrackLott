import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CombinationPayload} from "../models/combination";
import {MatchComboApiResponse} from "../models/match-combo";
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

  matchCombinations(latestLottoName: string, pageIndex: number, pageSize: number) {
    return this.httpClient.post<MatchComboApiResponse[]>(endRoute.matchCombos, {}, {
      params: {lottoName: latestLottoName, pageIndex: pageIndex, pageSize: pageSize}
    });
  }
}
