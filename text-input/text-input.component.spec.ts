import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextInputComponent } from './text-input.component';

describe('TextInputComponent', () => {
  let component: TextInputComponent;
  let fixture: ComponentFixture<TextInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextInputComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TextInputComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Test Input');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render label', () => {
    const label = fixture.nativeElement.querySelector('.text-input-label');
    expect(label.textContent.trim()).toContain('Test Input');
  });

  it('should show required indicator when required', () => {
    fixture.componentRef.setInput('required', true);
    fixture.detectChanges();
    const required = fixture.nativeElement.querySelector('.text-input-required');
    expect(required).toBeTruthy();
    expect(required.textContent.trim()).toBe('*');
  });

  it('should bind value with two-way binding', () => {
    expect(component.value()).toBe('');
    component.value.set('test value');
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('.text-input') as HTMLInputElement;
    expect(input.value).toBe('test value');
  });

  it('should emit valueChange on input', () => {
    spyOn(component.valueChange, 'emit');
    const input = fixture.nativeElement.querySelector('.text-input') as HTMLInputElement;

    input.value = 'new value';
    input.dispatchEvent(new Event('input'));

    expect(component.value()).toBe('new value');
    expect(component.valueChange.emit).toHaveBeenCalledWith('new value');
  });

  it('should apply different input types', () => {
    const types = ['text', 'email', 'password', 'number', 'tel', 'url'];

    types.forEach(type => {
      fixture.componentRef.setInput('type', type);
      fixture.detectChanges();
      const input = fixture.nativeElement.querySelector('.text-input') as HTMLInputElement;

      if (type === 'password') {
        expect(['password', 'text']).toContain(input.type);
      } else {
        expect(input.type).toBe(type);
      }
    });
  });

  it('should show error state and message', () => {
    fixture.componentRef.setInput('error', 'This field is required');
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('.text-input');
    const errorMsg = fixture.nativeElement.querySelector('.text-input-error-message');

    expect(input.classList.contains('text-input-error')).toBe(true);
    expect(errorMsg).toBeTruthy();
    expect(errorMsg.textContent.trim()).toBe('This field is required');
  });

  it('should show success state when value exists without error', () => {
    component.value.set('valid value');
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('.text-input');
    expect(input.classList.contains('text-input-success')).toBe(true);
  });

  it('should disable input when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('.text-input') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it('should make input readonly when readonly', () => {
    fixture.componentRef.setInput('readonly', true);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('.text-input') as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });

  it('should show help text', () => {
    fixture.componentRef.setInput('helpText', 'Enter your email address');
    fixture.detectChanges();

    const help = fixture.nativeElement.querySelector('.text-input-description');
    expect(help).toBeTruthy();
    expect(help.textContent.trim()).toBe('Enter your email address');
  });

  it('should show prefix icon', () => {
    fixture.componentRef.setInput('prefixIcon', '📧');
    fixture.detectChanges();

    const prefix = fixture.nativeElement.querySelector('.text-input-prefix');
    expect(prefix).toBeTruthy();
    expect(prefix.textContent.trim()).toBe('📧');
  });

  it('should show suffix icon', () => {
    fixture.componentRef.setInput('suffixIcon', '✓');
    fixture.detectChanges();

    const suffix = fixture.nativeElement.querySelector('.text-input-suffix');
    expect(suffix).toBeTruthy();
    expect(suffix.textContent.trim()).toBe('✓');
  });

  it('should show clear button when showClearButton is true and has value', () => {
    fixture.componentRef.setInput('showClearButton', true);
    component.value.set('test');
    fixture.detectChanges();

    const clearBtn = fixture.nativeElement.querySelector('.text-input-clear-btn');
    expect(clearBtn).toBeTruthy();
  });

  it('should hide clear button when value is empty', () => {
    fixture.componentRef.setInput('showClearButton', true);
    fixture.detectChanges();

    const clearBtn = fixture.nativeElement.querySelector('.text-input-clear-btn');
    expect(clearBtn).toBeFalsy();
  });

  it('should clear value when clear button clicked', () => {
    spyOn(component.cleared, 'emit');
    fixture.componentRef.setInput('showClearButton', true);
    component.value.set('test value');
    fixture.detectChanges();

    const clearBtn = fixture.nativeElement.querySelector('.text-input-clear-btn');
    clearBtn.click();
    fixture.detectChanges();

    expect(component.value()).toBe('');
    expect(component.cleared.emit).toHaveBeenCalled();
  });

  it('should toggle password visibility', () => {
    fixture.componentRef.setInput('type', 'password');
    fixture.detectChanges();

    const toggleBtn = fixture.nativeElement.querySelector('.text-input-password-toggle');
    const input = fixture.nativeElement.querySelector('.text-input') as HTMLInputElement;

    expect(input.type).toBe('password');

    toggleBtn.click();
    fixture.detectChanges();

    expect(input.type).toBe('text');

    toggleBtn.click();
    fixture.detectChanges();

    expect(input.type).toBe('password');
  });

  it('should show character count', () => {
    fixture.componentRef.setInput('showCharacterCount', true);
    fixture.componentRef.setInput('maxLength', 100);
    component.value.set('Hello');
    fixture.detectChanges();

    const charCount = fixture.nativeElement.querySelector('.text-input-char-count');
    expect(charCount).toBeTruthy();
    expect(charCount.textContent.trim()).toBe('5/100');
  });

  it('should emit focused event on focus', () => {
    spyOn(component.focused, 'emit');
    const input = fixture.nativeElement.querySelector('.text-input');

    input.dispatchEvent(new FocusEvent('focus'));

    expect(component.focused.emit).toHaveBeenCalled();
  });

  it('should emit blurred event on blur', () => {
    spyOn(component.blurred, 'emit');
    const input = fixture.nativeElement.querySelector('.text-input');

    input.dispatchEvent(new FocusEvent('blur'));

    expect(component.blurred.emit).toHaveBeenCalled();
  });

  it('should set placeholder', () => {
    fixture.componentRef.setInput('placeholder', 'Enter text here');
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('.text-input') as HTMLInputElement;
    expect(input.placeholder).toBe('Enter text here');
  });

  it('should set maxlength attribute', () => {
    fixture.componentRef.setInput('maxLength', 50);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('.text-input') as HTMLInputElement;
    expect(input.maxLength).toBe(50);
  });

  it('should set aria-invalid when error exists', () => {
    fixture.componentRef.setInput('error', 'Error message');
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('.text-input');
    expect(input.getAttribute('aria-invalid')).toBe('true');
  });

  it('should generate unique id by default', () => {
    const id1 = component.id();
    const fixture2 = TestBed.createComponent(TextInputComponent);
    fixture2.componentRef.setInput('label', 'Test');
    const component2 = fixture2.componentInstance;
    const id2 = component2.id();

    expect(id1).toBeTruthy();
    expect(id2).toBeTruthy();
    expect(id1).not.toBe(id2);
  });

  it('should compute state correctly', () => {
    expect(component.state()).toBe('default');

    component.value.set('test');
    expect(component.state()).toBe('success');

    fixture.componentRef.setInput('error', 'Error');
    fixture.detectChanges();
    expect(component.state()).toBe('error');
  });
});
