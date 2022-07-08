import {Component} from '@angular/core';
import {genericConst} from "../../constants/generic-const";

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent {
  cardClasses = genericConst.cardClasses;
}
