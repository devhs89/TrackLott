import {Component} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {genericConst} from "../../constants/generic-const";

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent {
  deltaNums: number[][] = [
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5, 6, 7],
    [7, 9],
    [8, 9, 10, 11, 12, 13, 14, 15]
  ];
  numTotal: number = 0;
  rowOneNum: number = 0;
  rowTwoNums: number[] = [];
  rowThreeNum: number = 0;
  rowFourNums: number[] = [];
  allPickedNumbers: number[] = [];
  resultNums: number[] = [];
  isDeltaGameValid: boolean = false;
  gc = genericConst;

  constructor(private matSnackBar: MatSnackBar) {
  }

  onClickBtn(event: MouseEvent, outerDex: number) {
    // @ts-ignore
    const btnSelected = +event.target?.textContent;
    this.confirmNumbers(outerDex, btnSelected);

    if (this.numTotal > 45) {
      this.confirmNumbers(outerDex, btnSelected);
      this.matSnackBar.open("Sum of selected numbers exceeds 45. Please select a lower number.", "Dismiss");
    }
    this.isDeltaGameValid = this.rowOneNum > 0 && this.rowTwoNums.length == 2 && this.rowThreeNum > 0 && this.rowFourNums.length == 2 && this.numTotal <= 45;
  }

  onSubmitDeltaNums() {
    if (this.isDeltaGameValid) {
      this.allPickedNumbers.push(this.rowOneNum);
      this.allPickedNumbers = this.allPickedNumbers.concat(this.rowTwoNums);
      this.allPickedNumbers.push(this.rowThreeNum);
      this.allPickedNumbers = this.allPickedNumbers.concat(this.rowFourNums);

      this.allPickedNumbers.sort((a, b) => Math.random() - 0.5);

      const num1 = this.allPickedNumbers[0];
      const num2 = num1 + this.allPickedNumbers[1];
      const num3 = num2 + this.allPickedNumbers[2];
      const num4 = num3 + this.allPickedNumbers[3];
      const num5 = num4 + this.allPickedNumbers[4];
      const num6 = num5 + this.allPickedNumbers[5];

      this.resultNums = [num1, num2, num3, num4, num5, num6];
      this.resetDeltaGame();
    }
  }

  private confirmNumbers(outerDex: number, btnSelected: number) {
    this.allPickedNumbers = [];

    switch (outerDex) {
      case 0:
        if (this.rowOneNum === btnSelected) {
          this.rowOneNum = 0;
          this.numTotal -= btnSelected;
        } else {
          this.rowOneNum = btnSelected;
          this.numTotal += btnSelected;
        }
        break;
      case 1:
        if (this.rowTwoNums.includes(btnSelected)) {
          this.rowTwoNums.splice(this.rowTwoNums.findIndex(item => item === btnSelected), 1);
          this.numTotal -= btnSelected;
        } else {
          this.rowTwoNums.push(btnSelected);
          this.numTotal += btnSelected;
        }
        break;
      case 2:
        if (this.rowThreeNum === btnSelected) {
          this.rowThreeNum = 0;
          this.numTotal -= btnSelected;
        } else {
          this.rowThreeNum = btnSelected;
          this.numTotal += btnSelected;
        }
        break;
      case 3:
        if (this.rowFourNums.includes(btnSelected)) {
          this.rowFourNums.splice(this.rowFourNums.findIndex(item => item === btnSelected), 1);
          this.numTotal -= btnSelected;
        } else {
          this.rowFourNums.push(btnSelected);
          this.numTotal += btnSelected;
        }
        break;
    }
  }

  private resetDeltaGame() {
    this.allPickedNumbers = [];
    this.rowOneNum = 0;
    this.rowTwoNums = [];
    this.rowThreeNum = 0;
    this.rowFourNums = [];
    this.numTotal = 0;
    this.isDeltaGameValid = false;
    window.scroll({top: 0, left: 0, behavior: "smooth"});
  }
}
