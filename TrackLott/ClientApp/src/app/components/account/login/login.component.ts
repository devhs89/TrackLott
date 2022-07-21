import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../../services/account.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SnackBarService} from "../../../services/snack-bar.service";
import {appRoute} from "../../../constants/app-route";
import {UserLoginModel} from "../../../models/user-login.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  appRoute = appRoute

  constructor(private accountService: AccountService, private activatedRoute: ActivatedRoute, private router: Router, private snackBarService: SnackBarService) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      "email": new FormControl(null, Validators.required),
      "password": new FormControl(null, Validators.required),
      "rememberMe": new FormControl(false, Validators.pattern("true|false"))
    });
  }

  onLoginSubmit() {
    if (this.loginForm.valid) {
      let userCredentials: UserLoginModel = {...this.loginForm.value};
      this.accountService.login(userCredentials).subscribe({
        next: () => {
          const returnUrl = this.activatedRoute.snapshot.queryParamMap.get("returnUrl");
          returnUrl
            ? this.router.navigate([returnUrl])
            : this.router.navigate([appRoute.homeAbs]);
        },
        error: err => this.snackBarService.handleResponse(err.error)
      });
    }
  }
}
