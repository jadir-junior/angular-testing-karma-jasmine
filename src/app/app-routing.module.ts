import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { PageCounterComponent } from './pages/page-counter/page-counter.component';
import { PageSignupComponent } from './pages/page-signup/page-signup.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';

const routes: Routes = [
  {
    path: 'counter',
    component: PageCounterComponent,
  },
  {
    path: 'signup',
    component: PageSignupComponent,
  },
  {
    path: '**',
    component: PagenotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
