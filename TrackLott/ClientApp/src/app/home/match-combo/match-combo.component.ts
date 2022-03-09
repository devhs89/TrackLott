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
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {LottoResult} from "../../models/lotto-result";
import {UserToken} from "../../models/user-token";
import {ProgressIndicatorService} from "../../services/progress-indicator.service";

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
  latestLottoResult$: Observable<LottoResult | null>;
  latestLottoResult: LottoResult;
  matchingCombos: MatchingCombo[] = [];
  matchingCombosSliced: MatchingCombo[] = [];
  tableColumns = ["mainNums", "drawDate"];
  datasource: MatTableDataSource<MatchingCombo>;
  initialPageIndex: number = 0;
  initialPageSize: number = 5;
  totalMatchingCombos: number = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private deviceBreakpointService: DeviceBreakpointService, private loadingService: ProgressIndicatorService, private lottoResultService: LottoResultService, private accountService: AccountService, private combinationsService: CombinationsService) {
  }

  ngOnInit(): void {
    this.isHandset$ = this.deviceBreakpointService.handsetBreakpoint(Breakpoints.XSmall);
    this.appUser$ = this.accountService.appUser$.pipe(take(1));
    this.latestLottoResult$ = this.lottoResultService.latestLottoResult$;

    this.accountService.appUser$.pipe(take(1)).subscribe(userToken => {
      if (userToken?.token) {
        this.lottoResultService.latestLottoResult$.pipe(take(1)).subscribe({
          next: lottoResult => {
            if (lottoResult?.drawName) {
              this.latestLottoResult = lottoResult;
              if (lottoResult.drawName === "powerball") this.tableColumns.push("jackpot");
              this.getMatchingCombinations(lottoResult);
            }
          }
        });
      }
    });
  }

  onPageEvent() {
    this.getMatchingCombinations(this.latestLottoResult);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private getMatchingCombinations(lottoResult: LottoResult) {
    this.subscriptions.push(
      this.combinationsService.matchCombinations(lottoResult.drawName,
        this.paginator ? this.paginator.pageIndex : this.initialPageIndex,
        this.paginator ? this.paginator.pageSize : this.initialPageSize)
        .subscribe((value: MatchingComboResponse[]) => {
          // @ts-ignore
          this.totalMatchingCombos = value.totalMatches;
          // @ts-ignore
          this.matchingCombos = this.parseMatchingCombos(value.combinationsList);
          this.paginateData();
        })
    );
  }

  private parseMatchingCombos(value: CombinationsResponse[]): MatchingCombo[] {
    let parsedMatchingCombos: MatchingCombo[] = [];

    value.forEach(result => {
      const dateStr = new Date(result.dateAdded);
      const pickedNumbers: PickedNumbers = JSON.parse(result.pickedNumbers);

      parsedMatchingCombos.push({
        dateAdded: dateStr.toDateString(),
        mainNums: pickedNumbers.mainNums,
        jackpot: pickedNumbers.jackpot
      });
    });
    return parsedMatchingCombos;
  }

  private paginateData() {
    this.subscriptions.push(
      this.isHandset$.subscribe(value => {
        if (value) {
          this.matchingCombosSliced = this.matchingCombos;
        } else {
          this.datasource = new MatTableDataSource<MatchingCombo>(this.matchingCombos);
        }
      })
    );
  }
}
