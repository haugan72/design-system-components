import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioComponent } from './radio.component';

describe('RadioComponent', () => {
  let component: RadioComponent;
  let fixture: ComponentFixture<RadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RadioComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('value', 'option1');
    fixture.componentRef.setInput('name', 'test-group');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not be checked by default', () => {
    expect(component.isChecked()).toBe(false);
  });

  it('should be checked when selectedValue matches value', () => {
    component.selectedValue.set('option1');
    fixture.detectChanges();
    expect(component.isChecked()).toBe(true);
  });

  it('should select on click', () => {
    spyOn(component.changed, 'emit');
    const input = fixture.nativeElement.querySelector('.radio-input');

    input.click();
    fixture.detectChanges();

    expect(component.selectedValue()).toBe('option1');
    expect(component.changed.emit).toHaveBeenCalledWith('option1');
  });

  it('should render label when provided', () => {
    fixture.componentRef.setInput('label', 'Option 1');
    fixture.detectChanges();

    const label = fixture.nativeElement.querySelector('.radio-text');
    expect(label).toBeTruthy();
    expect(label.textContent.trim()).toContain('Option 1');
  });

  it('should show required indicator when required', () => {
    fixture.componentRef.setInput('label', 'Required option');
    fixture.componentRef.setInput('required', true);
    fixture.detectChanges();

    const required = fixture.nativeElement.querySelector('.radio-required');
    expect(required).toBeTruthy();
  });

  it('should not select when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    component.onSelect();
    expect(component.selectedValue()).toBe(null);
  });

  it('should show dot when checked', () => {
    component.selectedValue.set('option1');
    fixture.detectChanges();

    const dot = fixture.nativeElement.querySelector('.radio-dot');
    expect(dot).toBeTruthy();
  });

  it('should show error message', () => {
    fixture.componentRef.setInput('error', 'Please select an option');
    fixture.detectChanges();

    const error = fixture.nativeElement.querySelector('.radio-error-message');
    expect(error).toBeTruthy();
    expect(error.textContent.trim()).toBe('Please select an option');
  });

  it('should show help text', () => {
    fixture.componentRef.setInput('helpText', 'Choose the best option');
    fixture.detectChanges();

    const help = fixture.nativeElement.querySelector('.radio-description');
    expect(help).toBeTruthy();
    expect(help.textContent.trim()).toBe('Choose the best option');
  });

  it('should handle keyboard Enter key', () => {
    spyOn(component, 'onSelect');
    const mockEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    spyOn(mockEvent, 'preventDefault');

    component.onKeyDown(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(component.onSelect).toHaveBeenCalled();
  });

  it('should handle keyboard Space key', () => {
    spyOn(component, 'onSelect');
    const mockEvent = new KeyboardEvent('keydown', { key: ' ' });
    spyOn(mockEvent, 'preventDefault');

    component.onKeyDown(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(component.onSelect).toHaveBeenCalled();
  });

  it('should apply disabled class when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('.radio-container');
    expect(container.classList.contains('radio-disabled')).toBe(true);
  });

  it('should apply error class when error exists', () => {
    fixture.componentRef.setInput('error', 'Error');
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('.radio-container');
    expect(container.classList.contains('radio-error')).toBe(true);
  });

  it('should set aria-invalid when error exists', () => {
    fixture.componentRef.setInput('error', 'Error');
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('.radio-input');
    expect(input.getAttribute('aria-invalid')).toBe('true');
  });

  it('should set name attribute', () => {
    const input = fixture.nativeElement.querySelector('.radio-input');
    expect(input.name).toBe('test-group');
  });

  it('should support two-way binding', () => {
    expect(component.selectedValue()).toBe(null);

    component.selectedValue.set('option1');
    fixture.detectChanges();
    expect(component.isChecked()).toBe(true);

    component.selectedValue.set('option2');
    fixture.detectChanges();
    expect(component.isChecked()).toBe(false);
  });
});
