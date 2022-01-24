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
    monday_lotto: {name: "Monday Lotto", biggest: 45, standard: 6, allowed: 20},
    oz_lotto: {name: "Oz Lotto", biggest: 45, standard: 7, allowed: 20},
    wednesday_lotto: {name: "Wednesday Lotto", biggest: 45, standard: 6, allowed: 20},
    powerball: {name: "Powerball", biggest: 35, standard: 7, allowed: 20, jackpot: 20},
    tatts_lotto: {name: "Tatts Lotto", biggest: 45, standard: 6, allowed: 20}
  };
  isHandset$: Observable<boolean>;
  addCombosForm: FormGroup;
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
    this.addCombosForm = new FormGroup({
      "lotteryName": new FormControl(null, [Validators.required, Validators.maxLength(54)]),
      "dateAdded": new FormControl(null, Validators.required),
      "mainNumsArray": new FormArray([]),
      "powerNumsArray": new FormArray([])
    });

    this.mainNumsArray = this.addCombosForm.get("mainNumsArray") as FormArray;
    this.powerNumsArray = this.addCombosForm.get("powerNumsArray") as FormArray;
  }

  public onLotterySelect(event: MatSelectChange) {
    if (this.lotteryNamesArray.hasOwnProperty(event.value)) {
      this.mainNumsArray.clear();
      this.powerNumsArray.clear();
      // @ts-ignore
      for (let i = 1; i <= this.lotteryNamesArray[event.value].biggest; i++) {
        this.mainNumsArray.push(AddComponent.insertFormControls());
      }

      if (event.value === 'powerball' && this.lotteryNamesArray.powerball.jackpot) {
        for (let i = 1; i <= this.lotteryNamesArray.powerball.jackpot; i++) {
          this.powerNumsArray.push(AddComponent.insertFormControls());
        }
      }
    }
  }

  private static insertFormControls() {
    return new FormControl(false, Validators.pattern(/\d\d?/));
  }

  onAddCombination() {
    console.log(this.addCombosForm);

  }
}
