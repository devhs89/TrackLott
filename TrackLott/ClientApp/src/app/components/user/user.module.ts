import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ForgotComponent} from './forgot/forgot.component';
import {CommonModule} from "@angular/common";
import {MaterialUiModule} from "../../modules/material-ui.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AccountComponent} from "./account/account.component";
import {AuthGuardService} from "../../services/auth-guard.service";
import {AddRecordsComponent} from './add-records/add-records.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'account', component: AccountComponent, canActivate: [AuthGuardService]},
      {path: 'forgot', component: ForgotComponent},
      {path: 'add-records', component: AddRecordsComponent, canActivate: [AuthGuardService]},
      {path: '', redirectTo: 'login', pathMatch: 'full'}
    ]),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialUiModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    ForgotComponent,
    AddRecordsComponent
  ]
})
export class UserModule {
}
