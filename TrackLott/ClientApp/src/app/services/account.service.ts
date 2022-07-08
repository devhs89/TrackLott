import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UserRegister} from "../models/user-register";
import {ReplaySubject} from "rxjs";
import {UserLogin} from "../models/user-login";
import {UserClaim} from "../models/user-claim";
import {UserProfile} from "../models/user-profile";
import {UserPassword} from "../models/user-password";
import {UpdateField} from "../models/update-field";
import {map} from "rxjs/operators";
import {endRoute} from "../constants/end-route";
import {setLocalUserToken, setSessionUserToken} from "../helpers/local-storage";

@Injectable({
  providedIn: "root"
})
export class AccountService {
  private appUserBehaviorSubject = new ReplaySubject<UserClaim | null>(1);
  appUser$ = this.appUserBehaviorSubject.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  emitAppUser(userClaim: UserClaim) {
    this.appUserBehaviorSubject.next(userClaim);
  }

  removeAppUser() {
    this.appUserBehaviorSubject.next(null);
  }

  register(userRegister: UserRegister) {
    return this.httpClient.post<UserClaim>(endRoute.accountRegister, userRegister).pipe(map(value => {
      if (value.token) {
        this.emitAppUser(value);
        setSessionUserToken(value);
      }
      return value;
    }));
  }

  login(userCredentials: UserLogin) {
    return this.httpClient.post<UserClaim>(endRoute.accountLogin, userCredentials)
      .pipe(map(value => {
      if (value.token) {
        this.emitAppUser(value);
        userCredentials.rememberMe ? setLocalUserToken(value) : setSessionUserToken(value);
      }
      return value;
    }));
  }

  showUser() {
    return this.httpClient.post<UserProfile>(endRoute.accountShow, {});
  }

  updateInfo(newInfo: UpdateField) {
    return this.httpClient.put<string>(endRoute.accountUpdate, newInfo);
  }

  updatePassword(passwords: UserPassword) {
    return this.httpClient.post(endRoute.updatePassword, passwords, {responseType: "text"});
  }
}
