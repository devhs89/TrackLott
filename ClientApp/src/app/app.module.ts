import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {BrowserModule} from "@angular/platform-browser";
import {AddComponent} from "./add/add.component";
import {AppRoutingModule} from "./app-routing.module";
import {PlayComponent} from './play/play.component';
import {LatestLottoResultComponent} from "./home/latest-lotto-result/latest-lotto-result.component";
import {TermsComponent} from './terms/terms.component';
import {NavbarComponent} from "./navbar/navbar.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatchComboComponent} from './home/match-combo/match-combo.component';
import {MaterialModule} from "./material/material.module";
import {JwtInterceptor} from "./interceptors/jwt.interceptor";
import {LoadingInterceptor} from "./interceptors/loading.interceptor";
import {NumberSvgComponent} from './common/number-svg/number-svg.component';
import { LicenseComponent } from './license/license.component';

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
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
