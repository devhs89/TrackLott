import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "../constants/backend";
import {UserRegister} from "../models/user-register";
import {map} from "rxjs/operators";
import {UserProfile} from "../models/user-profile";
import {ReplaySubject} from "rxjs";
import {UserLogin} from "../models/user-login";
import {setLocalUserToken, setSessionUserToken} from "../helpers/common-methods";
import {AppUser} from "../models/app-user";

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

  login(userCredentials: UserLogin) {
    return this.httpClient.post(`${BASE_URL}/account/login`, userCredentials);
  }
}
