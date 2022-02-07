import {Component, OnDestroy, OnInit} from '@angular/core';
import {COUNTRIES} from "../../constants/countries";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";
import {UserRegister} from "../../models/user-register";
import {setSessionUserToken} from "../../helpers/local-storage";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerSubscription = new Subscription();
  loginSubscription = new Subscription();
  countries: string[] = COUNTRIES;

  constructor(private accountService: AccountService, private router: Router, private matSnackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  onSubmit(ngFormObj: NgForm) {
    if (ngFormObj.invalid) return;

    let userDetails: UserRegister = {...ngFormObj.value};

    this.registerSubscription = this.accountService.onRegister(userDetails).subscribe({
      next: (resp: any) => {
        if (resp["userName"] && resp["token"]) {
          this.accountService.appUserReplaySubject.next(resp);
          setSessionUserToken(resp);
          this.router.navigate(["/user/account"]);
        }
      },
      error: resp => this.matSnackBar.open(resp.error, "Dismiss")
    });
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
    this.registerSubscription.unsubscribe();
  }
}
