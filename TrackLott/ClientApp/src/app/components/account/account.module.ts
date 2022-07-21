import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ForgotComponent} from './forgot/forgot.component';
import {CommonModule} from "@angular/common";
import {MaterialUiModule} from "../../modules/material-ui.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthGuardService} from "../../services/auth-guard.service";
import {ProfileComponent} from "./profile/profile.component";
import {appRoute} from "../../constants/app-route";

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: appRoute.login, component: LoginComponent},
      {path: appRoute.register, component: RegisterComponent},
      {path: appRoute.profile, component: ProfileComponent, canActivate: [AuthGuardService]},
      {path: appRoute.forgot, component: ForgotComponent},
      {path: '', redirectTo: appRoute.login, pathMatch: 'full'}
    ]),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialUiModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ForgotComponent
  ]
})
export class AccountModule {
}
