import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "../constants/backend";
import {LottoResult} from "../models/lotto-result";
import {map} from "rxjs/operators";
import {ReplaySubject} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LottoResultService {
  private latestLottoResult = new ReplaySubject<LottoResult | null>(1);
  latestLottoResult$ = this.latestLottoResult.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  latestResult() {
    return this.httpClient.get<LottoResult>(`${BASE_URL}/lottoresult`).pipe(map(value => {
      this.latestLottoResult.next(value);
      return value;
    }));
  }
}
