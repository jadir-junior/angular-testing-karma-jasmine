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
  requiredFields,
  signupData,
  username,
} from './signup-data.spec.helper';
import {
  checkField,
  click,
  expectText,
  findEl,
  markFieldAsTouched,
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
      // Successful response per default
      isUsernameTaken: of(false),
      isEmailTaken: of(false),
      getPasswordStrength: of(strongPassword),
      signup: of({ success: true }),
      // Overwrite with given return values
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

  it('marks fields as required', async () => {
    await setup();

    // Mark required fields as touched
    requiredFields.forEach((testId) => {
      markFieldAsTouched(findEl(fixture, testId));
    });
    fixture.detectChanges();

    requiredFields.forEach((testId) => {
      const el = findEl(fixture, testId);
      // Check aria-errormessage attribute
      const errormessageId = el.attributes['aria-errormessage'];

      if (!errormessageId) {
        throw new Error(`Error message id for ${testId} not present`);
      }

      // Check element with error message
      const errormessageEl = document.getElementById(errormessageId);
      if (!errormessageEl) {
        throw new Error(`Error message element for ${testId} not found`);
      }

      // Check aria-required attribute
      expect(el.attributes['aria-required']).toBe(
        'true',
        `${testId} must be marked as aria-required`
      );
      if (errormessageId === 'tos-errors') {
        expect(errormessageEl.textContent).toContain(
          'Please accept the Terms and Services'
        );
      } else {
        expect(errormessageEl.textContent).toContain('must be given');
      }
    });
  });

  it('fails if the username is taken', fakeAsync(async () => {
    await setup({
      isUsernameTaken: of(true),
    });

    fillForm();

    // wait for async validators
    tick(1000);
    fixture.detectChanges();

    expect(findEl(fixture, 'submit').properties['disabled']).toBe(true);

    findEl(fixture, 'form').triggerEventHandler('submit', {});

    expect(signupService.isUsernameTaken).toHaveBeenCalledWith(username);
    expect(signupService.isEmailTaken).toHaveBeenCalledWith(email);
    expect(signupService.getPasswordStrength).toHaveBeenCalledWith(password);
    expect(signupService.signup).not.toHaveBeenCalled();
  }));

  it('fails if the email is taken', fakeAsync(async () => {
    await setup({
      isEmailTaken: of(true),
    });

    fillForm();

    // wait for async validators
    tick(1000);
    fixture.detectChanges();

    expect(findEl(fixture, 'submit').properties['disabled']).toBe(true);

    findEl(fixture, 'form').triggerEventHandler('submit', {});

    expect(signupService.isUsernameTaken).toHaveBeenCalledWith(username);
    expect(signupService.isEmailTaken).toHaveBeenCalledWith(email);
    expect(signupService.getPasswordStrength).toHaveBeenCalledWith(password);
    expect(signupService.signup).not.toHaveBeenCalled();
  }));

  it('fails if the password is too weak', fakeAsync(async () => {
    await setup({
      getPasswordStrength: of(weakPassword),
    });

    fillForm();

    // wait for async validators
    tick(1000);
    fixture.detectChanges();

    expect(findEl(fixture, 'submit').properties['disabled']).toBe(true);

    findEl(fixture, 'form').triggerEventHandler('submit', {});

    expect(signupService.isUsernameTaken).toHaveBeenCalledWith(username);
    expect(signupService.isEmailTaken).toHaveBeenCalledWith(email);
    expect(signupService.getPasswordStrength).toHaveBeenCalledWith(password);
    expect(signupService.signup).not.toHaveBeenCalled();
  }));

  it('requires address line 1 for business and non-profit plans', async () => {
    await setup();

    // Initial state (personal plan)
    const addressLine1El = findEl(fixture, 'addressLine1');
    expect('ng-invalid' in addressLine1El.classes).toBe(false);
    expect('aria-required' in addressLine1El.attributes).toBe(false);

    // Change the to business
    checkField(fixture, 'plan-business', true);
    fixture.detectChanges();

    expect(addressLine1El.attributes['aria-required']).toBe('true');
    expect(addressLine1El.classes['ng-invalid']).toBe(true);

    // Change plan to non-profit
    checkField(fixture, 'plan-non-profit', true);
    fixture.detectChanges();

    expect(addressLine1El.attributes['aria-required']).toBe('true');
    expect(addressLine1El.classes['ng-invalid']).toBe(true);
  });

  it('toogles the password display', async () => {
    await setup();

    setFieldValue(fixture, 'password', 'top secret');

    const passwordEl = findEl(fixture, 'password');
    expect(passwordEl.attributes['type']).toBe('password');

    click(fixture, 'show-password');
    fixture.detectChanges();

    expect(passwordEl.attributes['type']).toBe('text');

    click(fixture, 'show-password');
    fixture.detectChanges();

    expect(passwordEl.attributes['type']).toBe('password');
  });
});
