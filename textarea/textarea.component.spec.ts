import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextareaComponent } from './textarea.component';

describe('TextareaComponent', () => {
  let component: TextareaComponent;
  let fixture: ComponentFixture<TextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextareaComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TextareaComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Test Textarea');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render label', () => {
    const label = fixture.nativeElement.querySelector('.textarea-label');
    expect(label.textContent.trim()).toContain('Test Textarea');
  });

  it('should bind value with two-way binding', () => {
    expect(component.value()).toBe('');
    component.value.set('test content');
    fixture.detectChanges();
    const textarea = fixture.nativeElement.querySelector('.textarea') as HTMLTextAreaElement;
    expect(textarea.value).toBe('test content');
  });

  it('should emit valueChange on input', () => {
    spyOn(component.valueChange, 'emit');
    const textarea = fixture.nativeElement.querySelector('.textarea') as HTMLTextAreaElement;

    textarea.value = 'new content';
    textarea.dispatchEvent(new Event('input'));

    expect(component.value()).toBe('new content');
    expect(component.valueChange.emit).toHaveBeenCalledWith('new content');
  });

  it('should set rows attribute', () => {
    fixture.componentRef.setInput('rows', 10);
    fixture.detectChanges();

    const textarea = fixture.nativeElement.querySelector('.textarea') as HTMLTextAreaElement;
    expect(textarea.rows).toBe(10);
  });

  it('should disable textarea when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const textarea = fixture.nativeElement.querySelector('.textarea') as HTMLTextAreaElement;
    expect(textarea.disabled).toBe(true);
  });

  it('should make textarea readonly when readonly', () => {
    fixture.componentRef.setInput('readonly', true);
    fixture.detectChanges();

    const textarea = fixture.nativeElement.querySelector('.textarea') as HTMLTextAreaElement;
    expect(textarea.readOnly).toBe(true);
  });

  it('should show error message', () => {
    fixture.componentRef.setInput('error', 'This field is required');
    fixture.detectChanges();

    const error = fixture.nativeElement.querySelector('.textarea-error-message');
    expect(error).toBeTruthy();
    expect(error.textContent.trim()).toBe('This field is required');
  });

  it('should show help text', () => {
    fixture.componentRef.setInput('helpText', 'Enter your message here');
    fixture.detectChanges();

    const help = fixture.nativeElement.querySelector('.textarea-description');
    expect(help).toBeTruthy();
    expect(help.textContent.trim()).toBe('Enter your message here');
  });

  it('should show character count', () => {
    fixture.componentRef.setInput('showCharacterCount', true);
    fixture.componentRef.setInput('maxLength', 200);
    component.value.set('Hello');
    fixture.detectChanges();

    const charCount = fixture.nativeElement.querySelector('.textarea-char-count');
    expect(charCount).toBeTruthy();
    expect(charCount.textContent.trim()).toBe('5/200');
  });

  it('should apply no-resize class when resizable is false', () => {
    fixture.componentRef.setInput('resizable', false);
    fixture.detectChanges();

    const textarea = fixture.nativeElement.querySelector('.textarea');
    expect(textarea.classList.contains('textarea-no-resize')).toBe(true);
  });

  it('should show success state when has value without error', () => {
    component.value.set('test content');
    fixture.detectChanges();

    const textarea = fixture.nativeElement.querySelector('.textarea');
    expect(textarea.classList.contains('textarea-success')).toBe(true);
  });

  it('should show error state when error exists', () => {
    fixture.componentRef.setInput('error', 'Error message');
    fixture.detectChanges();

    const textarea = fixture.nativeElement.querySelector('.textarea');
    expect(textarea.classList.contains('textarea-error')).toBe(true);
  });

  it('should emit focused event on focus', () => {
    spyOn(component.focused, 'emit');
    const textarea = fixture.nativeElement.querySelector('.textarea');

    textarea.dispatchEvent(new FocusEvent('focus'));

    expect(component.focused.emit).toHaveBeenCalled();
  });

  it('should emit blurred event on blur', () => {
    spyOn(component.blurred, 'emit');
    const textarea = fixture.nativeElement.querySelector('.textarea');

    textarea.dispatchEvent(new FocusEvent('blur'));

    expect(component.blurred.emit).toHaveBeenCalled();
  });

  it('should set maxlength attribute', () => {
    fixture.componentRef.setInput('maxLength', 500);
    fixture.detectChanges();

    const textarea = fixture.nativeElement.querySelector('.textarea') as HTMLTextAreaElement;
    expect(textarea.maxLength).toBe(500);
  });

  it('should set aria-invalid when error exists', () => {
    fixture.componentRef.setInput('error', 'Error message');
    fixture.detectChanges();

    const textarea = fixture.nativeElement.querySelector('.textarea');
    expect(textarea.getAttribute('aria-invalid')).toBe('true');
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
