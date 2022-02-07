import {Component, OnInit} from '@angular/core';
import {AccountService} from "./services/account.service";
import {getLocalUserToken, getSessionUserToken} from "./helpers/local-storage";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    if (getLocalUserToken() !== null) {
      this.accountService.appUserReplaySubject.next(JSON.parse(getLocalUserToken()!));
    } else if (getSessionUserToken() !== null) {
      this.accountService.appUserReplaySubject.next(JSON.parse(getSessionUserToken()!));
    } else {
      this.accountService.appUserReplaySubject.next(null);
    }
  }
}
