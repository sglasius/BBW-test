import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowPostComponent } from './secure/show-post/show-post.component';
import { LandingComponent } from './shared/landing/landing.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full'},
  { path: 'landing', component: LandingComponent},
  { path: 'showPosts', component: ShowPostComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
