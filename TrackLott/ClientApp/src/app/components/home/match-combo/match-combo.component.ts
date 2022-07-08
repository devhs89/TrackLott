import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CombinationsService} from "../../../services/combinations.service";
import {Observable, Subscription} from "rxjs";
import {LottoResultService} from "../../../services/lotto-result.service";
import {AccountService} from "../../../services/account.service";
import {take} from "rxjs/operators";
import {DeviceBreakpointService} from "../../../services/device-breakpoint.service";
import {Breakpoints} from "@angular/cdk/layout";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ProgressIndicatorService} from "../../../services/progress-indicator.service";
import {lottoName} from "../../../constants/lotto-select-option";
import {SnackBarService} from "../../../services/snack-bar.service";
import {appRoute} from "../../../constants/app-route";
import {genericConst} from "../../../constants/generic-const";
import {PickedNumbers} from "../../../models/combination.model";
import {LottoResult} from "../../../models/latest-lotto-result.model";
import {MatchComboResponse, MatchedCombo, TableComboModel} from "../../../models/matched-combo.model";
import {UserClaimModel} from "../../../models/user-claim.model";

@Component({
  selector: 'app-match-combo',
  templateUrl: './match-combo.component.html',
  styleUrls: ['./match-combo.component.scss']
})
export class MatchComboComponent implements OnInit, OnDestroy {
  isHandset$: Observable<boolean>;
  lottoName = lottoName;
  gc = genericConst;
  appUser$: Observable<UserClaimModel | null>;
  subscriptions: Subscription[] = [];
  pathRoute = appRoute;
  lottoResult: LottoResult;
  matchedCombosList: TableComboModel[] = [];
  tableColumns = [genericConst.tablePrimaryNumsCol, genericConst.tableDrawDateCol];
  tableDataSource: MatTableDataSource<TableComboModel>;
  MatchedCombosTotal: number = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private deviceBreakpointService: DeviceBreakpointService,
              private loadingService: ProgressIndicatorService,
              private lottoResultService: LottoResultService,
              private accountService: AccountService,
              private combinationsService: CombinationsService,
              private snackBarService: SnackBarService) {
  }

  ngOnInit(): void {
    this.isHandset$ = this.deviceBreakpointService.handsetBreakpoint(Breakpoints.XSmall);
    this.appUser$ = this.accountService.appUser$;
    this.appUser$.pipe(take(1)).subscribe({
      next: userClaim => {
        if (userClaim?.token) {
          this.lottoResultService.latestLottoResult$.pipe(take(1)).subscribe({
            next: lottoResult => {
              if (lottoResult?.productId) {
                this.lottoResult = lottoResult;
                if (lottoResult.productId.toLowerCase() === lottoName.powerballId) this.tableColumns.splice(1, 0, genericConst.tablePowerballCol);
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
    this.combinationsService.matchCombinations(lottoResult.productId,
      this.paginator ? this.paginator.pageIndex : 0,
      this.paginator ? this.paginator.pageSize : 5)
      .subscribe({
        next: (value: MatchComboResponse) => {
          // @ts-ignore
          this.MatchedCombosTotal = value.totalMatches;
          // @ts-ignore
          this.matchedCombosList = this.parseMatchedCombos(value.combinationsList);
          this.subscriptions.push(
            this.isHandset$.subscribe(handset => {
              if (!handset) {
                this.tableDataSource = new MatTableDataSource<TableComboModel>(this.matchedCombosList);
              }
            })
          );
        },
        error: err => this.snackBarService.showSnackBar(err.error)
      });
  }

  private parseMatchedCombos(value: MatchedCombo[]): TableComboModel[] {
    let tableCombosList: TableComboModel[] = [];
    value.forEach(result => {
      const dateStr = new Date(result.dateAdded);
      const pickedNumbers: PickedNumbers = JSON.parse(result.pickedNumbers);
      let numMatches: number = 0;

      pickedNumbers.primaryNumbers.forEach(num => {
        this.lottoResult.primaryNumbers.includes(num) && numMatches++;
      });

      if (pickedNumbers.secondaryNumbers && this.lottoResult.productId === lottoName.powerballId) {
        for (const num of pickedNumbers.secondaryNumbers) {
          this.lottoResult.secondaryNumbers.includes(num) && numMatches++;
        }
      }

      tableCombosList.push({
        dateAdded: dateStr.toDateString(),
        primaryNumbers: pickedNumbers.primaryNumbers,
        secondaryNumbers: pickedNumbers.secondaryNumbers,
        matchesPerCombo: numMatches
      });
    });
    tableCombosList.sort((a, b) => b.matchesPerCombo - a.matchesPerCombo);
    return tableCombosList;
  }
}
