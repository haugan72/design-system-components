import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render with default variant (primary)', () => {
    const compiled = fixture.nativeElement;
    const button = compiled.querySelector('button');
    expect(button.classList.contains('btn-primary')).toBe(true);
  });

  it('should render with default size (md)', () => {
    const compiled = fixture.nativeElement;
    const button = compiled.querySelector('button');
    expect(button.classList.contains('btn-md')).toBe(true);
  });

  it('should apply different variants', () => {
    const variants = ['primary', 'secondary', 'outline', 'ghost', 'danger'];

    variants.forEach(variant => {
      fixture.componentRef.setInput('variant', variant);
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('button');
      expect(button.classList.contains(`btn-${variant}`)).toBe(true);
    });
  });

  it('should apply different sizes', () => {
    const sizes = ['sm', 'md', 'lg'];

    sizes.forEach(size => {
      fixture.componentRef.setInput('size', size);
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('button');
      expect(button.classList.contains(`btn-${size}`)).toBe(true);
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
    const spinner = fixture.nativeElement.querySelector('.btn-spinner');
    expect(spinner).toBeTruthy();
  });

  it('should have loading class when loading', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('btn-loading')).toBe(true);
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

  it('should render icon on the left by default', () => {
    fixture.componentRef.setInput('icon', '🚀');
    fixture.detectChanges();
    const icon = fixture.nativeElement.querySelector('.btn-icon-left');
    expect(icon).toBeTruthy();
    expect(icon.textContent.trim()).toBe('🚀');
  });

  it('should render icon on the right when iconPosition is right', () => {
    fixture.componentRef.setInput('icon', '→');
    fixture.componentRef.setInput('iconPosition', 'right');
    fixture.detectChanges();
    const icon = fixture.nativeElement.querySelector('.btn-icon-right');
    expect(icon).toBeTruthy();
    expect(icon.textContent.trim()).toBe('→');
  });

  it('should hide icon when loading', () => {
    fixture.componentRef.setInput('icon', '🚀');
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    const icon = fixture.nativeElement.querySelector('.btn-icon');
    expect(icon).toBeFalsy();
  });

  it('should apply full-width class', () => {
    fixture.componentRef.setInput('fullWidth', true);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('btn-full-width')).toBe(true);
  });

  it('should set button type attribute', () => {
    fixture.componentRef.setInput('type', 'submit');
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.type).toBe('submit');
  });

  it('should set aria-label when provided', () => {
    fixture.componentRef.setInput('ariaLabel', 'Save document');
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.getAttribute('aria-label')).toBe('Save document');
  });

  it('should set aria-busy when loading', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.getAttribute('aria-busy')).toBe('true');
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

  it('should render content from ng-content', () => {
    const button = fixture.nativeElement.querySelector('button');
    const content = button.querySelector('.btn-content');
    expect(content).toBeTruthy();
  });

  it('should compute button classes correctly', () => {
    fixture.componentRef.setInput('variant', 'secondary');
    fixture.componentRef.setInput('size', 'lg');
    fixture.componentRef.setInput('fullWidth', true);
    fixture.detectChanges();

    const classes = component.buttonClasses();
    expect(classes).toContain('btn');
    expect(classes).toContain('btn-secondary');
    expect(classes).toContain('btn-lg');
    expect(classes).toContain('btn-full-width');
  });

  it('should check if icon is on left', () => {
    fixture.componentRef.setInput('icon', '🚀');
    fixture.componentRef.setInput('iconPosition', 'left');
    fixture.detectChanges();
    expect(component.iconOnLeft()).toBe(true);
    expect(component.iconOnRight()).toBe(false);
  });

  it('should check if icon is on right', () => {
    fixture.componentRef.setInput('icon', '🚀');
    fixture.componentRef.setInput('iconPosition', 'right');
    fixture.detectChanges();
    expect(component.iconOnRight()).toBe(true);
    expect(component.iconOnLeft()).toBe(false);
  });

  it('should check if button has icon', () => {
    expect(component.hasIcon()).toBe(false);
    fixture.componentRef.setInput('icon', '🚀');
    fixture.detectChanges();
    expect(component.hasIcon()).toBe(true);
  });
});
