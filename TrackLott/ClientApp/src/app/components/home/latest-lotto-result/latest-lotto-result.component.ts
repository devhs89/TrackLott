import {Component, OnDestroy, OnInit} from '@angular/core';
import {LottoResultService} from "../../../services/lotto-result.service";
import {Subscription} from "rxjs";
import {LottoResult} from "../../../models/lotto-result";
import {ProgressIndicatorService} from "../../../services/progress-indicator.service";
import {SnackBarService} from "../../../services/snack-bar.service";

@Component({
  selector: 'app-latest-lotto-result',
  templateUrl: './latest-lotto-result.component.html',
  styleUrls: ['./latest-lotto-result.component.scss']
})
export class LatestLottoResultComponent implements OnInit, OnDestroy {
  isLoading$ = this.loadingService.isLoading$;
  latestLottoResult: LottoResult;
  private subscription = new Subscription();

  constructor(private loadingService: ProgressIndicatorService, private lottoResultService: LottoResultService, private snackBarService: SnackBarService) {
  }

  ngOnInit(): void {
    this.subscription = this.lottoResultService.latestResult().subscribe({
      next: (resp) => this.latestLottoResult = {...resp},
      error: err => this.snackBarService.showSnackBar(err.error)
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
