import {Component} from '@angular/core';
import {Countries} from "../../../constants/countries";
import {NgForm} from "@angular/forms";
import {AccountService} from "../../../services/account.service";
import {Router} from "@angular/router";
import {UserRegister} from "../../../models/user-register";
import {ProgressIndicatorService} from "../../../services/progress-indicator.service";
import {pathConst} from "../../../constants/path-const";
import {SnackBarService} from "../../../services/snack-bar.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  isLoading$ = this.loadingService.isLoading$;
  appRoute = pathConst;
  countries = Countries;

  constructor(private loadingService: ProgressIndicatorService, private accountService: AccountService, private router: Router, private snackBar: SnackBarService) {
  }

  onRegisterSubmit(ngFormObj: NgForm) {
    console.log(ngFormObj);
    if (ngFormObj.invalid) return;
    let userDetails: UserRegister = {...ngFormObj.value};

    this.accountService.onRegister(userDetails).subscribe({
      next: () => {
        const ignore = this.router.navigate([pathConst.profileRel]);
      },
      error: resp => this.snackBar.showSnackBar(resp.error)
    });
  }
}
