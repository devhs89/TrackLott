import {Component, OnInit} from '@angular/core';
import {allLottoNames} from "../../../constants/lotto-names";
import {LotteryNameOptions} from "../../../models/lottery-name-options";
import {Observable} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {DeviceBreakpointService} from "../../../services/device-breakpoint.service";
import {CombinationsService} from "../../../services/combinations.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LottoResult} from "../../../models/lotto-result";

@Component({
  selector: 'app-add-records',
  templateUrl: './add-records.component.html',
  styleUrls: ['./add-records.component.scss']
})
export class AddRecordsComponent implements OnInit {
  lotteryNames = allLottoNames;
  lotteryNameSelected: LotteryNameOptions = {
    name: '',
    biggest: 45,
    standard: 6,
    allowed: 6,
    mainNums: [],
    suppNums: []
  };
  isHandset$: Observable<boolean>;
  todayDate = new Date();
  recentLottForm: FormGroup;
  lotteryNameControl: FormControl;
  purchaseDateControl: FormControl;
  allToBeSavedDraws: LottoResult[] = [];
  pickedNums: LottoResult = {drawName: '', drawNumber: 0, drawDateTime: '', winningNumbers: [], suppNumbers: []};
  minDate: Date;
  maxDate: Date;

  constructor(private deviceBreakpoint: DeviceBreakpointService, private combinationsService: CombinationsService, private matSnackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }
}
