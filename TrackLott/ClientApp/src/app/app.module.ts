import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

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
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonToggleModule} from "@angular/material/button-toggle";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LatestLottoResultComponent,
    AddComponent,
    PlayComponent,
    TermsComponent,
    MatchComboComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatCheckboxModule,
    MatSelectModule,
    MatButtonToggleModule
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: "en-AU"}, MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule {
}
