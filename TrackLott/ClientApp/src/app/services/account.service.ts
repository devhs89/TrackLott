import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "../constants/backend";
import {UserRegister} from "../models/user-register";
import {ReplaySubject} from "rxjs";
import {UserLogin} from "../models/user-login";
import {UserToken} from "../models/user-token";
import {UserInfo} from "../models/user-info";
import {UserPassword} from "../models/user-password";
import {UserUpdateInfo} from "../models/user-update-info";
import {map} from "rxjs/operators";

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
    return this.httpClient.post<UserToken>(`${BASE_URL}/account/register`, userRegister).pipe(map(value => {
      this.emitAppUser(value);
      return value;
    }));
  }

  onLogin(userCredentials: UserLogin) {
    return this.httpClient.post<UserToken>(`${BASE_URL}/account/login`, userCredentials).pipe(map(value => {
      this.emitAppUser(value);
      return value;
    }));
  }

  showUser() {
    return this.httpClient.post<UserInfo>(`${BASE_URL}/account/show`, {});
  }

  onUpdateInfo(newInfo: UserUpdateInfo) {
    return this.httpClient.put<string>(`${BASE_URL}/account/updateInfo`, newInfo);
  }

  onUpdatePassword(passwords: UserPassword) {
    return this.httpClient.post(`${BASE_URL}/account/updatePassword`, passwords, {responseType: "text"});
  }
}
