import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "../constants/backend";
import {Combination} from "../models/combination";
import {MatchingComboResponse} from "../models/matching-combo";

@Injectable({
  providedIn: 'root'
})
export class CombinationsService {

  constructor(private httpClient: HttpClient) {
  }

  addCombinations(combinations: Combination[]) {
    return this.httpClient.post(`${BASE_URL}/combinations/add`, combinations, {responseType: "text"});
  }

  matchCombinations(latestLottoName: string, pageIndex: number, pageSize: number) {
    return this.httpClient.post<MatchingComboResponse[]>(`${BASE_URL}/combinations/matchCombos`, {}, {
      params: {lottoName: latestLottoName, pageIndex: pageIndex, pageSize: pageSize}
    });
  }
}
