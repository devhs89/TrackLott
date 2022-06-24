import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../../services/account.service";
import {Subscription} from "rxjs";
import {Countries} from "../../../constants/countries";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserProfile} from "../../../models/user-profile";
import {UserPassword} from "../../../models/user-password";
import {ProgressIndicatorService} from "../../../services/progress-indicator.service";
import {SnackBarService} from "../../../services/snack-bar.service";
import {capitalizeString} from "../../../helpers/capitalize-string";
import {notificationMessage} from "../../../constants/notification-message";
import {UpdateField} from "../../../models/update-field";

@Component({
  selector: 'app-account',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isLoading$ = this.loadingService.isLoading$;
  updateInfoSubscription = new Subscription();
  updatePasswordSubscription = new Subscription();
  showUserSubscription = new Subscription();
  countries = Countries;
  profileForm: FormGroup;
  passwordsForm: FormGroup;
  disablePasswordControls: boolean = true;
  private email: FormControl;
  private givenName: FormControl;
  private surname: FormControl;
  private dob: FormControl;
  private country: FormControl;
  private currentPassword: FormControl;
  private newPassword: FormControl;
  private repeatPassword: FormControl;
  private userProfile: UserProfile;
  private userPwd: UserPassword = {currentPassword: "", newPassword: "", repeatPassword: ""};

  constructor(private loadingService: ProgressIndicatorService, private formBuilder: FormBuilder, private accountService: AccountService, private snackBarService: SnackBarService) {
  }

  ngOnInit(): void {
    this.email = new FormControl(null, Validators.email);
    this.givenName = new FormControl(null);
    this.surname = new FormControl(null);
    this.dob = new FormControl(null);
    this.country = new FormControl(null);
    this.currentPassword = new FormControl({value: null, disabled: this.disablePasswordControls});
    this.newPassword = new FormControl({value: null, disabled: this.disablePasswordControls});
    this.repeatPassword = new FormControl({value: null, disabled: this.disablePasswordControls});

    this.profileForm = this.formBuilder.group({
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

    this.getUserProfile();
  }

  showPasswordControls() {
    if (this.disablePasswordControls) {
      this.passwordsForm.enable();
    } else {
      this.resetPasswordForm();
    }
    this.disablePasswordControls = !this.disablePasswordControls;
  }

  onUpdateSubmit() {
    const infoToUpdate: UpdateField = {
      email: undefined,
      givenName: undefined,
      surname: undefined,
      country: undefined
    };
    const infoToUpdateKeys = Object.keys(infoToUpdate);

    for (let ctrl in this.profileForm.controls) {
      if (infoToUpdateKeys.includes(ctrl)) {
        // @ts-ignore
        const fetchedInfo = this.userProfile[ctrl].toLowerCase();
        const formField = this.profileForm.controls[ctrl].value.toLowerCase();

        if (fetchedInfo !== formField) {
          // @ts-ignore
          infoToUpdate[ctrl] = formField;
        }
      }
    }

    if (infoToUpdate.email !== undefined || infoToUpdate.givenName !== undefined || infoToUpdate.surname !== undefined || infoToUpdate.country !== undefined) {
      this.updateInfoSubscription = this.accountService.onUpdateInfo(infoToUpdate)
        .subscribe({
          next: resp => this.snackBarService.showSnackBar(resp === null ? notificationMessage.profileUpdateSuccess : notificationMessage.generic),
          error: err => this.snackBarService.showSnackBar(err.error),
          complete: () => this.getUserProfile()
        });
    }
  }

  onPasswordsSubmit() {
    if (this.passwordsForm.valid) {
      this.userPwd.currentPassword = this.currentPassword.value;
      this.userPwd.newPassword = this.newPassword.value;
      this.userPwd.repeatPassword = this.repeatPassword.value;

      if (this.userPwd.newPassword === this.userPwd.repeatPassword) {
        this.updateInfoSubscription = this.accountService.onUpdatePassword(this.userPwd)
          .subscribe({
            next: resp => this.snackBarService.showSnackBar(resp),
            error: err => this.snackBarService.showSnackBar(err.error),
            complete: () => {
              this.resetPasswordForm();
              this.disablePasswordControls = true;
            }
          });
      } else {
        this.snackBarService.showSnackBar(notificationMessage.passwordMismatch);
      }
    }
  }

  ngOnDestroy() {
    this.updateInfoSubscription.unsubscribe();
    this.updatePasswordSubscription.unsubscribe();
    this.showUserSubscription.unsubscribe();
  }

  private getUserProfile() {
    this.accountService.showUser().subscribe({
      next: (resp: UserProfile) => {
        const dobReversed = resp.dob.split('/').reverse().join('/');
        this.userProfile = resp;

        this.profileForm.setValue({
          email: resp.email,
          givenName: resp.givenName ? capitalizeString(resp.givenName) : '',
          surname: resp.surname ? capitalizeString(resp.surname) : '',
          dob: new Date(dobReversed),
          country: resp.country ? capitalizeString(resp.country) : ''
        });
      },
      error: err => this.snackBarService.showSnackBar(err.error)
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
}
