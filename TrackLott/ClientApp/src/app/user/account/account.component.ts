import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {COUNTRIES} from "../../constants/countries";
import {Subscription} from "rxjs";
import {AccountService} from "../../services/account.service";
import {UserInfo} from "../../models/user-info";
import {UserPassword} from "../../models/user-password";
import {MatSnackBar} from "@angular/material/snack-bar";
import {capitalizeString} from "../../helpers/capitalize-string";
import {parseError} from "../../helpers/parse-error";
import {UserUpdateInfo} from "../../models/user-update-info";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {
  updateInfoSubscription = new Subscription();
  updatePasswordSubscription = new Subscription();
  showUserSubscription = new Subscription();
  countries: string[] = COUNTRIES;
  infoForm: FormGroup;
  passwordsForm: FormGroup;
  disablePasswordControls: boolean = true;
  private userName: FormControl;
  private email: FormControl;
  private givenName: FormControl;
  private surname: FormControl;
  private dob: FormControl;
  private country: FormControl;
  private currentPassword: FormControl;
  private newPassword: FormControl;
  private repeatPassword: FormControl;
  private info: UserInfo;
  private userPasswords: UserPassword = {currentPassword: "", newPassword: "", repeatPassword: ""};

  constructor(private formBuilder: FormBuilder, private accountService: AccountService, private matSnackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.userName = new FormControl(null);
    this.email = new FormControl(null, Validators.email);
    this.givenName = new FormControl(null);
    this.surname = new FormControl(null);
    this.dob = new FormControl(null);
    this.country = new FormControl(null);
    this.currentPassword = new FormControl({value: null, disabled: this.disablePasswordControls});
    this.newPassword = new FormControl({value: null, disabled: this.disablePasswordControls});
    this.repeatPassword = new FormControl({value: null, disabled: this.disablePasswordControls});

    this.infoForm = this.formBuilder.group({
      userName: this.userName,
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

    this.getUserAccount();
  }

  showPasswordControls() {
    if (this.disablePasswordControls) {
      this.passwordsForm.enable();
    } else {
      this.resetPasswordForm();
    }
    this.disablePasswordControls = !this.disablePasswordControls;
  }

  onSubmitInfo() {
    const infoToUpdate: UserUpdateInfo = {
      email: undefined,
      givenName: undefined,
      surname: undefined,
      country: undefined
    };
    const infoToUpdateKeys = Object.keys(infoToUpdate);

    for (let ctrl in this.infoForm.controls) {
      if (infoToUpdateKeys.includes(ctrl)) {
        // @ts-ignore
        const fetchedInfo = this.info[ctrl].toLowerCase();
        const formField = this.infoForm.controls[ctrl].value.toLowerCase();

        if (fetchedInfo !== formField) {
          // @ts-ignore
          infoToUpdate[ctrl] = formField;
        }
      }
    }

    if (infoToUpdate.email !== undefined || infoToUpdate.givenName !== undefined || infoToUpdate.surname !== undefined || infoToUpdate.country !== undefined) {
      this.updateInfoSubscription = this.accountService.onUpdateInfo(infoToUpdate)
        .subscribe({
          next: resp => this.matSnackBar.open(resp === null ? "Update Successful" : "Something went wrong", "Dismiss"),
          error: err => this.matSnackBar.open(parseError(err.error), "Dismiss"),
          complete: () => this.getUserAccount()
        });
    }
  }

  onSubmitPasswords() {
    if (this.passwordsForm.valid) {
      this.userPasswords.currentPassword = this.currentPassword.value;
      this.userPasswords.newPassword = this.newPassword.value;
      this.userPasswords.repeatPassword = this.repeatPassword.value;

      this.updateInfoSubscription = this.accountService.onUpdatePassword(this.userPasswords)
        .subscribe({
          next: resp => this.matSnackBar.open(resp, "Dismiss"),
          error: err => this.matSnackBar.open(parseError(err.error), "Dismiss"),
          complete: () => {
            this.resetPasswordForm();
            this.disablePasswordControls = true;
          }
        });
    }
  }

  private getUserAccount() {
    this.showUserSubscription = this.accountService.showUser().subscribe({
      next: (resp: UserInfo) => {
        const dob = new Date(resp.dob);
        this.info = resp;

        this.infoForm.setValue({
          userName: resp.userName,
          email: resp.email,
          givenName: resp.givenName ? capitalizeString(resp.givenName) : '',
          surname: resp.surname ? capitalizeString(resp.surname) : '',
          dob: `${dob.getDate()}/${dob.getMonth()}/${dob.getFullYear()}`,
          country: resp.country ? capitalizeString(resp.country) : ''
        });
      },
      error: err => this.matSnackBar.open(err.error, "Dismiss")
    });
  }

  private resetPasswordForm() {
    this.passwordsForm.reset({
      currentPassword: {value: null, disabled: true},
      newPassword: {value: null, disabled: true},
      repeatPassword: {value: null, disabled: true}
    });
    this.passwordsForm.disable();
  }

  ngOnDestroy() {
    this.updateInfoSubscription.unsubscribe();
    this.updatePasswordSubscription.unsubscribe();
    this.showUserSubscription.unsubscribe();
  }
}
