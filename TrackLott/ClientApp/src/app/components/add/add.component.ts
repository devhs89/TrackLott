import {Component, OnInit} from '@angular/core';
import {DeviceBreakpointService} from "../../services/device-breakpoint.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {Breakpoints} from "@angular/cdk/layout";
import {CombinationsService} from "../../services/combinations.service";
import {MatSelectChange} from "@angular/material/select";
import {lottoName, lottoSelectOption} from "../../constants/lotto-select-option";
import {SnackBarService} from "../../services/snack-bar.service";
import {genericConst} from "../../constants/generic-const";
import {Combination, CombinationPayload, PickedNumbers} from "../../models/combination.model";
import {GameSpec} from "../../models/lotto-game.model";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  isHandset$: Observable<boolean>;
  lotterySelectOption = lottoSelectOption;
  selectedGameOption: GameSpec = lottoSelectOption.generic;
  defaultSelectOption = lottoName.genericId;
  addCombosForm: FormGroup;
  lotteryNameControl: FormControl;
  purchaseDateControl: FormControl;
  currPickedNums: PickedNumbers = {primaryNumbers: [], secondaryNumbers: []};
  allCombinations: Combination[] = [];
  minDate: Date;
  maxDate: Date;
  gc = genericConst;

  constructor(private deviceBreakpoint: DeviceBreakpointService, private combinationsService: CombinationsService, private snackBarService: SnackBarService) {
  }

  ngOnInit(): void {
    this.isHandset$ = this.deviceBreakpoint.handsetBreakpoint(Breakpoints.XSmall);
    this.initializeForm();
    const today = new Date();
    this.minDate = new Date(today.getFullYear() - 120, 0, 1);
    this.maxDate = new Date(today.getFullYear(), today.getMonth() + 6, today.getDate());
  }

  public onLotterySelect(event: MatSelectChange) {
    this.clearCurrentPickedNumbers();
    switch (event.value) {
      case lottoName.monWedLottoId:
        this.selectedGameOption = this.lotterySelectOption.monWedLotto;
        break;
      case lottoName.ozLottoId:
        this.selectedGameOption = this.lotterySelectOption.ozLotto;
        break;
      case lottoName.powerballId:
        this.selectedGameOption = this.lotterySelectOption.powerball;
        break;
      case lottoName.tattsLottoId:
        this.selectedGameOption = this.lotterySelectOption.tattsLotto;
        break;
      case lottoName.setForLife744Id:
        this.selectedGameOption = this.lotterySelectOption.setForLife744;
        break;
      case lottoName.super66Id:
        this.selectedGameOption = this.lotterySelectOption.super66;
        break;
    }

    this.numButtons(event.value);
  }

  onPrimaryNumClick(clickedNum: number) {
    if (this.currPickedNums.primaryNumbers.includes(clickedNum)) {
      const dex = this.currPickedNums.primaryNumbers.indexOf(clickedNum);
      this.currPickedNums.primaryNumbers.splice(dex, 1);
    } else {
      if (this.currPickedNums.primaryNumbers.length < this.selectedGameOption.allowed) {
        this.currPickedNums.primaryNumbers.push(clickedNum);
      }
    }
    this.autoAddCombination();
  }

  onSecondaryNumClick(clickedNum: number) {
    if (this.selectedGameOption.name.toLowerCase() === lottoName.powerballDisplay.toLowerCase()) {
      this.currPickedNums.secondaryNumbers = [clickedNum];
    } else {
      this.currPickedNums.secondaryNumbers?.push(clickedNum);
    }
    this.autoAddCombination();
  }

  private checkSelectedLotto() {
    if (this.selectedGameOption.name.toLowerCase() === lottoName.powerballDisplay.toLowerCase()) {
      if (this.currPickedNums.secondaryNumbers && this.currPickedNums.secondaryNumbers.length === 1) {
        this.addCombination();
      }
    } else {
      this.addCombination();
    }
  }

  autoAddCombination() {
    if (this.currPickedNums.primaryNumbers.length === this.selectedGameOption.allowed) {
      this.checkSelectedLotto();
    }
  }

  onAddCombination() {
    if (this.currPickedNums.primaryNumbers.length >= this.selectedGameOption.standard) {
      this.checkSelectedLotto();
    }
  }

  onClear(dex: number) {
    this.allCombinations.splice(dex, 1);
  }

  onSaveCombinations() {
    if (this.addCombosForm.valid && this.allCombinations.length > 0) {
      const payload: CombinationPayload[] = [];
      for (const combo of this.allCombinations) {
        payload.push({...combo, pickedNumbers: JSON.stringify(combo.pickedNumbers)});
      }
      this.combinationsService.addCombinations(payload).subscribe({
        next: resp => {
          this.snackBarService.handleResponse(resp);
          this.clearCurrentPickedNumbers();
          this.clearAllPickedNumbers();
        },
        error: err => this.snackBarService.handleResponse(err.error)
      });
    }
  }

  private initializeForm() {
    this.lotteryNameControl = new FormControl(this.defaultSelectOption, [Validators.maxLength(54)]);
    this.purchaseDateControl = new FormControl(new Date(), Validators.required);
    this.addCombosForm = new FormGroup({
      lotteryNameControl: this.lotteryNameControl,
      purchaseDateControl: this.purchaseDateControl
    });
    this.numButtons();
  }

  private numButtons(lottoId?: string) {
    this.selectedGameOption.primaryNumbers = [];
    this.selectedGameOption.secondaryNumbers = [];

    for (let i = 1; i <= this.selectedGameOption.biggest; i++) {
      this.selectedGameOption.primaryNumbers.push(i);
    }
    if (lottoId === lottoName.powerballId) {
      for (let i = 1; i <= 20; i++) {
        this.selectedGameOption.secondaryNumbers.push(i);
      }
    }
    if (lottoId === lottoName.super66Id) {
      this.selectedGameOption.primaryNumbers.unshift(0);
    }
  }

  private clearCurrentPickedNumbers() {
    this.currPickedNums.primaryNumbers = [];
    this.currPickedNums.secondaryNumbers = [];
  }

  private clearAllPickedNumbers() {
    this.allCombinations = [];
  }

  private addCombination() {
    this.allCombinations.unshift({
      lottoName: this.lotteryNameControl.value || undefined,
      dateAdded: this.purchaseDateControl.value,
      pickedNumbers: {
        primaryNumbers: this.currPickedNums.primaryNumbers,
        secondaryNumbers: this.currPickedNums.secondaryNumbers && this.currPickedNums.secondaryNumbers.length > 0 ? this.currPickedNums.secondaryNumbers : undefined
      }
    });
    this.clearCurrentPickedNumbers();
  }
}
