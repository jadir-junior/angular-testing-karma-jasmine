import { Directive, HostBinding, Input, OnInit, Optional } from '@angular/core';

import { AbstractControl, ControlContainer } from '@angular/forms';
import { findFormControl } from '../utils/findFormControl';

@Directive({
  selector: '[appErrorMessage]',
})
export class ErrorMessageDirective implements OnInit {
  @HostBinding('attr.aria-invalid')
  get ariaInvalid(): true | null {
    return this.isActive() ? true : null;
  }

  @HostBinding('attr.aria-errormessage')
  get ariaErrorMessage(): string | null {
    return this.isActive() && this.appErrorMessage
      ? this.appErrorMessage
      : null;
  }

  @Input()
  public appErrorMessage?: string;

  @Input()
  public formControl?: AbstractControl;

  @Input()
  public formControlName?: string;

  private control?: AbstractControl;

  constructor(@Optional() private controlContainer?: ControlContainer) {}

  ngOnInit(): void {
    this.control = findFormControl(
      this.formControl,
      this.formControlName,
      this.controlContainer
    );
  }

  private isActive(): boolean {
    const { control } = this;
    return (
      control !== undefined &&
      control.invalid &&
      (control.touched || control.dirty)
    );
  }
}
