import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "../constants/backend";
import {UserRegister} from "../models/user-register";
import {ReplaySubject} from "rxjs";
import {UserLogin} from "../models/user-login";
import {AppUser} from "../models/app-user";
import {UserNewInfo} from "../models/user-new-info";
import {UserPassword} from "../models/user-password";

@Injectable({
  providedIn: "root"
})
export class AccountService {
  appUserReplaySubject = new ReplaySubject<AppUser | null>(1);
  appUser$ = this.appUserReplaySubject.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  onRegister(userRegister: UserRegister) {
    return this.httpClient.post(`${BASE_URL}/account/register`, userRegister);
  }

  onLogin(userCredentials: UserLogin) {
    return this.httpClient.post(`${BASE_URL}/account/login`, userCredentials);
  }

  onUpdateInfo(newInfo: UserNewInfo) {
    return this.httpClient.post(`${BASE_URL}/account/updateInfo`, newInfo);
  }

  onUpdatePassword(passwords: UserPassword) {
    return this.httpClient.post(`${BASE_URL}/account/updatePassword`, passwords);
  }
}
