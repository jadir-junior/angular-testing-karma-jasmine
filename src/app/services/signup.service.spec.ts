import { HttpClientModule } from '@angular/common/http';
import { SignupService } from './signup.service';
import { TestBed } from '@angular/core/testing';

describe('SignupService', () => {
  let service: SignupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(SignupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
