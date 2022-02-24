import {Component, OnInit} from '@angular/core';
import {AccountService} from "./services/account.service";
import {getLocalUserToken, getSessionUserToken} from "./helpers/local-storage";
import {LoadingService} from "./services/loading.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(private loadingService: LoadingService, private accountService: AccountService) {
  }

  ngOnInit() {
    this.isLoading$ = this.loadingService.isLoading$;

    if (getLocalUserToken() !== null) {
      this.accountService.appUserReplaySubject.next(JSON.parse(getLocalUserToken()!));
    } else if (getSessionUserToken() !== null) {
      this.accountService.appUserReplaySubject.next(JSON.parse(getSessionUserToken()!));
    } else {
      this.accountService.appUserReplaySubject.next(null);
    }
  }
}
