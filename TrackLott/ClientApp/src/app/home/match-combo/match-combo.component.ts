import {Component, OnDestroy, OnInit} from '@angular/core';
import {CombinationsService} from "../../services/combinations.service";
import {Observable, Subscription} from "rxjs";
import {LottoResultService} from "../../services/lotto-result.service";
import {AccountService} from "../../services/account.service";
import {take} from "rxjs/operators";
import {MatchingCombo} from "../../models/matching-combo";
import {PickedNumbers} from "../../models/combination";
import {DeviceBreakpointService} from "../../services/device-breakpoint.service";
import {Breakpoints} from "@angular/cdk/layout";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-match-combo',
  templateUrl: './match-combo.component.html',
  styleUrls: ['./match-combo.component.scss']
})
export class MatchComboComponent implements OnInit, OnDestroy {
  isHandset$: Observable<boolean>;
  combinationsServiceSubscription: Subscription;
  matchingCombos: MatchingCombo[] = [];
  matchingCombosSliced: MatchingCombo[] = [];
  tableColumns = ["mainNums", "jackpot", "drawDate"];

  constructor(private deviceBreakpointService: DeviceBreakpointService, private lottoResultService: LottoResultService, private accountService: AccountService, private combinationsService: CombinationsService) {
  }

  ngOnInit(): void {
    this.isHandset$ = this.deviceBreakpointService.handsetBreakpoint(Breakpoints.XSmall);

    this.accountService.appUser$.pipe(take(1)).subscribe(userToken => {
      if (userToken?.token) {

        this.lottoResultService.latestLottoResult$.pipe(take(1)).subscribe({
          next: lottoResult => {
            if (lottoResult?.drawName) {

              this.combinationsServiceSubscription = this.combinationsService.matchCombinations(lottoResult.drawName)
                .subscribe(value => {
                  let parsedMatchingCombos: MatchingCombo[] = [];

                  value.forEach(result => {
                    const dateStr = new Date(result.dateAdded);

                    JSON.parse(result.pickedNumbers).forEach((numObj: PickedNumbers) => {
                      parsedMatchingCombos.push({
                        dateAdded: `${dateStr.toDateString()}`,
                        mainNums: numObj.mainNums,
                        jackpot: numObj.jackpot
                      });
                    });
                  });

                  this.matchingCombos = parsedMatchingCombos;
                  this.matchingCombosSliced = this.matchingCombos.slice(0, this.matchingCombos.length < 3 ? this.matchingCombos.length : 3);
                });
            }
          }
        });
      }
    });
  }

  pageSize(event: PageEvent) {
    this.matchingCombosSliced = this.matchingCombos.slice((event.pageIndex * event.pageSize), (event.pageSize * event.pageSize));
  }

  ngOnDestroy() {
    this.combinationsServiceSubscription.unsubscribe();
  }
}
