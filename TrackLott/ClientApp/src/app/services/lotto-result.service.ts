import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LottoResult} from '../models/lotto-result';
import {map} from 'rxjs/operators';
import {of, ReplaySubject} from 'rxjs';
import {getSavedLotResult, setLocalLotResult} from "../helpers/local-storage";
import {splitDateTime} from "../helpers/split-date-time";
import {endRoute} from "../constants/end-route";

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
      displayName: value.displayName,
      drawNumber: value.drawNumber,
      drawDate: value.drawDate,
      primaryNumbers: value.primaryNumbers.map(Number),
      secondaryNumbers: value.secondaryNumbers.map(Number),
    };
  }

  latestResult() {
    const savedLot = getSavedLotResult();

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
    return this.httpClient.get<LottoResult>(endRoute.latestLotto).pipe(
      map((value) => {
        const lotResult = LottoResultService.mapRespToLottoResult(value);

        setLocalLotResult(lotResult);
        this.latestLottoResult.next(lotResult);
        return lotResult;
      })
    );
  }
}
