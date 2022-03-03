import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CombinationsService} from "../../services/combinations.service";
import {Observable, Subscription} from "rxjs";
import {LottoResultService} from "../../services/lotto-result.service";
import {AccountService} from "../../services/account.service";
import {take} from "rxjs/operators";
import {CombinationsResponse, MatchingCombo} from "../../models/matching-combo";
import {PickedNumbers} from "../../models/combination";
import {DeviceBreakpointService} from "../../services/device-breakpoint.service";
import {Breakpoints} from "@angular/cdk/layout";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {LottoResult} from "../../models/lotto-result";
import {UserToken} from "../../models/user-token";

@Component({
  selector: 'app-match-combo',
  templateUrl: './match-combo.component.html',
  styleUrls: ['./match-combo.component.scss']
})
export class MatchComboComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  isHandset$: Observable<boolean>;
  appUser$: Observable<UserToken | null>;
  latestLottoResult$: Observable<LottoResult | null>;
  latestLottoResult: LottoResult;
  matchingCombos: MatchingCombo[] = [];
  matchingCombosSliced: MatchingCombo[] = [];
  tableColumns = ["mainNums", "drawDate"];
  datasource: MatTableDataSource<MatchingCombo>;
  initialPageIndex: number = 0;
  initialPageSize: number = 5;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private deviceBreakpointService: DeviceBreakpointService, private lottoResultService: LottoResultService, private accountService: AccountService, private combinationsService: CombinationsService) {
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

              this.subscriptions.push(
                this.combinationsService.matchCombinations(lottoResult.drawName,
                  this.paginator ? this.paginator.pageIndex : this.initialPageIndex,
                  this.paginator ? this.paginator.pageSize : this.initialPageSize)
                  .subscribe((value) => {
                    // @ts-ignore
                    this.matchingCombos = this.parseMatchingCombos(value.combinationsList, lottoResult);
                    this.paginateData();
                  })
              );
            }
          }
        });
      }
    });
  }

  onPageEvent(event: PageEvent) {
    this.matchingCombosSliced = this.matchingCombos.slice((event.pageIndex * event.pageSize), (event.pageSize * (event.pageIndex + 1)));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private parseMatchingCombos(value: CombinationsResponse[], lottoResult: LottoResult): MatchingCombo[] {
    let parsedMatchingCombos: MatchingCombo[] = [];

    value.forEach(result => {
      const dateStr = new Date(result.dateAdded);

      const pickedNumbers: PickedNumbers = JSON.parse(result.pickedNumbers);

      console.log(pickedNumbers);

      parsedMatchingCombos.push({
        dateAdded: dateStr.toDateString(),
        mainNums: pickedNumbers.mainNums,
        jackpot: pickedNumbers.jackpot
      });

      // JSON.parse(result.pickedNumbers).forEach((numObj: PickedNumbers) => {
      //   const winningNums = lottoResult.winningNumbers.map(Number);
      //   const pickedMainNums = numObj.mainNums.map(Number);
      //   const totalMatches = this.findTotalMatches(pickedMainNums, winningNums);
      //
      //   parsedMatchingCombos.push({
      //     dateAdded: dateStr.toDateString(),
      //     mainNums: pickedMainNums,
      //     jackpot: numObj.jackpot
      //   });
      // });
    });
    return parsedMatchingCombos;
  }

  private paginateData() {
    this.subscriptions.push(
      this.isHandset$.subscribe(value => {
        if (value) {
          this.matchingCombosSliced = this.matchingCombos.slice(0, this.matchingCombos.length < this.initialPageSize ? this.matchingCombos.length : this.initialPageSize);
        } else {
          this.datasource = new MatTableDataSource<MatchingCombo>(this.matchingCombos);
          this.datasource.paginator = this.paginator;
          this.datasource.sort = this.sort;
        }
      })
    );
  }

  private findTotalMatches(mainNums: number[], winningNums: number[]) {
    let totalMatches = 0;
    mainNums.forEach(num => {
      if (winningNums.indexOf(num) >= 0) {
        totalMatches++;
      }
    });
    return totalMatches;
  }
}
