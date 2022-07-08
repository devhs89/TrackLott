import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UserRegister} from "../models/user-register";
import {ReplaySubject} from "rxjs";
import {UserProfile} from "../models/user-profile";
import {UserPassword} from "../models/user-password";
import {map} from "rxjs/operators";
import {endRoute} from "../constants/end-route";
import {setLocalUserToken, setSessionUserToken} from "../helpers/local-storage";
import {UpdateFieldModel} from "../models/update-field.model";
import {UserClaimModel} from "../models/user-claim.model";
import {UserLoginModel} from "../models/user-login.model";

@Injectable({
  providedIn: "root"
})
export class AccountService {
  private appUserBehaviorSubject = new ReplaySubject<UserClaimModel | null>(1);
  appUser$ = this.appUserBehaviorSubject.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  emitAppUser(userClaim: UserClaimModel) {
    this.appUserBehaviorSubject.next(userClaim);
  }

  removeAppUser() {
    this.appUserBehaviorSubject.next(null);
  }

  register(userRegister: UserRegister) {
    return this.httpClient.post<UserClaimModel>(endRoute.accountRegister, userRegister).pipe(map(value => {
      if (value.token) {
        this.emitAppUser(value);
        setSessionUserToken(value);
      }
      return value;
    }));
  }

  login(userCredentials: UserLoginModel) {
    return this.httpClient.post<UserClaimModel>(endRoute.accountLogin, userCredentials)
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

  updateInfo(newInfo: UpdateFieldModel) {
    return this.httpClient.put<string>(endRoute.accountUpdate, newInfo);
  }

  updatePassword(passwords: UserPassword) {
    return this.httpClient.post(endRoute.updatePassword, passwords, {responseType: "text"});
  }
}
