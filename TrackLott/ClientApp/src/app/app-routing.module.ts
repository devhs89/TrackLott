import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {AddComponent} from "./components/add/add.component";
import {PlayComponent} from "./components/play/play.component";
import {AuthGuardService} from "./services/auth-guard.service";
import {TermsComponent} from "./components/terms/terms.component";
import {pathConst} from "./constants/path-const";
import {LicenseComponent} from "./components/license/license.component";

const routes = [
  {path: pathConst.home, component: HomeComponent},
  {path: pathConst.add, component: AddComponent, canActivate: [AuthGuardService]},
  {path: pathConst.play, component: PlayComponent},
  {path: pathConst.license, component: LicenseComponent},
  {path: pathConst.terms, component: TermsComponent},
  {
    path: pathConst.account,
    loadChildren: () => import('./components/account/account.module').then(mod => mod.AccountModule)
  },
  {path: pathConst.root, redirectTo: pathConst.home, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
