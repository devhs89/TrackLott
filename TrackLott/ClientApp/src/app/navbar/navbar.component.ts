import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountService} from "../services/account.service";
import {Observable, Subscription} from "rxjs";
import {AppUser} from "../models/app-user";
import {removeLocalUserToken, removeSessionUserToken} from "../helpers/common-methods";
import {DeviceBreakpoint} from "../services/device-breakpoint.service";
import {Breakpoints} from "@angular/cdk/layout";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isHandsetPortrait$: Observable<boolean>;
  appUserSubscription = new Subscription();
  userLoggedIn = false;

  constructor(private deviceBreakpoint: DeviceBreakpoint, private accountService: AccountService, private router: Router) {
  }

  ngOnInit(): void {
    this.appUserSubscription = this.accountService.appUser$.subscribe((ut: AppUser | null) => {
      if (ut !== null) {
        this.userLoggedIn = true;
      }
    });

    this.isHandsetPortrait$ = this.deviceBreakpoint.handsetBreakpoint(Breakpoints.HandsetPortrait);
  }

  logout() {
    this.accountService.appUserReplaySubject.next(null);
    removeLocalUserToken();
    removeSessionUserToken();
    this.userLoggedIn = false;
    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {
    this.appUserSubscription.unsubscribe();
  }
}
