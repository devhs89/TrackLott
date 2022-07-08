import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AccountService} from "../services/account.service";
import {take} from "rxjs/operators";
import {UserClaimModel} from "../models/user-claim.model";

@Injectable({
  providedIn: "root"
})
export class JwtAuthInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentAppUser: UserClaimModel | null = {token: ''};
    let tokenizedRequest: HttpRequest<unknown> | null = null;

    this.accountService.userClaim$.pipe(take(1)).subscribe({
      next: (user) => currentAppUser = user,
      error: () => {
      }
    });

    if (currentAppUser !== null) {
      tokenizedRequest = request.clone({
        setHeaders: {
          "Authorization": `Bearer ${currentAppUser?.token}`
        }
      });
    }

    return next.handle(tokenizedRequest !== null ? tokenizedRequest : request);
  }
}
