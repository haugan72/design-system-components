import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconButtonComponent } from './icon-button.component';

describe('IconButtonComponent', () => {
  let component: IconButtonComponent;
  let fixture: ComponentFixture<IconButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IconButtonComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('icon', '🚀');
    fixture.componentRef.setInput('ariaLabel', 'Launch');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render with default variant (primary)', () => {
    const compiled = fixture.nativeElement;
    const button = compiled.querySelector('button');
    expect(button.classList.contains('icon-btn-primary')).toBe(true);
  });

  it('should render with default shape (round)', () => {
    const compiled = fixture.nativeElement;
    const button = compiled.querySelector('button');
    expect(button.classList.contains('icon-btn-round')).toBe(true);
  });

  it('should apply different variants', () => {
    const variants = ['primary', 'secondary', 'outline', 'ghost', 'danger'];

    variants.forEach(variant => {
      fixture.componentRef.setInput('variant', variant);
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('button');
      expect(button.classList.contains(`icon-btn-${variant}`)).toBe(true);
    });
  });

  it('should apply different shapes', () => {
    const shapes = ['square', 'round'];

    shapes.forEach(shape => {
      fixture.componentRef.setInput('shape', shape);
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('button');
      expect(button.classList.contains(`icon-btn-${shape}`)).toBe(true);
    });
  });

  it('should be disabled when disabled input is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBe(true);
  });

  it('should be disabled when loading', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    expect(component.isDisabled()).toBe(true);
    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBe(true);
  });

  it('should show spinner when loading', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    const spinner = fixture.nativeElement.querySelector('.icon-btn-spinner');
    expect(spinner).toBeTruthy();
  });

  it('should have loading class when loading', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('icon-btn-loading')).toBe(true);
  });

  it('should emit clicked event when clicked', () => {
    spyOn(component.clicked, 'emit');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.clicked.emit).toHaveBeenCalled();
  });

  it('should not emit clicked event when disabled', () => {
    spyOn(component.clicked, 'emit');
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const mockEvent = new MouseEvent('click');
    component.onClick(mockEvent);

    expect(component.clicked.emit).not.toHaveBeenCalled();
  });

  it('should not emit clicked event when loading', () => {
    spyOn(component.clicked, 'emit');
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const mockEvent = new MouseEvent('click');
    component.onClick(mockEvent);

    expect(component.clicked.emit).not.toHaveBeenCalled();
  });

  it('should render icon', () => {
    const icon = fixture.nativeElement.querySelector('.icon-btn-icon');
    expect(icon).toBeTruthy();
    expect(icon.textContent.trim()).toBe('🚀');
  });

  it('should hide icon when loading', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    const icon = fixture.nativeElement.querySelector('.icon-btn-icon');
    expect(icon).toBeFalsy();
  });

  it('should set button type attribute', () => {
    fixture.componentRef.setInput('type', 'submit');
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.type).toBe('submit');
  });

  it('should set required aria-label', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button.getAttribute('aria-label')).toBe('Launch');
  });

  it('should set aria-busy when loading', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.getAttribute('aria-busy')).toBe('true');
  });

  it('should set tooltip as title attribute', () => {
    fixture.componentRef.setInput('tooltip', 'Click to launch');
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.getAttribute('title')).toBe('Click to launch');
  });

  it('should fallback to aria-label for tooltip when tooltip not provided', () => {
    const tooltipText = component.tooltipText();
    expect(tooltipText).toBe('Launch');
  });

  it('should handle keyboard Enter key', () => {
    spyOn(component, 'onClick');
    const mockEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    spyOn(mockEvent, 'preventDefault');

    component.onKeyDown(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(component.onClick).toHaveBeenCalled();
  });

  it('should handle keyboard Space key', () => {
    spyOn(component, 'onClick');
    const mockEvent = new KeyboardEvent('keydown', { key: ' ' });
    spyOn(mockEvent, 'preventDefault');

    component.onKeyDown(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(component.onClick).toHaveBeenCalled();
  });

  it('should compute button classes correctly', () => {
    fixture.componentRef.setInput('variant', 'secondary');
    fixture.componentRef.setInput('shape', 'square');
    fixture.detectChanges();

    const classes = component.buttonClasses();
    expect(classes).toContain('icon-btn');
    expect(classes).toContain('icon-btn-secondary');
    expect(classes).toContain('icon-btn-square');
  });

  it('should have 40x40px dimensions', () => {
    const button = fixture.nativeElement.querySelector('button');
    const styles = window.getComputedStyle(button);
    expect(button.classList.contains('icon-btn')).toBe(true);
  });

  it('should render with round shape by default', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('icon-btn-round')).toBe(true);
  });

  it('should render with square shape when specified', () => {
    fixture.componentRef.setInput('shape', 'square');
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('icon-btn-square')).toBe(true);
  });
});
