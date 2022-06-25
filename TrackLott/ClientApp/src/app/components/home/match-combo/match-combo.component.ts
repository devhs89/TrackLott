import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CombinationsService} from "../../../services/combinations.service";
import {Observable, Subscription} from "rxjs";
import {LottoResultService} from "../../../services/lotto-result.service";
import {AccountService} from "../../../services/account.service";
import {take} from "rxjs/operators";
import {CombinationResponse, MatchCombo, MatchComboApiResponse} from "../../../models/match-combo";
import {PickedNumbers} from "../../../models/combination";
import {DeviceBreakpointService} from "../../../services/device-breakpoint.service";
import {Breakpoints} from "@angular/cdk/layout";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {LottoResult} from "../../../models/lotto-result";
import {UserClaim} from "../../../models/user-claim";
import {ProgressIndicatorService} from "../../../services/progress-indicator.service";
import {parseError} from "../../../helpers/parse-error";
import {lottoName} from "../../../constants/lotto-select-option";

@Component({
  selector: 'app-match-combo',
  templateUrl: './match-combo.component.html',
  styleUrls: ['./match-combo.component.scss']
})
export class MatchComboComponent implements OnInit, OnDestroy {
  isHandset$: Observable<boolean>;
  isLoading$ = this.loadingService.isLoading$;
  appUser$: Observable<UserClaim | null>;
  subscriptions: Subscription[] = [];
  lottoResult: LottoResult;
  errorMessage: string | null = null;
  matchCombos: MatchCombo[] = [];
  tableColumns = ["mainNums", "drawDate"];
  tableDataSource: MatTableDataSource<MatchCombo>;
  totalMatchingCombos: number = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private deviceBreakpointService: DeviceBreakpointService,
              private loadingService: ProgressIndicatorService,
              private lottoResultService: LottoResultService,
              private accountService: AccountService,
              private combinationsService: CombinationsService) {
  }

  ngOnInit(): void {
    this.isHandset$ = this.deviceBreakpointService.handsetBreakpoint(Breakpoints.XSmall);
    this.appUser$ = this.accountService.appUser$;
    this.appUser$.pipe(take(1)).subscribe({
      next: userClaim => {
        if (userClaim?.token) {
          this.lottoResultService.latestLottoResult$.pipe(take(1)).subscribe({
            next: lottoResult => {
              if (lottoResult?.displayName) {
                this.lottoResult = lottoResult;
                if (lottoResult.displayName === lottoName.powerballId) this.tableColumns.splice(1, 0, "jackpot");
                this.getMatchingCombinations(lottoResult);
              }
            }
          });
        }
      }
    });
  }

  onPageEvent() {
    this.getMatchingCombinations(this.lottoResult);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private getMatchingCombinations(lottoResult: LottoResult) {
    this.subscriptions.push(
      this.combinationsService.matchCombinations(lottoResult.displayName,
        this.paginator ? this.paginator.pageIndex : 0,
        this.paginator ? this.paginator.pageSize : 5)
        .subscribe({
          next: (value: MatchComboApiResponse[]) => {
            // @ts-ignore
            this.totalMatchingCombos = value.totalMatches;
            // @ts-ignore
            this.matchCombos = this.parseMatchingCombos(value.combinationsList);

            this.subscriptions.push(
              this.isHandset$.subscribe(handset => {
                if (!handset) {
                  this.tableDataSource = new MatTableDataSource<MatchCombo>(this.matchCombos!);
                }
              })
            );
          },
          error: err => this.errorMessage = parseError(err.error)
        })
    );
  }

  private parseMatchingCombos(value: CombinationResponse[]): MatchCombo[] {
    let parsedMatchingCombos: MatchCombo[] = [];

    value.forEach(result => {
      const dateStr = new Date(result.dateAdded);
      const pickedNumbers: PickedNumbers = JSON.parse(result.pickedNumbers);
      let numMatches: number = 0;

      pickedNumbers.primaryNumbers.forEach(num => {
        this.lottoResult.primaryNumbers.includes(num) && numMatches++;
      });

      if (pickedNumbers.secondaryNumbers && this.lottoResult.displayName === "Powerball") {
        for (const secondaryNumber of pickedNumbers.secondaryNumbers) {
          this.lottoResult.secondaryNumbers.includes(secondaryNumber) && numMatches++;
        }
      }

      parsedMatchingCombos.push({
        dateAdded: dateStr.toDateString(),
        primaryNumbers: pickedNumbers.primaryNumbers,
        secondaryNumbers: pickedNumbers.secondaryNumbers,
        matchesPerCombo: numMatches
      });
    });
    parsedMatchingCombos.sort((a, b) => b.matchesPerCombo - a.matchesPerCombo);
    return parsedMatchingCombos;
  }
}
