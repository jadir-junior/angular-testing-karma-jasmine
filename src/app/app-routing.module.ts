import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { PageCounterComponent } from './pages/page-counter/page-counter.component';
import { PageFlickrComponent } from './pages/page-flickr/page-flickr.component';
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
    path: 'flickr',
    component: PageFlickrComponent,
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
