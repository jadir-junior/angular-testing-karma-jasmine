import { Component, EventEmitter } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { Observable, delay, of } from 'rxjs';
import { TranslateService, Translations } from '../services/translate.service';

import { TranslatePipe } from './translate.pipe';
import { expectContent } from '../utils/testing-helper';

const key1 = 'key1';
const key2 = 'key2';

@Component({
  template: '{{key | translate}}',
})
class HostComponent {
  public key = key1;
}

describe('TranslatePipe: with TestBed and HostComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let translateService: Pick<TranslateService, 'onTranslationChange' | 'get'>;

  beforeEach(async () => {
    translateService = {
      onTranslationChange: new EventEmitter<Translations>(),
      get(key: string): Observable<string> {
        return of(`Translation for ${key}`);
      },
    };

    await TestBed.configureTestingModule({
      declarations: [TranslatePipe, HostComponent],
      providers: [{ provide: TranslateService, useValue: translateService }],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    fixture = TestBed.createComponent(HostComponent);
  });

  it('translates the key, sync service response', () => {
    fixture.detectChanges();
    expectContent(fixture, 'Translation for key1');
  });

  it('translates the key, async service response', fakeAsync(() => {
    translateService.get = (key) =>
      of(`Async translation for ${key}`).pipe(delay(100));

    fixture.detectChanges();

    expectContent(fixture, '');

    tick(100);
    fixture.detectChanges();
    expectContent(fixture, 'Async translation for key1');
  }));

  it('translates a changed key', () => {
    fixture.detectChanges();
    fixture.componentInstance.key = key2;
    fixture.detectChanges();
    expectContent(fixture, 'Translation for key2');
  });

  it('updates on translation change', () => {
    fixture.detectChanges();
    translateService.get = (key) => of(`New translation for ${key}`);
    translateService.onTranslationChange.emit({});
    fixture.detectChanges();
    expectContent(fixture, 'New translation for key1');
  });
});
