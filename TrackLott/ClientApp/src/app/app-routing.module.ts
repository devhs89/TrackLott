import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {AddComponent} from "./components/add/add.component";
import {PlayComponent} from "./components/play/play.component";
import {AuthGuardService} from "./services/auth-guard.service";
import {TermsComponent} from "./components/terms/terms.component";
import {appRouteConst} from "./constants/app-route-const";
import {LicenseComponent} from "./components/license/license.component";

const routes = [
  {path: appRouteConst.home, component: HomeComponent},
  {path: appRouteConst.add, component: AddComponent, canActivate: [AuthGuardService]},
  {path: appRouteConst.play, component: PlayComponent},
  {path: appRouteConst.license, component: LicenseComponent},
  {path: appRouteConst.terms, component: TermsComponent},
  {
    path: appRouteConst.account,
    loadChildren: () => import('./components/account/account.module').then(mod => mod.AccountModule)
  },
  {path: appRouteConst.root, redirectTo: appRouteConst.home, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
