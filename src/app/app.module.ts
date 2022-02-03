import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ControlErrorsComponent } from './components/control-errors/control-errors.component';
import { CounterComponent } from './components/counter/counter.component';
import { ErrorMessageDirective } from './directives/error-message.directive';
import { FlickrSearchComponent } from './components/flickr-search/flickr-search.component';
import { FullPhotoComponent } from './components/full-photo/full-photo.component';
import { GreetPipe } from './pipes/greet.pipe';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgrxCounterComponent } from './components/ngrx-counter/ngrx-counter.component';
import { PageCounterComponent } from './pages/page-counter/page-counter.component';
import { PageSignupComponent } from './pages/page-signup/page-signup.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { PaginateDirective } from './directives/paginate.directive';
import { PhotoItemComponent } from './components/photo-item/photo-item.component';
import { PhotoListComponent } from './components/photo-list/photo-list.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { ServiceCounterComponent } from './components/service-counter/service-counter.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { ThresholdWarningDirective } from './directives/threshold-warning.directive';
import { TranslatePipe } from './pipes/translate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    ServiceCounterComponent,
    NgrxCounterComponent,
    SignupFormComponent,
    ControlErrorsComponent,
    ErrorMessageDirective,
    FullPhotoComponent,
    FlickrSearchComponent,
    SearchFormComponent,
    PhotoListComponent,
    PhotoItemComponent,
    GreetPipe,
    TranslatePipe,
    ThresholdWarningDirective,
    PaginateDirective,
    PagenotfoundComponent,
    PageCounterComponent,
    PageSignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
