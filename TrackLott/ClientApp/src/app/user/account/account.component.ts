import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {COUNTRIES} from "../../constants/countries";
import {Subscription} from "rxjs";
import {AccountService} from "../../services/account.service";
import {UserInfo} from "../../models/user-info";
import {UserPassword} from "../../models/user-password";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  updateInfoSubscription = new Subscription();
  updatePasswordSubscription = new Subscription();
  showUserSubscription = new Subscription();
  userInfo: UserInfo;
  countries: string[] = COUNTRIES;
  disablePasswordControls: boolean = true;
  private username: FormControl;
  private email: FormControl;
  private givenName: FormControl;
  private surname: FormControl;
  private dob: FormControl;
  private country: FormControl;
  private currentPassword: FormControl;
  private newPassword: FormControl;
  private repeatPassword: FormControl;
  infoForm: FormGroup;
  passwordsForm: FormGroup;
  private newInfo: UserInfo;
  private userPasswords: UserPassword;

  constructor(private formBuilder: FormBuilder, private accountService: AccountService, private matSnackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.showUserSubscription = this.accountService.showUser().subscribe({
      next: (resp: UserInfo) => this.userInfo = resp,
      error: err => this.matSnackBar.open(err.error, "Dismiss")
    });

    this.username = new FormControl(this.userInfo.username);
    this.email = new FormControl(this.userInfo.email, Validators.email);
    this.givenName = new FormControl(this.userInfo.givenName);
    this.surname = new FormControl(this.userInfo.surname);
    this.dob = new FormControl(this.userInfo.dob);
    this.country = new FormControl(this.userInfo.country);
    this.currentPassword = new FormControl({value: null, disabled: this.disablePasswordControls});
    this.newPassword = new FormControl({value: null, disabled: this.disablePasswordControls});
    this.repeatPassword = new FormControl({value: null, disabled: this.disablePasswordControls});

    this.infoForm = this.formBuilder.group({
      username: this.username,
      email: this.email,
      givenName: this.givenName,
      surname: this.surname,
      dob: this.dob,
      country: this.country
    });

    this.passwordsForm = this.formBuilder.group({
      currentPassword: this.currentPassword,
      newPassword: this.newPassword,
      repeatPassword: this.repeatPassword
    });
  }

  showPasswordControls() {
    if (this.disablePasswordControls) {
      this.passwordsForm.enable();
    } else {
      this.passwordsForm.reset({
        currentPassword: {value: null, disabled: true},
        newPassword: {value: null, disabled: true},
        repeatPassword: {value: null, disabled: true}
      });
      this.passwordsForm.disable();
    }
    this.disablePasswordControls = !this.disablePasswordControls;
  }

  onSubmitInfo() {
    this.updateInfoSubscription = this.accountService.onUpdateInfo(this.newInfo)
      .subscribe({
        next: resp => this.matSnackBar.open("TEST"),
        error: err => this.matSnackBar.open(err.message(), "Dismiss")
      });
  }

  onSubmitPasswords() {
    this.updateInfoSubscription = this.accountService.onUpdatePassword(this.userPasswords)
      .subscribe({
        next: resp => this.matSnackBar.open("TEST"),
        error: err => this.matSnackBar.open(err.message(), "Dismiss")
      });
  }
}
