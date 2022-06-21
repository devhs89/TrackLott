import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {AccountService} from "../../../services/account.service";
import {Router} from "@angular/router";
import {setLocalUserToken, setSessionUserToken} from "../../../helpers/local-storage";
import {UserLogin} from "../../../models/user-login";
import {MatSnackBar} from "@angular/material/snack-bar";
import {parseError} from "../../../helpers/parse-error";
import {ProgressIndicatorService} from "../../../services/progress-indicator.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading$ = this.loadingService.isLoading$;
  loginForm: FormGroup;
  subscription = new Subscription();

  constructor(private loadingService: ProgressIndicatorService, private accountService: AccountService, private router: Router, private matSnackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      "email": new FormControl(null, Validators.required),
      "password": new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      let userCredentials: UserLogin = {...this.loginForm.value};

      this.subscription = this.accountService.onLogin({
        email: userCredentials.email,
        password: userCredentials.password
      }).subscribe({
        next: response => {
          if (response.email && response.token) {
            userCredentials.rememberMe ? setLocalUserToken(response) : setSessionUserToken(response);
            this.router.navigate(["/home"]);
          }
        },
        error: err => this.matSnackBar.open(parseError(err.error), "Dismiss")
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
