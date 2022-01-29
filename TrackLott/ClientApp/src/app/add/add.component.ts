import {Component, OnInit} from '@angular/core';
import {DeviceBreakpoint} from "../services/device-breakpoint.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {Breakpoints} from "@angular/cdk/layout";
import {CombinationsService} from "../services/combinations.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AvailableLotteries, LotteryNameOptions} from "../models/lottery-name-options";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  lotteryNames: AvailableLotteries = {
    mondayLotto: {name: "Monday Lotto", biggest: 45, standard: 6, allowed: 20, mainNums: []},
    ozLotto: {name: "Oz Lotto", biggest: 45, standard: 7, allowed: 20, mainNums: []},
    wednesdayLotto: {name: "Wednesday Lotto", biggest: 45, standard: 6, allowed: 20, mainNums: []},
    powerball: {name: "Powerball", biggest: 35, standard: 7, allowed: 20, jackpot: 20, mainNums: [], jackpotNums: []},
    tattsLotto: {name: "Tatts Lotto", biggest: 45, standard: 6, allowed: 20, mainNums: []}
  };
  isHandset$: Observable<boolean>;
  combosFormGroup: FormGroup;
  lotteryNameSelected: LotteryNameOptions = {name: "Default", biggest: 45, standard: 6, allowed: 20, mainNums: []};
  currPickedNums: { mainNums: number[], jackpotNum?: number } = {mainNums: []};
  allPickedNums: { mainNums: number[][], jackpotNum?: number } = {mainNums: []};
  minDate: Date;
  maxDate: Date;

  constructor(private deviceBreakpoint: DeviceBreakpoint, private combinationsService: CombinationsService, private matSnackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.initializeForm();

    const today = new Date();
    this.minDate = new Date(today.getFullYear() - 120, 0, 1);
    this.maxDate = new Date(today.getFullYear(), today.getMonth() + 6, today.getDate());

    this.isHandset$ = this.deviceBreakpoint.handsetBreakpoint(Breakpoints.Handset);
  }

  private initializeForm() {
    this.combosFormGroup = new FormGroup({
      "lotteryName": new FormControl(null, [Validators.required, Validators.maxLength(54)]),
      "dateAdded": new FormControl(null, Validators.required),
    });

    this.numButtons();
  }

  public onLotterySelect(event: MatSelectChange) {
    switch (event.value) {
      case "mondayLotto":
        this.lotteryNameSelected = this.lotteryNames.mondayLotto;
        this.numButtons(this.lotteryNameSelected.biggest);
        break;
      case "ozLotto":
        this.lotteryNameSelected = this.lotteryNames.ozLotto;
        this.numButtons(this.lotteryNameSelected.biggest);
        break;
      case "wednesdayLotto":
        this.lotteryNameSelected = this.lotteryNames.wednesdayLotto;
        this.numButtons(this.lotteryNameSelected.biggest);
        break;
      case "powerball":
        this.lotteryNameSelected = this.lotteryNames.powerball;
        this.numButtons(this.lotteryNameSelected.biggest, this.lotteryNameSelected.jackpot);
        break;
      case "tattsLotto":
        this.lotteryNameSelected = this.lotteryNames.tattsLotto;
        this.numButtons(this.lotteryNameSelected.biggest);
        break;
      default:
        this.numButtons();
    }
  }

  private numButtons(mainNumLength: number = 45, jackpotNumLength?: number) {
    for (let i = 1; i <= mainNumLength; i++) {
      this.lotteryNameSelected.mainNums?.push(i);
    }

    if (jackpotNumLength) {
      for (let i = 1; i <= jackpotNumLength; i++) {
        this.lotteryNameSelected.jackpotNums?.push(i);
      }
    }
  }

  onNumberClick(clickedNum: number) {
    if (this.currPickedNums.mainNums.includes(clickedNum)) {
      const dex = this.currPickedNums.mainNums.indexOf(clickedNum);
      this.currPickedNums.mainNums.splice(dex, 1);
    } else {
      if (this.currPickedNums.mainNums.length < this.lotteryNameSelected.allowed) {
        this.currPickedNums.mainNums.push(clickedNum);
      }
    }

    if (this.currPickedNums.mainNums.length === this.lotteryNameSelected.allowed) {
      this.onAddCombination();
    }
  }

  onAddCombination() {
    this.allPickedNums.mainNums.push(this.currPickedNums.mainNums);
    this.currPickedNums.mainNums = [];
  }
}
