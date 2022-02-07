import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserToken} from "../models/user-token";
import {AccountService} from "../services/account.service";
import {take} from "rxjs/operators";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentAppUser: UserToken | null = {username: '', token: ''};

    this.accountService.appUser$.pipe(take(1)).subscribe((user) => currentAppUser = user);

    if (currentAppUser?.token.length > 0) {
      request.headers.set("Authorization", `Bearer ${currentAppUser?.token}`);
    }

    return next.handle(request);
  }
}
