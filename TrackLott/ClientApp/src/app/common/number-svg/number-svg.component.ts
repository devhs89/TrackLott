import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-number-svg',
  templateUrl: './number-svg.component.html',
  styleUrls: []
})
export class NumberSvgComponent implements OnInit {
  @Input() numsArray?: number[] = [];
  @Input() bgFill?: string = "#673ab7";
  @Input() txtColor?: string = "#f8f9fa";

  constructor() {
  }

  ngOnInit(): void {
  }

}
