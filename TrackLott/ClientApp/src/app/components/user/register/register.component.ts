import {Component, OnDestroy} from '@angular/core';
import {Countries} from "../../../constants/countries";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {AccountService} from "../../../services/account.service";
import {Router} from "@angular/router";
import {UserRegister} from "../../../models/user-register";
import {setSessionUserToken} from "../../../helpers/local-storage";
import {ProgressIndicatorService} from "../../../services/progress-indicator.service";
import {pathConst} from "../../../constants/path-const";
import {SnackBarService} from "../../../services/snack-bar.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {
  isLoading$ = this.loadingService.isLoading$;
  registerSubscription = new Subscription();
  loginSubscription = new Subscription();
  appRoute = pathConst;
  countries = Countries;

  constructor(private loadingService: ProgressIndicatorService, private accountService: AccountService, private router: Router, private snackBar: SnackBarService) {
  }

  onSubmit(ngFormObj: NgForm) {
    console.log(ngFormObj);

    if (ngFormObj.invalid) return;
    let userDetails: UserRegister = {...ngFormObj.value};

    this.registerSubscription = this.accountService.onRegister(userDetails).subscribe({
      next: resp => {
        if (resp.email && resp.token) {
          setSessionUserToken(resp);
          this.router.navigate([pathConst.accountRel]);
        }
      },
      error: resp => this.snackBar.showSnackBar(resp.error)
    });
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
    this.registerSubscription.unsubscribe();
  }
}
