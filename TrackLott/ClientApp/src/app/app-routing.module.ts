import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {AddComponent} from "./components/add/add.component";
import {PlayComponent} from "./components/play/play.component";
import {AuthGuardService} from "./services/auth-guard.service";
import {LicenseComponent} from "./license/license.component";
import {TermsComponent} from "./components/terms/terms.component";
import {pathConst} from "./constants/path-const";

const routes = [
  {path: pathConst.home, component: HomeComponent},
  {path: pathConst.add, component: AddComponent, canActivate: [AuthGuardService]},
  {path: pathConst.play, component: PlayComponent},
  {path: pathConst.license, component: LicenseComponent},
  {path: pathConst.terms, component: TermsComponent},
  {
    path: pathConst.user,
    loadChildren: () => import('./components/user/user.module').then(mod => mod.UserModule)
  },
  {path: pathConst.root, redirectTo: pathConst.home, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
