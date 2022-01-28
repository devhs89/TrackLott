import {Component, OnInit} from '@angular/core';
import {DeviceBreakpoint} from "../services/device-breakpoint.service";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {Breakpoints} from "@angular/cdk/layout";
import {CombinationsService} from "../services/combinations.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AvailableLotteries} from "../models/lottery-name-options";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  lotteryNamesArray: AvailableLotteries = {
    mondayLotto: {name: "Monday Lotto", biggest: 45, standard: 6, allowed: 20},
    ozLotto: {name: "Oz Lotto", biggest: 45, standard: 7, allowed: 20},
    wednesdayLotto: {name: "Wednesday Lotto", biggest: 45, standard: 6, allowed: 20},
    powerball: {name: "Powerball", biggest: 35, standard: 7, allowed: 20, jackpot: 20},
    tattsLotto: {name: "Tatts Lotto", biggest: 45, standard: 6, allowed: 20}
  };
  isHandset$: Observable<boolean>;
  combosFormGroup: FormGroup;
  mainNumsArray: FormArray;
  powerNumsArray: FormArray;
  numbersSelected: { mainNums: number[], jackpotNum: number } = {mainNums: [], jackpotNum: 0};
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
      "mainNumsArray": new FormArray([]),
      "powerNumsArray": new FormArray([])
    });

    this.mainNumsArray = this.combosFormGroup.get("mainNumsArray") as FormArray;
    this.powerNumsArray = this.combosFormGroup.get("powerNumsArray") as FormArray;
    console.log("Happened");
    this.newNumControls();
  }

  public onLotterySelect(event: MatSelectChange) {
    this.mainNumsArray.clear();
    this.powerNumsArray.clear();

    switch (event.value) {
      case "mondayLotto":
        this.newNumControls(this.lotteryNamesArray.mondayLotto.biggest);
        break;
      case "ozLotto":
        this.newNumControls(this.lotteryNamesArray.ozLotto.biggest);
        break;
      case "wednesdayLotto":
        this.newNumControls(this.lotteryNamesArray.wednesdayLotto.biggest);
        break;
      case "powerball":
        this.newNumControls(this.lotteryNamesArray.powerball.biggest, this.lotteryNamesArray.powerball.jackpot);
        break;
      case "tattsLotto":
        this.newNumControls(this.lotteryNamesArray.tattsLotto.biggest);
        break;
      default:
        this.newNumControls();
    }
  }

  private newNumControls(mainControls: number = 45, jackpotControls?: number) {
    for (let i = 0; i < mainControls; i++) {
      this.mainNumsArray.push(new FormControl(false, Validators.pattern(/\d\d?/)));
    }

    if (jackpotControls) {
      for (let i = 0; i < jackpotControls; i++) {
        this.powerNumsArray.push(new FormControl(false, Validators.pattern(/\d\d?/)));
      }
    }
  }

  onAddCombination() {
    console.log(this.combosFormGroup);
  }
}
