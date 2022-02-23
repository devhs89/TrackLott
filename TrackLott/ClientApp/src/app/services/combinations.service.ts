import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "../constants/backend";
import {Combination} from "../models/combination";

@Injectable({
  providedIn: 'root'
})
export class CombinationsService {

  constructor(private httpClient: HttpClient) {
  }

  addCombinations(combinations: Combination) {
    return this.httpClient.post(`${BASE_URL}/combinations/add`, combinations, {responseType: "text"});
  }
}
