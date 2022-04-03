import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {AddComponent} from "./add/add.component";
import {PlayComponent} from "./play/play.component";
import {AuthGuardService} from "./services/auth-guard.service";
import {LicenseComponent} from "./license/license.component";
import {TermsComponent} from "./terms/terms.component";

const routes = [
  {path: 'home', component: HomeComponent},
  {path: 'add', component: AddComponent, canActivate: [AuthGuardService]},
  {path: 'play', component: PlayComponent},
  {path: 'license', component: LicenseComponent},
  {path: 'terms', component: TermsComponent},
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(mod => mod.UserModule)
  },
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
