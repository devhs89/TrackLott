import {Component, OnDestroy, OnInit} from '@angular/core';
import {LottoResultService} from "../../services/lotto-result.service";
import {Subscription} from "rxjs";
import {LottoResult} from "../../models/lotto-result";

@Component({
  selector: 'app-match-combos',
  templateUrl: './latest-lotto-result.component.html',
  styleUrls: ['./latest-lotto-result.component.scss']
})
export class LatestLottoResultComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  latestLottoResult: LottoResult;

  constructor(private trackLottService: LottoResultService) {
  }

  ngOnInit(): void {
    this.subscription = this.trackLottService.latestResult().subscribe((resp: any) => {
      if (resp !== null) {
        this.latestLottoResult = {...resp};
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
