import {Component, OnDestroy, OnInit} from '@angular/core';
import {LottoResultService} from "../../services/lotto-result.service";
import {Subscription} from "rxjs";
import {LottoResult} from "../../models/lotto-result";
import {MatSnackBar} from "@angular/material/snack-bar";
import {parseError} from "../../helpers/parse-error";

@Component({
  selector: 'app-latest-lotto-result',
  templateUrl: './latest-lotto-result.component.html',
  styleUrls: ['./latest-lotto-result.component.scss']
})
export class LatestLottoResultComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  latestLottoResult: LottoResult;

  constructor(private trackLottService: LottoResultService, private matSnackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.subscription = this.trackLottService.latestResult().subscribe({
      next: resp => this.latestLottoResult = {...resp},
      error: err => this.matSnackBar.open(parseError(err.error), "Dismiss")
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
