import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import {
  PasswordStrength,
  SignupService,
} from 'src/app/services/signup.service';
import {
  addressLine1,
  addressLine2,
  city,
  country,
  email,
  name,
  password,
  postcode,
  region,
  signupData,
  username,
} from './signup-data.spec.helper';
import {
  checkField,
  expectText,
  findEl,
  setFieldValue,
} from 'src/app/utils/testing-helper';
import { of, throwError } from 'rxjs';

import { ControlErrorsComponent } from '../control-errors/control-errors.component';
import { ErrorMessageDirective } from 'src/app/directives/error-message.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupFormComponent } from './signup-form.component';

const weakPassword: PasswordStrength = {
  score: 2,
  warning: 'too short',
  suggestions: ['try a longer password'],
};

const strongPassword: PasswordStrength = {
  score: 4,
  warning: '',
  suggestions: [],
};

describe('SignupFormComponent', () => {
  let fixture: ComponentFixture<SignupFormComponent>;
  let signupService: jasmine.SpyObj<SignupService>;

  const setup = async (
    signupServiceReturnValues?: jasmine.SpyObjMethodNames<SignupService>
  ) => {
    signupService = jasmine.createSpyObj<SignupService>('SignupService', {
      isUsernameTaken: of(false),
      isEmailTaken: of(false),
      getPasswordStrength: of(strongPassword),
      signup: of({ success: true }),
      ...signupServiceReturnValues,
    });

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [
        SignupFormComponent,
        ControlErrorsComponent,
        ErrorMessageDirective,
      ],
      providers: [{ provide: SignupService, useValue: signupService }],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupFormComponent);
    fixture.detectChanges();
  };

  const fillForm = () => {
    setFieldValue(fixture, 'username', username);
    setFieldValue(fixture, 'email', email);
    setFieldValue(fixture, 'password', password);
    setFieldValue(fixture, 'name', name);
    setFieldValue(fixture, 'addressLine1', addressLine1);
    setFieldValue(fixture, 'addressLine2', addressLine2);
    setFieldValue(fixture, 'city', city);
    setFieldValue(fixture, 'postcode', postcode);
    setFieldValue(fixture, 'region', region);
    setFieldValue(fixture, 'country', country);
    checkField(fixture, 'tos', true);
  };

  it('submits the form successfully', fakeAsync(async () => {
    await setup();

    fillForm();
    fixture.detectChanges();

    expect(findEl(fixture, 'submit').properties['disabled']).toBe(true);

    // wait for async validators
    tick(1000);
    fixture.detectChanges();

    console.log(findEl(fixture, 'submit').properties['disabled']);
    expect(findEl(fixture, 'submit').properties['disabled']).toBe(false);

    findEl(fixture, 'form').triggerEventHandler('submit', {});
    fixture.detectChanges();

    expectText(fixture, 'status', 'Sign-up successful!');

    expect(signupService.isUsernameTaken).toHaveBeenCalledWith(username);
    expect(signupService.isEmailTaken).toHaveBeenCalledWith(email);
    expect(signupService.getPasswordStrength).toHaveBeenCalledWith(password);
    expect(signupService.signup).toHaveBeenCalledWith(signupData);
  }));

  it('does not submit an invalid form', fakeAsync(async () => {
    await setup();

    // Wait for async validators
    tick(1000);

    findEl(fixture, 'form').triggerEventHandler('submit', {});

    expect(signupService.isUsernameTaken).not.toHaveBeenCalled();
    expect(signupService.isEmailTaken).not.toHaveBeenCalled();
    expect(signupService.getPasswordStrength).not.toHaveBeenCalled();
    expect(signupService.signup).not.toHaveBeenCalled();
  }));

  it('handles signup failure', fakeAsync(async () => {
    await setup({
      signup: throwError(() => new Error('Validation failed')),
    });

    fillForm();

    // Wait for async validators
    tick(1000);

    findEl(fixture, 'form').triggerEventHandler('submit', {});
    fixture.detectChanges();

    expectText(fixture, 'status', 'Sign-up error');

    expect(signupService.isUsernameTaken).toHaveBeenCalledWith(username);
    expect(signupService.getPasswordStrength).toHaveBeenCalledWith(password);
    expect(signupService.signup).toHaveBeenCalledWith(signupData);
  }));
});
