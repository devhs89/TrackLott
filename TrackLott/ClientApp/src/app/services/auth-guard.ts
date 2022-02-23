import {AccountService} from "./account.service";
import {take} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {parseError} from "../helpers/parse-error";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  isAuthenticated: boolean = false;

  constructor(private router: Router, private accountService: AccountService, private matSnackBar: MatSnackBar) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.accountService.appUser$.pipe(take(1)).subscribe({
      next: value => {
        if (value?.token) {
          this.isAuthenticated = true;
        } else {
          this.matSnackBar.open("Please login first", "Dismiss");
          this.router.navigate(["/user/login"]);
          this.isAuthenticated = false;
        }
      }, error: err => this.matSnackBar.open(parseError(err.error), "Dismiss")
    });

    return this.isAuthenticated;
  }
}
