import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {AddComponent} from "./add/add.component";
import {PlayComponent} from "./play/play.component";
import {TermsComponent} from "./terms/terms.component";

const routes = [
  {path: 'home', component: HomeComponent},
  {path: 'add', component: AddComponent},
  {path: 'play', component: PlayComponent},
  {path: 'terms', component: TermsComponent},
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(mod => mod.AccountModule)
  },
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
