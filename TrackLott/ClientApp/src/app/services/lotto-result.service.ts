import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BASE_URL} from '../constants/backend';
import {LottoResult} from '../models/lotto-result';
import {map} from 'rxjs/operators';
import {of, ReplaySubject} from 'rxjs';
import {getSavedLottoDraw, setLocalLotResult} from "../helpers/local-storage";
import {splitDateTime} from "../helpers/split-date-time";

@Injectable({
  providedIn: 'root',
})
export class LottoResultService {
  private latestLottoResult = new ReplaySubject<LottoResult | null>(1);
  latestLottoResult$ = this.latestLottoResult.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  private static mapRespToLottoResult(value: LottoResult): LottoResult {
    return {
      drawName: value.drawName,
      drawNumber: value.drawNumber,
      drawDateTime: value.drawDateTime,
      winningNumbers: value.winningNumbers.map(Number),
      suppNumbers: value.suppNumbers.map(Number),
    };
  }

  saveRecentDraw(lottoResults: LottoResult[]) {
    return this.httpClient.post(`${BASE_URL}/saveRecentDraw`, lottoResults);
  }

  getRecentLottoDraw() {
    const savedLot = getSavedLottoDraw();

    if (savedLot) {
      const dateTime = splitDateTime(new Date());

      if (savedLot.dateSaved.dateStr === dateTime.dateStr) {
        const lotResult = LottoResultService.mapRespToLottoResult(savedLot.result);
        this.latestLottoResult.next(lotResult);
        return of(lotResult);
      }
    }
    return this.fetchLotResults();
  }

  private fetchLotResults() {
    return this.httpClient.get<LottoResult>(`${BASE_URL}/getLottoResult`).pipe(
      map((value) => {
        const lotResult = LottoResultService.mapRespToLottoResult(value);

        setLocalLotResult(lotResult);
        this.latestLottoResult.next(lotResult);
        return lotResult;
      })
    );
  }
}
