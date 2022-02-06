import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";
import {setLocalUserToken, setSessionUserToken} from "../../helpers/common-methods";
import {UserLogin} from "../../models/user-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  subscription = new Subscription();
  formInvalid = false;

  constructor(private accountService: AccountService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      "userName": new FormControl(null, Validators.required),
      "password": new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      let userCredentials: UserLogin = {...this.loginForm.value};

      this.subscription = this.accountService.onLogin({
        userName: userCredentials.userName,
        password: userCredentials.password
      }).subscribe((response: any) => {
        if (response["userName"] && response["token"]) {
          this.accountService.appUserReplaySubject.next(response);
          userCredentials.rememberMe ? setLocalUserToken(response) : setSessionUserToken(response);
          this.router.navigate(["/home"]);
        }
      }, error => console.log(error.message()));
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
