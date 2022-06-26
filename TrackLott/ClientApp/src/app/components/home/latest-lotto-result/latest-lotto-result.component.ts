import {Component, OnInit} from '@angular/core';
import {LottoResultService} from "../../../services/lotto-result.service";
import {LottoResult} from "../../../models/lotto-result";
import {SnackBarService} from "../../../services/snack-bar.service";
import {genericConst} from "../../../constants/generic-const";

@Component({
  selector: 'app-latest-lotto-result',
  templateUrl: './latest-lotto-result.component.html',
  styleUrls: ['./latest-lotto-result.component.scss']
})
export class LatestLottoResultComponent implements OnInit {
  latestLottoResult: LottoResult;
  gc = genericConst;

  constructor(private lottoResultService: LottoResultService, private snackBarService: SnackBarService) {
  }

  ngOnInit(): void {
    this.lottoResultService.latestResult().subscribe({
      next: (resp) => {
        this.latestLottoResult = {...resp};
      },
      error: err => this.snackBarService.showSnackBar(err.error)
    });
  }
}
