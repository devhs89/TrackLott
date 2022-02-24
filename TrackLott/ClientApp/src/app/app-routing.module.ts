import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {AddComponent} from "./add/add.component";
import {PlayComponent} from "./play/play.component";
import {TermsComponent} from "./terms/terms.component";
import {AuthGuardService} from "./services/auth-guard.service";

const routes = [
  {path: 'home', component: HomeComponent},
  {path: 'add', component: AddComponent, canActivate: [AuthGuardService]},
  {path: 'play', component: PlayComponent},
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
