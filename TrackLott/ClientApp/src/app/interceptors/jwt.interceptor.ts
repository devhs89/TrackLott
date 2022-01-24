import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppUser} from "../models/app-user";
import {AccountService} from "../services/account.service";
import {take} from "rxjs/operators";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentAppUser: AppUser | null = null;

    this.accountService.appUser$.pipe(take(1)).subscribe((user) => currentAppUser = user);

    if (currentAppUser !== null) {
      request.headers.set("Authorization", `Bearer ${currentAppUser!.token}`);
    }

    return next.handle(request);
  }
}
