import {Component, OnInit} from '@angular/core';
import {AccountService} from "./services/account.service";
import {getLocalUserToken, getSessionUserToken} from "./helpers/local-storage";
import {ProgressIndicatorService} from "./services/progress-indicator.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    const userToken = getLocalUserToken() || getSessionUserToken();

    if (userToken !== null) {
      this.accountService.emitAppUser(JSON.parse(userToken));
    }
  }
}
