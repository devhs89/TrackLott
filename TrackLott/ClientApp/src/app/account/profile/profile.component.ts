import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {COUNTRIES} from "../../constants/countries";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  formInvalid = false;
  countries: string[] = COUNTRIES;
  showPasswordFields: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  onSubmit(ngFormObj: NgForm) {

  }
}
