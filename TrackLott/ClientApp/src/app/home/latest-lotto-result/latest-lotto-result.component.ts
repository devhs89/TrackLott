import {Component, OnDestroy, OnInit} from '@angular/core';
import {LottoResultService} from "../../services/lotto-result.service";
import {Subscription} from "rxjs";
import {LottoResult} from "../../models/lotto-result";
import {MatSnackBar} from "@angular/material/snack-bar";
import {parseError} from "../../helpers/parse-error";
import {LoadingService} from "../../services/loading.service";

@Component({
  selector: 'app-latest-lotto-result',
  templateUrl: './latest-lotto-result.component.html',
  styleUrls: ['./latest-lotto-result.component.scss']
})
export class LatestLottoResultComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  latestLottoResult: LottoResult;
  isLoading$ = this.loadingService.isLoading$;

  constructor(private loadingService: LoadingService, private lottoResultService: LottoResultService, private matSnackBar: MatSnackBar) {
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
