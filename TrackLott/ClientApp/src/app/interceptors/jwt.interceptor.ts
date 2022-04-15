import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserToken} from "../models/user-token";
import {AccountService} from "../services/account.service";
import {take} from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class JwtInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentAppUser: UserToken | null = {userName: '', token: '', admin: false};
    let tokenizedRequest: HttpRequest<unknown> | null = null;

    this.accountService.appUser$.pipe(take(1)).subscribe({
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
