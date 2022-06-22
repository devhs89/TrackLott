import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountService} from "../../services/account.service";
import {Observable, Subscription} from "rxjs";
import {UserToken} from "../../models/user-token";
import {removeLocalUserToken, removeSessionUserToken} from "../../helpers/local-storage";
import {DeviceBreakpointService} from "../../services/device-breakpoint.service";
import {Breakpoints} from "@angular/cdk/layout";
import {Router} from "@angular/router";
import {AuthGuardService} from "../../services/auth-guard.service";
import {pathConst} from "../../constants/path-const";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isHandset$: Observable<boolean>;
  appUserSubscription = new Subscription();
  appRoute = pathConst;
  userLoggedIn = false;

  constructor(private deviceBreakpoint: DeviceBreakpointService, private accountService: AccountService, private router: Router, private authGuardService: AuthGuardService) {
  }

  ngOnInit(): void {
    this.appUserSubscription = this.accountService.appUser$.subscribe((ut: UserToken | null) => {
      if (ut !== null) {
        this.userLoggedIn = true;
      }
    });
    this.isHandset$ = this.deviceBreakpoint.handsetBreakpoint(Breakpoints.XSmall);
  }

  logout() {
    this.accountService.removeAppUser();
    removeLocalUserToken();
    removeSessionUserToken();
    this.userLoggedIn = false;
    this.authGuardService.isAuthenticated = false;
    this.router.url === "/home" ? window.location.reload() : this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {
    this.appUserSubscription.unsubscribe();
  }
}
