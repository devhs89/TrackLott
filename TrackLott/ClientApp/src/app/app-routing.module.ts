import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {AddComponent} from "./components/add/add.component";
import {PlayComponent} from "./components/play/play.component";
import {AuthGuardService} from "./services/auth-guard.service";
import {TermsComponent} from "./components/terms/terms.component";
import {appRoute} from "./constants/app-route";
import {LicenseComponent} from "./components/license/license.component";

const routes = [
  {path: appRoute.home, component: HomeComponent},
  {path: appRoute.add, component: AddComponent, canActivate: [AuthGuardService]},
  {path: appRoute.play, component: PlayComponent},
  {path: appRoute.license, component: LicenseComponent},
  {path: appRoute.terms, component: TermsComponent},
  {
    path: appRoute.account,
    loadChildren: () => import('./components/account/account.module').then(mod => mod.AccountModule)
  },
  {path: appRoute.root, redirectTo: appRoute.home, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
