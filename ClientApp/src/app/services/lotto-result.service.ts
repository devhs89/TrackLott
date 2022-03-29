import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../constants/backend';
import { LottoResult } from '../models/lotto-result';
import { map } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { resolve } from 'dns';
import { rejects } from 'assert';

@Injectable({
  providedIn: 'root',
})
export class LottoResultService {
  private latestLottoResult = new ReplaySubject<LottoResult | null>(1);
  latestLottoResult$ = this.latestLottoResult.asObservable();

  constructor(private httpClient: HttpClient) {}

  latestResult() {
    let lotResult: LottoResult | null = null;
    var lotResultSaved = localStorage.getItem('lottoresult');

    if (lotResultSaved) {
      try {
        var savedLotParsed = JSON.parse(lotResultSaved);

        const parseDate = (
          dateArg: Date
        ): { dateStr: string; timeStr: string } => {
          var date = dateArg.getDate;
          var month = dateArg.getMonth;
          var year = dateArg.getFullYear;
          var hour = dateArg.getHours;
          var minutes = dateArg.getMinutes;
          var seconds = dateArg.getSeconds;
          return {
            dateStr: `${date}/${month}/${year}`,
            timeStr: `${hour}:${minutes}:${seconds}`,
          };
        };

        if (
          parseDate(new Date(savedLotParsed.dateSaved)).dateStr ===
          parseDate(new Date()).dateStr
        ) {
          let lotResult: LottoResult = {
            drawName: savedLotParsed.result.drawName,
            drawNum: savedLotParsed.result.drawNum,
            drawDate: savedLotParsed.result.drawDate,
            winNums: savedLotParsed.result.winNums.map(Number),
            suppNums: savedLotParsed.result.suppNums.map(Number),
          };
          this.latestLottoResult.next(lotResult);
          return new Promise(() => lotResult);
        }
      } catch (error) {
        return this.httpClient.get<LottoResult>(`${BASE_URL}/lottoresult`).pipe(
          map((value) => {
            let lotResult: LottoResult = {
              drawName: value.drawName,
              drawNum: value.drawNum,
              drawDate: value.drawDate,
              winNums: value.winNums.map(Number),
              suppNums: value.suppNums.map(Number),
            };
            this.latestLottoResult.next(lotResult);
            return lotResult;
          })
        );
      }
    }
  }
}
