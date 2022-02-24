import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "../constants/backend";
import {LottoResult} from "../models/lotto-result";

@Injectable({
  providedIn: "root"
})
export class LottoResultService {

  constructor(private httpClient: HttpClient) {
  }

  latestResult() {
    return this.httpClient.get<LottoResult>(`${BASE_URL}/lottoresult`);
  }
}
