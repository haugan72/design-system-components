import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start unchecked by default', () => {
    expect(component.checked()).toBe(false);
  });

  it('should toggle checked state on click', () => {
    const input = fixture.nativeElement.querySelector('.checkbox-input');
    expect(component.checked()).toBe(false);

    input.click();
    fixture.detectChanges();

    expect(component.checked()).toBe(true);
  });

  it('should emit changed event when toggled', () => {
    spyOn(component.changed, 'emit');
    const input = fixture.nativeElement.querySelector('.checkbox-input');

    input.click();
    fixture.detectChanges();

    expect(component.changed.emit).toHaveBeenCalledWith(true);
  });

  it('should render label when provided', () => {
    fixture.componentRef.setInput('label', 'Accept terms');
    fixture.detectChanges();

    const label = fixture.nativeElement.querySelector('.checkbox-text');
    expect(label).toBeTruthy();
    expect(label.textContent.trim()).toContain('Accept terms');
  });

  it('should show required indicator when required', () => {
    fixture.componentRef.setInput('label', 'Required field');
    fixture.componentRef.setInput('required', true);
    fixture.detectChanges();

    const required = fixture.nativeElement.querySelector('.checkbox-required');
    expect(required).toBeTruthy();
  });

  it('should not toggle when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('.checkbox-input');
    expect(component.checked()).toBe(false);

    input.click();
    fixture.detectChanges();

    expect(component.checked()).toBe(false);
  });

  it('should show check icon when checked', () => {
    component.checked.set(true);
    fixture.detectChanges();

    const icon = fixture.nativeElement.querySelector('.checkbox-icon');
    expect(icon).toBeTruthy();
    expect(icon.textContent.trim()).toBe('✓');
  });

  it('should show indeterminate icon', () => {
    fixture.componentRef.setInput('indeterminate', true);
    fixture.detectChanges();

    const icon = fixture.nativeElement.querySelector('.checkbox-icon');
    expect(icon).toBeTruthy();
    expect(icon.textContent.trim()).toBe('−');
  });

  it('should show error message', () => {
    fixture.componentRef.setInput('error', 'This field is required');
    fixture.detectChanges();

    const error = fixture.nativeElement.querySelector('.checkbox-error-message');
    expect(error).toBeTruthy();
    expect(error.textContent.trim()).toBe('This field is required');
  });

  it('should show help text', () => {
    fixture.componentRef.setInput('helpText', 'Check this to proceed');
    fixture.detectChanges();

    const help = fixture.nativeElement.querySelector('.checkbox-description');
    expect(help).toBeTruthy();
    expect(help.textContent.trim()).toBe('Check this to proceed');
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

  it('should apply disabled class when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('.checkbox-container');
    expect(container.classList.contains('checkbox-disabled')).toBe(true);
  });

  it('should apply error class when error exists', () => {
    fixture.componentRef.setInput('error', 'Error');
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('.checkbox-container');
    expect(container.classList.contains('checkbox-error')).toBe(true);
  });

  it('should set aria-invalid when error exists', () => {
    fixture.componentRef.setInput('error', 'Error');
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('.checkbox-input');
    expect(input.getAttribute('aria-invalid')).toBe('true');
  });

  it('should support two-way binding', () => {
    expect(component.checked()).toBe(false);

    component.checked.set(true);
    fixture.detectChanges();
    expect(component.checked()).toBe(true);

    const input = fixture.nativeElement.querySelector('.checkbox-input');
    input.click();
    fixture.detectChanges();
    expect(component.checked()).toBe(false);
  });
});
