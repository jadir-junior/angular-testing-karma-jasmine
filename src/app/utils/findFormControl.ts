import { AbstractControl, ControlContainer } from '@angular/forms';

export const findFormControl = (
  control?: AbstractControl,
  controlName?: string,
  controlContainer?: ControlContainer
): AbstractControl => {
  if (control) {
    return control;
  }

  if (!controlName) {
    throw new Error('getFormControl: control or control name must be giver');
  }

  if (!(controlContainer && controlContainer.control)) {
    throw new Error(
      'getFormControl: control name was given but parent control not found'
    );
  }

  const controlFromName = controlContainer.control.get(controlName);

  if (!controlFromName) {
    throw new Error(`getFormControl: control '${controlName}' not found`);
  }

  return controlFromName;
};
