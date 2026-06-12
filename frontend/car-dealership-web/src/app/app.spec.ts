import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the Andara hero', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Andara');
    expect(compiled.querySelector('.hero__copy')?.textContent).toContain(
      'Go beyond the expected',
    );
    expect(compiled.querySelector('video source')?.getAttribute('src')).toBe(
      '/asset/main.mp4',
    );
    expect(
      [...compiled.querySelectorAll('.hero__actions button')].map((button) =>
        button.textContent?.trim(),
      ),
    ).toEqual(['Reserve Now', 'Explore']);
    expect(compiled.querySelector('.concept-note')?.textContent).toContain(
      'fictional luxury EV',
    );
  });

  it('should keep the concept note visible until it is acknowledged', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    compiled.querySelector<HTMLElement>('.concept-note')?.click();
    fixture.detectChanges();

    expect(compiled.querySelector('.concept-note')).toBeTruthy();

    compiled.querySelector<HTMLButtonElement>('.concept-note__button')?.click();
    fixture.detectChanges();

    expect(compiled.querySelector('.concept-note')).toBeNull();
  });
});
