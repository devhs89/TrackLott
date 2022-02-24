import {Component, OnDestroy, OnInit} from '@angular/core';
import {CombinationsService} from "../../services/combinations.service";
import {Subscription} from "rxjs";
import {LottoResultService} from "../../services/lotto-result.service";
import {AccountService} from "../../services/account.service";
import {take} from "rxjs/operators";
import {MatchingComboResult, MatchingCombos} from "../../models/matching-combo";
import {PickedNumbers} from "../../models/combination";

@Component({
  selector: 'app-match-combo',
  templateUrl: './match-combo.component.html',
  styleUrls: ['./match-combo.component.scss']
})
export class MatchComboComponent implements OnInit, OnDestroy {
  combinationsServiceSubscription: Subscription;
  matchingCombosResult: MatchingComboResult[] = [];
  matchingCombos: MatchingCombos[] = [];

  constructor(private lottoResultService: LottoResultService, private accountService: AccountService, private combinationsService: CombinationsService) {
  }

  ngOnInit(): void {
    this.accountService.appUser$.pipe(take(1)).subscribe(userToken => {
      if (userToken?.token) {

        this.lottoResultService.latestLottoResult$.pipe(take(1)).subscribe({
          next: lottoResult => {
            if (lottoResult?.drawName) {

              this.combinationsServiceSubscription = this.combinationsService.matchCombinations(lottoResult.drawName).subscribe({
                next: value => this.matchingCombosResult = value,
                complete: () => {
                  this.matchingCombosResult.forEach(result => {
                    JSON.parse(result.pickedNumbers).forEach((numObj: PickedNumbers) => {
                      this.matchingCombos.push({dateAdded: new Date(result.dateAdded), pickedNumbers: numObj});
                    });
                  });
                }
              });
            }
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.combinationsServiceSubscription.unsubscribe();
  }
}
