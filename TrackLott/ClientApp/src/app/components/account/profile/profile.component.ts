import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../../services/account.service";
import {Countries} from "../../../constants/countries";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SnackBarService} from "../../../services/snack-bar.service";
import {responseMsg} from "../../../constants/response-msg";
import {genericConst} from "../../../constants/generic-const";
import {UpdateFieldModel} from "../../../models/update-field.model";
import {UserPasswordModel} from "../../../models/user-password.model";
import {UserProfileModel} from "../../../models/user-profile.model";

@Component({
  selector: 'app-account',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
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
  private userProfile: UserProfileModel;
  private userPwd: UserPasswordModel = {currentPassword: "", newPassword: "", repeatPassword: ""};
  gc = genericConst;

  constructor(private formBuilder: FormBuilder, private accountService: AccountService, private snackBarService: SnackBarService) {
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
    if (this.profileForm.invalid) return;

    const infoToUpdate: UpdateFieldModel = {
      givenName: undefined,
      surname: undefined,
      country: undefined
    };
    const infoToUpdateKeys = Object.keys(infoToUpdate);

    for (let ctrl in this.profileForm.controls) {
      if (infoToUpdateKeys.includes(ctrl)) {
        // @ts-ignore
        const fetchedInfo = this.userProfile[ctrl];
        const formField = this.profileForm.controls[ctrl].value;

        if (fetchedInfo !== formField) {
          // @ts-ignore
          infoToUpdate[ctrl] = formField;
        }
      }
    }

    if (infoToUpdate.givenName === undefined && infoToUpdate.surname === undefined && infoToUpdate.country === undefined) return;

    this.accountService.updateInfo(infoToUpdate).subscribe({
      next: resp => this.snackBarService.handleResponse(resp === null ? responseMsg.profileUpdateSuccess : responseMsg.generic),
      error: err => this.snackBarService.handleResponse(err.error),
      complete: () => this.getUserProfile()
    });
  }

  private getUserProfile() {
    this.accountService.showUser().subscribe({
      next: (resp: UserProfileModel) => {
        const dobReversed = resp.dob.split('/').reverse().join('/');
        this.userProfile = resp;

        this.profileForm.setValue({
          email: resp.email,
          givenName: resp.givenName || '',
          surname: resp.surname || '',
          dob: new Date(dobReversed).toLocaleDateString(),
          country: resp.country.toUpperCase() || ''
        });
      },
      error: err => this.snackBarService.handleResponse(err.error)
    });
  }

  onPasswordsSubmit() {
    if (this.passwordsForm.valid) {
      this.userPwd.currentPassword = this.currentPassword.value;
      this.userPwd.newPassword = this.newPassword.value;
      this.userPwd.repeatPassword = this.repeatPassword.value;

      if (this.userPwd.newPassword === this.userPwd.repeatPassword) {
        this.accountService.updatePassword(this.userPwd)
          .subscribe({
            next: resp => this.snackBarService.handleResponse(resp),
            error: err => this.snackBarService.handleResponse(err.error),
            complete: () => {
              this.resetPasswordForm();
              this.disablePasswordControls = true;
            }
          });
      } else {
        this.snackBarService.handleResponse(responseMsg.passwordMismatch);
      }
    }
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
