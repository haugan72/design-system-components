import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroupComponent } from './form-group.component';

describe('FormGroupComponent', () => {
  let component: FormGroupComponent;
  let fixture: ComponentFixture<FormGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormGroupComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render label when provided', () => {
    fixture.componentRef.setInput('label', 'Email Address');
    fixture.detectChanges();

    const label = fixture.nativeElement.querySelector('.form-group-label');
    expect(label).toBeTruthy();
    expect(label.textContent.trim()).toContain('Email Address');
  });

  it('should not render label when not provided', () => {
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('.form-group-label');
    expect(label).toBeFalsy();
  });

  it('should show required indicator when required is true', () => {
    fixture.componentRef.setInput('label', 'Username');
    fixture.componentRef.setInput('required', true);
    fixture.detectChanges();

    const indicator = fixture.nativeElement.querySelector('.form-group-required-indicator');
    expect(indicator).toBeTruthy();
    expect(indicator.textContent).toBe('*');
  });

  it('should show optional indicator when optional is true', () => {
    fixture.componentRef.setInput('label', 'Middle Name');
    fixture.componentRef.setInput('optional', true);
    fixture.detectChanges();

    const indicator = fixture.nativeElement.querySelector('.form-group-optional-indicator');
    expect(indicator).toBeTruthy();
    expect(indicator.textContent).toBe('(optional)');
  });

  it('should render help text when provided', () => {
    fixture.componentRef.setInput('helpText', 'Enter a valid email address');
    fixture.detectChanges();

    const helper = fixture.nativeElement.querySelector('.form-group-helper');
    expect(helper).toBeTruthy();
    expect(helper.textContent.trim()).toBe('Enter a valid email address');
  });

  it('should render error message when provided', () => {
    fixture.componentRef.setInput('error', 'This field is required');
    fixture.detectChanges();

    const helper = fixture.nativeElement.querySelector('.form-group-helper-error');
    expect(helper).toBeTruthy();
    expect(helper.textContent.trim()).toBe('This field is required');
  });

  it('should prioritize error over help text', () => {
    fixture.componentRef.setInput('helpText', 'This is help text');
    fixture.componentRef.setInput('error', 'This is an error');
    fixture.detectChanges();

    const helper = fixture.nativeElement.querySelector('.form-group-helper');
    expect(helper.textContent.trim()).toBe('This is an error');
  });

  it('should apply error class when error is present', () => {
    fixture.componentRef.setInput('error', 'Invalid input');
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('.form-group');
    expect(container.classList.contains('form-group-error')).toBe(true);
  });

  it('should apply horizontal layout class', () => {
    fixture.componentRef.setInput('orientation', 'horizontal');
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('.form-group-horizontal');
    expect(container).toBeTruthy();
  });

  it('should apply inline class when fullWidth is false', () => {
    fixture.componentRef.setInput('fullWidth', false);
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('.form-group-inline');
    expect(container).toBeTruthy();
  });

  it('should apply focused class when control gains focus', () => {
    const control = fixture.nativeElement.querySelector('.form-group-control');
    control.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('.form-group');
    expect(container.classList.contains('form-group-focused')).toBe(true);
  });

  it('should remove focused class when control loses focus', () => {
    const control = fixture.nativeElement.querySelector('.form-group-control');

    control.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.form-group-focused')).toBeTruthy();

    control.dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.form-group-focused')).toBeFalsy();
  });

  it('should generate unique id by default', () => {
    const id1 = component.id();
    const fixture2 = TestBed.createComponent(FormGroupComponent);
    const component2 = fixture2.componentInstance;
    const id2 = component2.id();

    expect(id1).toBeTruthy();
    expect(id2).toBeTruthy();
    expect(id1).not.toBe(id2);
  });

  it('should use provided id', () => {
    fixture.componentRef.setInput('id', 'custom-form-group');
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('#custom-form-group');
    expect(container).toBeTruthy();
  });

  it('should set aria-live to assertive for errors', () => {
    fixture.componentRef.setInput('error', 'Error message');
    fixture.detectChanges();

    const helper = fixture.nativeElement.querySelector('.form-group-helper');
    expect(helper.getAttribute('aria-live')).toBe('assertive');
  });

  it('should set aria-live to polite for help text', () => {
    fixture.componentRef.setInput('helpText', 'Help message');
    fixture.detectChanges();

    const helper = fixture.nativeElement.querySelector('.form-group-helper');
    expect(helper.getAttribute('aria-live')).toBe('polite');
  });

  it('should set role alert on helper text', () => {
    fixture.componentRef.setInput('helpText', 'Help message');
    fixture.detectChanges();

    const helper = fixture.nativeElement.querySelector('.form-group-helper');
    expect(helper.getAttribute('role')).toBe('alert');
  });

  it('should render ng-content in control slot', () => {
    const testContent = '<input type="text" class="test-input">';
    const div = document.createElement('div');
    div.innerHTML = testContent;

    fixture.nativeElement.querySelector('.form-group-control').appendChild(div.firstChild);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('.test-input');
    expect(input).toBeTruthy();
  });

  it('should link label to control with for attribute', () => {
    fixture.componentRef.setInput('label', 'Test Label');
    fixture.componentRef.setInput('id', 'test-group');
    fixture.detectChanges();

    const label = fixture.nativeElement.querySelector('.form-group-label');
    const control = fixture.nativeElement.querySelector('.form-group-control');

    expect(label.getAttribute('for')).toBe('test-group-control');
    expect(control.id).toBe('test-group-control');
  });
});
