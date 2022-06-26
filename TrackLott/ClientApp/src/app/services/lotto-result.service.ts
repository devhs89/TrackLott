import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LottoResult, LottoResultResponse} from '../models/lotto-result';
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

  private static mapRespToLottoResult(value: LottoResultResponse | LottoResult): LottoResult {
    const primary = (typeof value.primaryNumbers === "string")
      ? value.primaryNumbers.split(',').map(Number)
      : value.primaryNumbers.map(Number);
    const secondary = (typeof value.secondaryNumbers === "string")
      ? value.secondaryNumbers.split(',').map(Number)
      : value.secondaryNumbers.map(Number);
    return {
      productId: value.productId,
      displayName: value.displayName,
      drawNumber: value.drawNumber,
      drawDate: value.drawDate,
      primaryNumbers: primary,
      secondaryNumbers: secondary,
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
    return this.httpClient.get<LottoResultResponse>(endRoute.latestLotto).pipe(
      map((value) => {
        const lotResult = LottoResultService.mapRespToLottoResult(value);
        setLocalLotResult(lotResult);
        this.latestLottoResult.next(lotResult);
        return lotResult;
      })
    );
  }
}
