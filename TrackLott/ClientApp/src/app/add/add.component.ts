import {Component, OnInit} from '@angular/core';
import {DeviceBreakpoint} from "../services/device-breakpoint.service";
import {FormControl, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {Breakpoints} from "@angular/cdk/layout";
import {CombinationsService} from "../services/combinations.service";
import {AvailableLotteries, LotteryNameOptions} from "../models/lottery-name-options";
import {MatSelectChange} from "@angular/material/select";
import {Combination} from "../models/combination";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  lotteryNames: AvailableLotteries = {
    mondayLotto: {name: "monday lotto", biggest: 45, standard: 6, allowed: 20, mainNums: []},
    ozLotto: {name: "oz lotto", biggest: 45, standard: 7, allowed: 20, mainNums: []},
    wednesdayLotto: {name: "wednesday lotto", biggest: 45, standard: 6, allowed: 20, mainNums: []},
    powerball: {name: "powerball", biggest: 35, standard: 7, allowed: 20, mainNums: []},
    tattsLotto: {name: "tatts lotto", biggest: 45, standard: 6, allowed: 20, mainNums: []}
  };
  isHandset$: Observable<boolean>;
  lotteryNameControl: FormControl;
  dateAddedControl: FormControl;
  lotteryNameSelected: LotteryNameOptions = {name: "default", biggest: 45, standard: 6, allowed: 20, mainNums: []};
  currPickedNums: number[] = [];
  allPickedNums: number[][] = [];
  combinations: Combination;
  numBtnReset: string | undefined = "selected";
  minDate: Date;
  maxDate: Date;

  constructor(private deviceBreakpoint: DeviceBreakpoint, private combinationsService: CombinationsService) {
  }

  ngOnInit(): void {
    this.isHandset$ = this.deviceBreakpoint.handsetBreakpoint(Breakpoints.Handset);

    this.initializeForm();

    const today = new Date();
    this.minDate = new Date(today.getFullYear() - 120, 0, 1);
    this.maxDate = new Date(today.getFullYear(), today.getMonth() + 6, today.getDate());
  }

  private initializeForm() {
    this.lotteryNameControl = new FormControl(null, [Validators.required, Validators.maxLength(54)]);
    this.dateAddedControl = new FormControl(null, Validators.required);
    this.numButtons();
  }

  public onLotterySelect(event: MatSelectChange) {
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
    this.numButtons(this.lotteryNameSelected.biggest);
  }

  private numButtons(mainNumLength: number = 45) {
    for (let i = 1; i <= mainNumLength; i++) {
      this.lotteryNameSelected.mainNums?.push(i);
    }
  }

  onNumClick(clickedNum: number, event: EventTarget | null) {
    if (this.currPickedNums.includes(clickedNum)) {
      const dex = this.currPickedNums.indexOf(clickedNum);
      this.currPickedNums.splice(dex, 1);
    } else {
      if (this.currPickedNums.length < this.lotteryNameSelected.allowed) {
        this.currPickedNums.push(clickedNum);
      }
    }

    if (this.currPickedNums.length === this.lotteryNameSelected.allowed) {
      this.onAddCombination();
    }
  }

  onAddCombination() {
    this.allPickedNums.unshift(this.currPickedNums);
    this.currPickedNums = [];
    this.numBtnReset = undefined;
  }

  onSave() {
    this.combinations = {
      lottoName: this.lotteryNameSelected.name,
      dateAdded: this.dateAddedControl.value,
      pickerNumbers: this.allPickedNums
    };
    this.combinationsService.addCombinations(this.combinations).subscribe(resp => console.log(resp));
  }
}
