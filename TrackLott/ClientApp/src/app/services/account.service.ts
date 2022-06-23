import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UserRegister} from "../models/user-register";
import {ReplaySubject} from "rxjs";
import {UserLogin} from "../models/user-login";
import {UserToken} from "../models/user-token";
import {UserInfo} from "../models/user-info";
import {UserPassword} from "../models/user-password";
import {UserUpdateInfo} from "../models/user-update-info";
import {map} from "rxjs/operators";
import {endRoute} from "../constants/end-route";
import {setLocalUserToken, setSessionUserToken} from "../helpers/local-storage";

@Injectable({
  providedIn: "root"
})
export class AccountService {
  private appUserBehaviorSubject = new ReplaySubject<UserToken | null>(1);
  appUser$ = this.appUserBehaviorSubject.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  emitAppUser(userToken: UserToken) {
    this.appUserBehaviorSubject.next(userToken);
  }

  removeAppUser() {
    this.appUserBehaviorSubject.next(null);
  }

  onRegister(userRegister: UserRegister) {
    return this.httpClient.post<UserToken>(endRoute.accountRegister, userRegister).pipe(map(value => {
      if (value.email && value.token) {
        this.emitAppUser(value);
        setSessionUserToken(value);
      }
      return value;
    }));
  }

  onLogin(userCredentials: UserLogin) {
    return this.httpClient.post<UserToken>(endRoute.accountLogin, userCredentials).pipe(map(value => {
      if (value.email && value.token) {
        this.emitAppUser(value);
        userCredentials.rememberMe ? setLocalUserToken(value) : setSessionUserToken(value);
      }
      return value;
    }));
  }

  showUser() {
    return this.httpClient.post<UserInfo>(endRoute.accountShow, {});
  }

  onUpdateInfo(newInfo: UserUpdateInfo) {
    return this.httpClient.put<string>(endRoute.accountUpdate, newInfo);
  }

  onUpdatePassword(passwords: UserPassword) {
    return this.httpClient.post(endRoute.updatePassword, passwords, {responseType: "text"});
  }
}
