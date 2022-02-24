import {Component, OnInit} from '@angular/core';
import {DeviceBreakpointService} from "../services/device-breakpoint.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {Breakpoints} from "@angular/cdk/layout";
import {CombinationsService} from "../services/combinations.service";
import {LotteryNameOptions} from "../models/lottery-name-options";
import {MatSelectChange} from "@angular/material/select";
import {Combination, PickedNumbers} from "../models/combination";
import {allLottoNames} from "../constants/lotto-names";
import {MatSnackBar} from "@angular/material/snack-bar";
import {parseError} from "../helpers/parse-error";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  lotteryNames = allLottoNames;
  lotteryNameSelected: LotteryNameOptions = {
    name: "default",
    biggest: 45,
    standard: 6,
    allowed: 20,
    mainNums: [],
    jackpotNums: []
  };
  isHandset$: Observable<boolean>;
  addCombosForm: FormGroup;
  lotteryNameControl: FormControl;
  dateAddedControl: FormControl;
  currPickedNums: PickedNumbers = {mainNums: []};
  allPickedNums: PickedNumbers[] = [];
  combinations: Combination;
  minDate: Date;
  maxDate: Date;

  constructor(private deviceBreakpoint: DeviceBreakpointService, private combinationsService: CombinationsService, private matSnackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.isHandset$ = this.deviceBreakpoint.handsetBreakpoint(Breakpoints.XSmall);

    this.initializeForm();

    const today = new Date();
    this.minDate = new Date(today.getFullYear() - 120, 0, 1);
    this.maxDate = new Date(today.getFullYear(), today.getMonth() + 6, today.getDate());
  }

  private initializeForm() {
    this.lotteryNameControl = new FormControl(null, [Validators.maxLength(54)]);
    this.dateAddedControl = new FormControl(new Date(), Validators.required);

    this.addCombosForm = new FormGroup({
      lotteryNameControl: this.lotteryNameControl,
      dateAddedControl: this.dateAddedControl
    });

    this.numButtons();
  }

  public onLotterySelect(event: MatSelectChange) {
    this.clearAllPickedNumbers();
    this.clearCurrentPickedNumbers();

    switch (event.value) {
      case "mondayLotto":
        this.lotteryNameSelected = this.lotteryNames.mondayLotto;
        break;
      case "ozLotto":
        this.lotteryNameSelected = this.lotteryNames.ozLotto;
        break;
      case "wednesdayLotto":
        this.lotteryNameSelected = this.lotteryNames.wednesdayLotto;
        break;
      case "powerball":
        this.lotteryNameSelected = this.lotteryNames.powerball;
        break;
      case "tattsLotto":
        this.lotteryNameSelected = this.lotteryNames.tattsLotto;
        break;
    }
    this.numButtons();
  }

  onMainNumClick(clickedNum: number) {
    if (this.currPickedNums.mainNums.includes(clickedNum)) {
      const dex = this.currPickedNums.mainNums.indexOf(clickedNum);
      this.currPickedNums.mainNums.splice(dex, 1);
    } else {
      if (this.currPickedNums.mainNums.length < this.lotteryNameSelected.allowed) {
        this.currPickedNums.mainNums.push(clickedNum);
      }
    }
    this.autoAddCombination();
  }

  onJackpotNumClick(clickedNum: number) {
    this.currPickedNums.jackpot = clickedNum;
    this.autoAddCombination();
  }

  autoAddCombination() {
    if (this.currPickedNums.mainNums.length === this.lotteryNameSelected.allowed) {
      this.checkSelectedLotto();
    }
  }

  onAddCombination() {
    if (this.currPickedNums.mainNums.length >= this.lotteryNameSelected.standard) {
      this.checkSelectedLotto();
    }
  }

  onClear(dex: number) {
    this.allPickedNums.splice(dex, 1);
  }

  onSaveCombinations() {
    if (this.addCombosForm.valid && this.allPickedNums.length > 0) {
      this.combinations = {
        lottoName: this.lotteryNameSelected.name,
        dateAdded: this.dateAddedControl.value.toString(),
        pickedNumbers: this.allPickedNums
      };
      this.combinationsService.addCombinations(this.combinations).subscribe({
        next: resp => {
          this.matSnackBar.open(resp, "Dismiss");
          this.clearCurrentPickedNumbers();
          this.clearAllPickedNumbers();
        },
        error: err => this.matSnackBar.open(parseError(err.error), "Dismiss")
      });
    }
  }

  private numButtons() {
    this.lotteryNameSelected.mainNums = [];
    this.lotteryNameSelected.jackpotNums = [];

    for (let i = 1; i <= this.lotteryNameSelected.biggest; i++) {
      this.lotteryNameSelected.mainNums.push(i);
    }

    if (this.lotteryNameSelected.name === "Powerball") {
      for (let i = 1; i <= 20; i++) {
        this.lotteryNameSelected.jackpotNums.push(i);
      }
    }
  }

  private clearCurrentPickedNumbers() {
    this.currPickedNums.mainNums = [];
    if (this.currPickedNums.jackpot) this.currPickedNums.jackpot = 0;
  }

  private clearAllPickedNumbers() {
    this.allPickedNums = [];
  }

  private addCombination() {
    this.allPickedNums.unshift({mainNums: this.currPickedNums.mainNums, jackpot: this.currPickedNums.jackpot});
    this.clearCurrentPickedNumbers();
  }

  private checkSelectedLotto() {
    if (this.lotteryNameSelected.name === "Powerball") {
      if (this.currPickedNums.jackpot && this.currPickedNums.jackpot > 0) {
        this.addCombination();
      }
    } else {
      this.addCombination();
    }
  }
}
