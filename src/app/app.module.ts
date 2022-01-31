import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ControlErrorsComponent } from './components/control-errors/control-errors.component';
import { CounterComponent } from './components/counter/counter.component';
import { ErrorMessageDirective } from './directives/error-message.directive';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgrxCounterComponent } from './components/ngrx-counter/ngrx-counter.component';
import { ServiceCounterComponent } from './components/service-counter/service-counter.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    ServiceCounterComponent,
    NgrxCounterComponent,
    SignupFormComponent,
    ControlErrorsComponent,
    ErrorMessageDirective,
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
