import {Component} from '@angular/core';
import {Countries} from "../../../constants/countries";
import {NgForm} from "@angular/forms";
import {AccountService} from "../../../services/account.service";
import {Router} from "@angular/router";
import {appRoute} from "../../../constants/app-route";
import {SnackBarService} from "../../../services/snack-bar.service";
import {UserRegisterModel} from "../../../models/user-register.model";
import {genericConst} from "../../../constants/generic-const";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  cardClasses = genericConst.cardClasses
  appRoute = appRoute;
  countries = Countries;

  constructor(private accountService: AccountService, private router: Router, private snackBar: SnackBarService) {
  }

  onRegisterSubmit(ngFormObj: NgForm) {
    if (ngFormObj.invalid) return;
    let userDetails: UserRegisterModel = {...ngFormObj.value};

    this.accountService.register(userDetails).subscribe({
      next: () => {
        const ignore = this.router.navigate([appRoute.profileRel]);
      },
      error: resp => this.snackBar.handleResponse(resp.error)
    });
  }
}
