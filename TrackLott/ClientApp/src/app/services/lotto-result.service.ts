import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "../constants/backend";

@Injectable({
  providedIn: "root"
})
export class LottoResultService {

  constructor(private httpClient: HttpClient) {
  }

  latestResult() {
    return this.httpClient.get(`${BASE_URL}/lottoresult`);
  }
}
