import {Component} from '@angular/core';
import {genericConst} from "../../../constants/generic-const";
import {appRoute} from "../../../constants/app-route";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent {
  cardClasses = genericConst.cardClasses;
  appRoute = appRoute;

  onForgotSubmit(forgotForm: NgForm) {
    if (forgotForm.invalid) return;
    console.log(forgotForm);
  }
}
