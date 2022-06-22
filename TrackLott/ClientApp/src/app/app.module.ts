import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialUiModule} from "./modules/material-ui.module";
import {JwtInterceptor} from "./interceptors/jwt.interceptor";
import {LoadingInterceptor} from "./interceptors/loading.interceptor";
import {AddComponent} from "./components/add/add.component";
import {PlayComponent} from "./components/play/play.component";
import {HomeComponent} from "./components/home/home.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {LatestLottoResultComponent} from "./components/home/latest-lotto-result/latest-lotto-result.component";
import {MatchComboComponent} from "./components/home/match-combo/match-combo.component";
import {NumberSvgComponent} from "./components/common/number-svg/number-svg.component";
import {LicenseComponent} from "./license/license.component";
import {TermsComponent} from "./components/terms/terms.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LatestLottoResultComponent,
    AddComponent,
    PlayComponent,
    TermsComponent,
    MatchComboComponent,
    NumberSvgComponent,
    LicenseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialUiModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
