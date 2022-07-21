import {Component, OnInit} from '@angular/core';
import {Countries} from "../../../constants/countries";
import {NgForm} from "@angular/forms";
import {AccountService} from "../../../services/account.service";
import {Router} from "@angular/router";
import {appRoute} from "../../../constants/app-route";
import {SnackBarService} from "../../../services/snack-bar.service";
import {UserRegisterModel} from "../../../models/user-register.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  appRoute = appRoute;
  countries = Countries;
  minDate: Date;
  maxDate: Date;

  constructor(private accountService: AccountService, private router: Router, private snackBar: SnackBarService) {
  }

  ngOnInit(): void {
    const dt = new Date();
    this.minDate = new Date(dt.getFullYear() - 100, 0, 1);
    this.maxDate = new Date(dt.getFullYear() - 18, dt.getMonth(), dt.getDate());
  }

  onRegisterSubmit(ngFormObj: NgForm) {
    if (ngFormObj.invalid) return;
    let userDetails: UserRegisterModel = {...ngFormObj.value};

    this.accountService.register(userDetails).subscribe({
      next: () => {
        const ignore = this.router.navigate([appRoute.profileAbs]);
      },
      error: resp => this.snackBar.handleResponse(resp.error)
    });
  }
}
