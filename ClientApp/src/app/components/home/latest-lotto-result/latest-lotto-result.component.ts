import {Component, OnDestroy, OnInit} from '@angular/core';
import {LottoResultService} from "../../../services/lotto-result.service";
import {Subscription} from "rxjs";
import {LottoResult} from "../../../models/lotto-result";
import {MatSnackBar} from "@angular/material/snack-bar";
import {parseError} from "../../../helpers/parse-error";
import {ProgressIndicatorService} from "../../../services/progress-indicator.service";

@Component({
  selector: 'app-latest-lotto-result',
  templateUrl: './latest-lotto-result.component.html',
  styleUrls: ['./latest-lotto-result.component.scss']
})
export class LatestLottoResultComponent implements OnInit, OnDestroy {
  isLoading$ = this.loadingService.isLoading$;
  private subscription = new Subscription();
  latestLottoResult: LottoResult;

  constructor(private loadingService: ProgressIndicatorService, private lottoResultService: LottoResultService, private matSnackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.subscription = this.lottoResultService.latestResult().subscribe({
      next: (resp) => this.latestLottoResult = {...resp},
      error: err => this.matSnackBar.open(parseError(err.error), "Dismiss")
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
