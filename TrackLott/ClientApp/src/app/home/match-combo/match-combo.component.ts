import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CombinationsService} from "../../services/combinations.service";
import {Observable, Subscription} from "rxjs";
import {LottoResultService} from "../../services/lotto-result.service";
import {AccountService} from "../../services/account.service";
import {take} from "rxjs/operators";
import {CombinationsResponse, MatchingCombo, MatchingComboResponse} from "../../models/matching-combo";
import {PickedNumbers} from "../../models/combination";
import {DeviceBreakpointService} from "../../services/device-breakpoint.service";
import {Breakpoints} from "@angular/cdk/layout";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {LottoResult} from "../../models/lotto-result";
import {UserToken} from "../../models/user-token";
import {ProgressIndicatorService} from "../../services/progress-indicator.service";
import {parseError} from "../../helpers/parse-error";

@Component({
  selector: 'app-match-combo',
  templateUrl: './match-combo.component.html',
  styleUrls: ['./match-combo.component.scss']
})
export class MatchComboComponent implements OnInit, OnDestroy {
  isHandset$: Observable<boolean>;
  isLoading$ = this.loadingService.isLoading$;
  appUser$: Observable<UserToken | null>;
  subscriptions: Subscription[] = [];
  lotResult: LottoResult;
  errorMessage: string | null = null;
  matchingCombos: MatchingCombo[] = [];
  tableColumns = ["mainNums", "drawDate"];
  tableDataSource: MatTableDataSource<MatchingCombo>;
  totalMatchingCombos: number = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private deviceBreakpointService: DeviceBreakpointService, private loadingService: ProgressIndicatorService, private lottoResultService: LottoResultService, private accountService: AccountService, private combinationsService: CombinationsService) {
  }

  ngOnInit(): void {
    this.isHandset$ = this.deviceBreakpointService.handsetBreakpoint(Breakpoints.XSmall);
    this.appUser$ = this.accountService.appUser$.pipe(take(1));

    this.accountService.appUser$.pipe(take(1)).subscribe(userToken => {
      if (userToken?.token) {
        this.lottoResultService.latestLottoResult$.pipe(take(1)).subscribe({
          next: lottoResult => {
            if (lottoResult?.drawName) {
              this.lotResult = lottoResult;
              if (lottoResult.drawName === "powerball") this.tableColumns.splice(1, 0, "jackpot");
              this.getMatchingCombinations(lottoResult);
            }
          }
        });
      }
    });
  }

  onPageEvent() {
    this.getMatchingCombinations(this.lotResult);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private getMatchingCombinations(lottoResult: LottoResult) {
    this.subscriptions.push(
      this.combinationsService.matchCombinations(lottoResult.drawName,
        this.paginator ? this.paginator.pageIndex : 0,
        this.paginator ? this.paginator.pageSize : 5)
        .subscribe({
          next: (value: MatchingComboResponse[]) => {
            // @ts-ignore
            this.totalMatchingCombos = value.totalMatches;
            // @ts-ignore
            this.matchingCombos = this.parseMatchingCombos(value.combinationsList);

            this.subscriptions.push(
              this.isHandset$.subscribe(handset => {
                if (!handset) {
                  this.tableDataSource = new MatTableDataSource<MatchingCombo>(this.matchingCombos!);
                }
              })
            );
          },
          error: err => this.errorMessage = parseError(err.error)
        })
    );
  }

  private parseMatchingCombos(value: CombinationsResponse[]): MatchingCombo[] {
    let parsedMatchingCombos: MatchingCombo[] = [];

    value.forEach(result => {
      const dateStr = new Date(result.dateAdded);
      const pickedNumbers: PickedNumbers = JSON.parse(result.pickedNumbers);
      let numMatches: number = 0;

      pickedNumbers.mainNums.forEach(num => {
        this.lotResult.winNums.includes(num) && numMatches++;
      });

      if (pickedNumbers.jackpot) {
        if (this.lotResult.drawName === "Powerball") {
          this.lotResult.suppNums.includes(pickedNumbers.jackpot) && numMatches++;
        }
      }

      parsedMatchingCombos.push({
        dateAdded: dateStr.toDateString(),
        mainNums: pickedNumbers.mainNums,
        jackpot: pickedNumbers.jackpot,
        matchesPerCombo: numMatches
      });
    });
    parsedMatchingCombos.sort((a, b) => b.matchesPerCombo - a.matchesPerCombo);
    return parsedMatchingCombos;
  }
}
