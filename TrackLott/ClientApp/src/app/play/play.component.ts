import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
  deltaNums: number[][] = [
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5, 6, 7],
    [7, 9],
    [8, 9, 10, 11, 12, 13, 14, 15]
  ];
  rowOnePickedNum: number = 0;
  rowTwoPickedNums: number[] = [];
  rowThreePickedNum: number = 0;
  rowFourPickedNums: number[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  onClickBtn(event: MouseEvent, outerDex: number) {
    // @ts-ignore
    const btnSelected: number = +event.target?.textContent;

    switch (outerDex) {
      case 0:
        this.rowOnePickedNum === btnSelected ? this.rowOnePickedNum = 0 : this.rowOnePickedNum = btnSelected;
        break;
      case 1:
        this.rowTwoPickedNums.includes(btnSelected)
          ? this.rowTwoPickedNums.splice(this.rowTwoPickedNums.findIndex(item => item === btnSelected), 1)
          : this.rowTwoPickedNums.push(btnSelected);
        break;
    }
  }
}
