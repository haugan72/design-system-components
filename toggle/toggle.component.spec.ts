import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToggleComponent } from './toggle.component';

describe('ToggleComponent', () => {
  let component: ToggleComponent;
  let fixture: ComponentFixture<ToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render with default size (md)', () => {
    const toggle = fixture.nativeElement.querySelector('.toggle');
    expect(toggle.classList.contains('toggle-md')).toBe(true);
  });

  it('should render with default label position (right)', () => {
    fixture.componentRef.setInput('label', 'Enable feature');
    fixture.detectChanges();
    const container = fixture.nativeElement.querySelector('.toggle-container');
    expect(container.classList.contains('toggle-label-left')).toBe(false);
  });

  it('should apply different sizes', () => {
    const sizes = ['sm', 'md', 'lg'];

    sizes.forEach(size => {
      fixture.componentRef.setInput('size', size);
      fixture.detectChanges();
      const toggle = fixture.nativeElement.querySelector('.toggle');
      expect(toggle.classList.contains(`toggle-${size}`)).toBe(true);
    });
  });

  it('should render label when provided', () => {
    fixture.componentRef.setInput('label', 'Dark Mode');
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('.toggle-label');
    expect(label).toBeTruthy();
    expect(label.textContent.trim()).toBe('Dark Mode');
  });

  it('should position label on left when labelPosition is left', () => {
    fixture.componentRef.setInput('label', 'Enable');
    fixture.componentRef.setInput('labelPosition', 'left');
    fixture.detectChanges();
    const container = fixture.nativeElement.querySelector('.toggle-container');
    expect(container.classList.contains('toggle-label-left')).toBe(true);
  });

  it('should start unchecked by default', () => {
    expect(component.checked()).toBe(false);
    const toggle = fixture.nativeElement.querySelector('.toggle');
    expect(toggle.classList.contains('toggle-checked')).toBe(false);
  });

  it('should apply checked class when checked', () => {
    component.checked.set(true);
    fixture.detectChanges();
    const toggle = fixture.nativeElement.querySelector('.toggle');
    expect(toggle.classList.contains('toggle-checked')).toBe(true);
  });

  it('should toggle checked state on click', () => {
    const input = fixture.nativeElement.querySelector('.toggle-input');
    expect(component.checked()).toBe(false);

    input.click();
    fixture.detectChanges();

    expect(component.checked()).toBe(true);
  });

  it('should emit changed event when toggled', () => {
    spyOn(component.changed, 'emit');
    const input = fixture.nativeElement.querySelector('.toggle-input');

    input.click();
    fixture.detectChanges();

    expect(component.changed.emit).toHaveBeenCalledWith(true);
  });

  it('should not toggle when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('.toggle-input');
    expect(component.checked()).toBe(false);

    input.click();
    fixture.detectChanges();

    expect(component.checked()).toBe(false);
  });

  it('should not emit changed event when disabled', () => {
    spyOn(component.changed, 'emit');
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const mockEvent = new Event('change');
    component.onToggle(mockEvent);

    expect(component.changed.emit).not.toHaveBeenCalled();
  });

  it('should apply disabled class when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const container = fixture.nativeElement.querySelector('.toggle-container');
    const toggle = fixture.nativeElement.querySelector('.toggle');
    expect(container.classList.contains('toggle-disabled')).toBe(true);
    expect(toggle.classList.contains('toggle-disabled')).toBe(true);
  });

  it('should set input disabled attribute when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('.toggle-input');
    expect(input.disabled).toBe(true);
  });

  it('should handle keyboard Enter key', () => {
    spyOn(component.changed, 'emit');
    const mockEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    spyOn(mockEvent, 'preventDefault');

    component.onKeyDown(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(component.checked()).toBe(true);
    expect(component.changed.emit).toHaveBeenCalledWith(true);
  });

  it('should handle keyboard Space key', () => {
    spyOn(component.changed, 'emit');
    const mockEvent = new KeyboardEvent('keydown', { key: ' ' });
    spyOn(mockEvent, 'preventDefault');

    component.onKeyDown(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(component.checked()).toBe(true);
    expect(component.changed.emit).toHaveBeenCalledWith(true);
  });

  it('should not handle keyboard when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const mockEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    component.onKeyDown(mockEvent);

    expect(component.checked()).toBe(false);
  });

  it('should set aria-label attribute', () => {
    fixture.componentRef.setInput('ariaLabel', 'Enable dark mode');
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('.toggle-input');
    expect(input.getAttribute('aria-label')).toBe('Enable dark mode');
  });

  it('should fallback to label for aria-label when ariaLabel not provided', () => {
    fixture.componentRef.setInput('label', 'Dark Mode');
    fixture.detectChanges();
    const effectiveLabel = component.effectiveAriaLabel();
    expect(effectiveLabel).toBe('Dark Mode');
  });

  it('should use default aria-label when neither label nor ariaLabel provided', () => {
    const effectiveLabel = component.effectiveAriaLabel();
    expect(effectiveLabel).toBe('Toggle switch');
  });

  it('should set aria-checked attribute', () => {
    const input = fixture.nativeElement.querySelector('.toggle-input');
    expect(input.getAttribute('aria-checked')).toBe('false');

    component.checked.set(true);
    fixture.detectChanges();

    expect(input.getAttribute('aria-checked')).toBe('true');
  });

  it('should generate unique id by default', () => {
    const id1 = component.id();
    const fixture2 = TestBed.createComponent(ToggleComponent);
    const component2 = fixture2.componentInstance;
    const id2 = component2.id();

    expect(id1).toBeTruthy();
    expect(id2).toBeTruthy();
    expect(id1).not.toBe(id2);
  });

  it('should accept custom id', () => {
    fixture.componentRef.setInput('id', 'my-custom-toggle');
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('.toggle-input');
    expect(input.id).toBe('my-custom-toggle');
  });

  it('should associate label with input via for/id', () => {
    fixture.componentRef.setInput('id', 'test-toggle');
    fixture.componentRef.setInput('label', 'Test Label');
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('label');
    const input = fixture.nativeElement.querySelector('.toggle-input');
    expect(label.getAttribute('for')).toBe('test-toggle');
    expect(input.id).toBe('test-toggle');
  });

  it('should support two-way binding', () => {
    expect(component.checked()).toBe(false);

    // Simulate parent setting value
    component.checked.set(true);
    fixture.detectChanges();
    expect(component.checked()).toBe(true);

    // Simulate user toggling
    const input = fixture.nativeElement.querySelector('.toggle-input');
    input.click();
    fixture.detectChanges();
    expect(component.checked()).toBe(false);
  });

  it('should compute container classes correctly', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.componentRef.setInput('labelPosition', 'left');
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const classes = component.containerClasses();
    expect(classes).toContain('toggle-container');
    expect(classes).toContain('toggle-size-lg');
    expect(classes).toContain('toggle-label-left');
    expect(classes).toContain('toggle-disabled');
  });

  it('should compute toggle classes correctly', () => {
    fixture.componentRef.setInput('size', 'sm');
    component.checked.set(true);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const classes = component.toggleClasses();
    expect(classes).toContain('toggle');
    expect(classes).toContain('toggle-sm');
    expect(classes).toContain('toggle-checked');
    expect(classes).toContain('toggle-disabled');
  });
});
