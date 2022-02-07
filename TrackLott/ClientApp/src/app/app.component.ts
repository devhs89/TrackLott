import {Component, OnInit} from '@angular/core';
import {AccountService} from "./services/account.service";
import {Subscription} from "rxjs";
import {UserToken} from "./models/user-token";
import {getLocalUserToken, getSessionUserToken} from "./helpers/common-methods";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  userLoginSubscription = new Subscription();
  title = 'TrackLott';

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    if (getLocalUserToken() !== null) {
      this.accountService.appUserReplaySubject.next(JSON.parse(getLocalUserToken()!));
    } else if (getSessionUserToken() !== null) {
      this.accountService.appUserReplaySubject.next(JSON.parse(getSessionUserToken()!));
    }
  }
}
