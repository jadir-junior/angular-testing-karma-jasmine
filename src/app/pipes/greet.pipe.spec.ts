import { GreetPipe } from './greet.pipe';

describe('GreetPipe', () => {
  let greetPipe: GreetPipe;

  beforeEach(() => {
    greetPipe = new GreetPipe();
  });

  it('says Hello', () => {
    expect(greetPipe.transform('Julie')).toBe('Hello, Julie!');
  });
});
