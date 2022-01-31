import {
  AbstractControl,
  ControlContainer,
  ValidationErrors,
} from '@angular/forms';
import {
  Component,
  ContentChild,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  TemplateRef,
} from '@angular/core';

import { pipe, startWith, Subscription } from 'rxjs';
import { findFormControl } from 'src/app/utils/findFormControl';

interface TemplateContext {
  $implicit: ValidationErrors;
}

@Component({
  selector: 'app-control-errors',
  templateUrl: './control-errors.component.html',
  styleUrls: ['./control-errors.component.scss'],
})
export class ControlErrorsComponent implements OnInit, OnDestroy {
  @Input()
  public control?: AbstractControl;

  @Input()
  public controlName?: string;

  public internatControl?: AbstractControl;

  @ContentChild(TemplateRef)
  public template: TemplateRef<TemplateContext> | null = null;

  public templateContext: TemplateContext = {
    $implicit: {},
  };

  private subscription?: Subscription;

  constructor(@Optional() private controlContainer?: ControlContainer) {}

  ngOnInit(): void {
    const control = findFormControl(
      this.control,
      this.controlName,
      this.controlContainer
    );
    this.internatControl = control;

    this.subscription = control.statusChanges
      .pipe(startWith('PENDING'))
      .subscribe((status) => this.updateTemplateContext());
  }

  private updateTemplateContext(): void {
    if (this.internatControl && this.internatControl.errors) {
      this.templateContext = {
        $implicit: this.internatControl.errors,
      };
    }
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
