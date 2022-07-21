import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ReplaySubject} from "rxjs";
import {map} from "rxjs/operators";
import {endRoute} from "../constants/end-route";
import {setLocalUserToken, setSessionUserToken} from "../helpers/local-storage";
import {UpdateFieldModel} from "../models/update-field.model";
import {WebTokenModel} from "../models/web-token.model";
import {UserLoginModel} from "../models/user-login.model";
import {UserPasswordModel} from "../models/user-password.model";
import {UserProfileModel} from "../models/user-profile.model";
import {UserRegisterModel} from "../models/user-register.model";

@Injectable({
  providedIn: "root"
})
export class AccountService {
  private userClaimBehaviorSubject = new ReplaySubject<WebTokenModel | null>(1);
  userClaim$ = this.userClaimBehaviorSubject.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  emitAppUser(userClaim: WebTokenModel) {
    this.userClaimBehaviorSubject.next(userClaim);
  }

  removeAppUser() {
    this.userClaimBehaviorSubject.next(null);
  }

  register(userRegister: UserRegisterModel) {
    return this.httpClient.post<WebTokenModel>(endRoute.accountRegister, userRegister).pipe(map(value => {
      if (value.jwtToken) {
        this.emitAppUser(value);
        setSessionUserToken(value);
      }
      return value;
    }));
  }

  login(userCredentials: UserLoginModel) {
    return this.httpClient.post<WebTokenModel>(endRoute.accountLogin, userCredentials)
      .pipe(map(value => {
        if (value.jwtToken) {
          this.emitAppUser(value);
          userCredentials.rememberMe ? setLocalUserToken(value) : setSessionUserToken(value);
        }
        return value;
      }));
  }

  showUser() {
    return this.httpClient.post<UserProfileModel>(endRoute.accountShow, {});
  }

  updateInfo(newInfo: UpdateFieldModel) {
    return this.httpClient.put<string>(endRoute.accountUpdate, newInfo);
  }

  updatePassword(passwords: UserPasswordModel) {
    return this.httpClient.post(endRoute.updatePassword, passwords, {responseType: "text"});
  }
}
