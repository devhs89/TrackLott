import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../../services/account.service";

@Component({
  selector: 'app-account',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.accountService.showUser().subscribe({
      next: value => console.log(value)
    });
  }
}
