import {Component} from '@angular/core';
import {genericConst} from "../../constants/generic-const";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  greeting: string = "Welcome";
  cardClasses = genericConst.cardClasses;
}
