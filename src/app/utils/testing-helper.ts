import { By } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

export function findEl<T>(
  fixture: ComponentFixture<T>,
  testId: string
): DebugElement {
  return fixture.debugElement.query(By.css(`[data-testid="${testId}"]`));
}

export function click<T>(fixture: ComponentFixture<T>, testId: string): void {
  const element = findEl(fixture, testId);
  const event = makeClickEvent(element.nativeElement);
  element.triggerEventHandler('click', event);
}

export function makeClickEvent(target: EventTarget): Partial<MouseEvent> {
  return {
    preventDefault(): void {},
    stopPropagation(): void {},
    stopImmediatePropagation(): void {},
    type: 'click',
    target,
    currentTarget: target,
    bubbles: true,
    cancelable: true,
    button: 0,
  };
}

export function expectText<T>(
  fixture: ComponentFixture<T>,
  testId: string,
  text: string
): void {
  const element = findEl(fixture, testId);
  const actualText = element.nativeElement.textContent;
  expect(actualText).toBe(text);
}

export function setFieldValue<T>(
  fixture: ComponentFixture<T>,
  testId: string,
  value: string
) {
  setFieldElementValue(findEl(fixture, testId).nativeElement, value);
}

export function setFieldElementValue(
  element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  value: string
): void {
  element.value = value;
  const isSelect = element instanceof HTMLSelectElement;
  dispatchFakeEvent(
    element,
    isSelect ? 'change' : 'input',
    isSelect ? false : true
  );
}

export function dispatchFakeEvent(
  element: EventTarget,
  type: string,
  bubbles: boolean = false
): void {
  const event = document.createEvent('Event');
  event.initEvent(type, bubbles, false);
  element.dispatchEvent(event);
}

export function queryByCss<T>(
  fixture: ComponentFixture<T>,
  selector: string
): DebugElement {
  const debugElement = fixture.debugElement.query(By.css(selector));
  if (!debugElement) {
    throw new Error(`queryByCss: Element with ${selector} not found`);
  }
  return debugElement;
}

export function findComponent<T>(
  fixture: ComponentFixture<T>,
  selector: string
): DebugElement {
  return queryByCss(fixture, selector);
}

export function checkField<T>(
  fixture: ComponentFixture<T>,
  testId: string,
  checked: boolean
): void {
  const { nativeElement } = findEl(fixture, testId);
  nativeElement.checked = checked;
  dispatchFakeEvent(nativeElement, 'change');
}
