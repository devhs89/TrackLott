import {AccountService} from "./account.service";
import {take} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {appRouteConst} from "../constants/app-route-const";
import {SnackBarService} from "./snack-bar.service";
import {notificationMessage} from "../constants/notification-message";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  isAuthenticated: boolean = false;

  constructor(private router: Router, private accountService: AccountService, private snackBarService: SnackBarService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.accountService.appUser$.pipe(take(1)).subscribe(value => {
      if (value?.token) {
        this.isAuthenticated = true;
      }
    });

    if (!this.isAuthenticated) {
      this.snackBarService.showSnackBar(notificationMessage.loginFirst);
      const ignore = this.router.navigate([appRouteConst.loginRel],
        {queryParams: {returnUrl: state.url}});
    }
    return this.isAuthenticated;
  }
}
