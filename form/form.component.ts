import { Component, signal, input, output, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * Form field types
 */
export type FormFieldType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date';

/**
 * Form field definition
 */
export interface FormField {
  name: string;
  label: string;
  type: FormFieldType;
  value?: any;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options?: { label: string; value: any }[]; // For select/radio fields
  validation?: FormFieldValidation;
  helpText?: string;
  rows?: number; // For textarea
}

/**
 * Form field validation rules
 */
export interface FormFieldValidation {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  email?: boolean;
  url?: boolean;
  custom?: (value: any) => string | null; // Returns error message or null
}

/**
 * Form configuration
 */
export interface FormConfig {
  layout?: 'vertical' | 'horizontal' | 'inline';
  submitLabel?: string;
  cancelLabel?: string;
  showCancel?: boolean;
  showReset?: boolean;
  resetLabel?: string;
}

/**
 * Form Component
 *
 * A flexible form component with built-in validation, multiple field types,
 * and customizable layouts. Built with Angular Signals and reactive patterns.
 *
 * Features:
 * - Multiple field types (text, email, password, textarea, select, checkbox, radio)
 * - Built-in validation (required, min/max length, pattern, custom validators)
 * - Real-time validation feedback
 * - Flexible layouts (vertical, horizontal, inline)
 * - Loading and disabled states
 * - Accessibility compliant
 *
 * @example
 * ```html
 * <app-form
 *   [fields]="formFields()"
 *   [config]="{layout: 'vertical'}"
 *   (formSubmit)="onSubmit($event)"
 *   (formCancel)="onCancel()">
 * </app-form>
 * ```
 */
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  // ========================================
  // Inputs
  // ========================================

  /** Form fields configuration */
  fields = input.required<FormField[]>();

  /** Form configuration */
  config = input<FormConfig>({
    layout: 'vertical',
    submitLabel: 'Submit',
    cancelLabel: 'Cancel',
    showCancel: false,
    showReset: false,
    resetLabel: 'Reset'
  });

  /** Loading state */
  loading = input<boolean>(false);

  /** Form title */
  title = input<string>();

  /** Form description */
  description = input<string>();

  // ========================================
  // Outputs
  // ========================================

  /** Emitted when form is submitted (if valid) */
  formSubmit = output<Record<string, any>>();

  /** Emitted when cancel button is clicked */
  formCancel = output<void>();

  /** Emitted when reset button is clicked */
  formReset = output<void>();

  /** Emitted when form validity changes */
  validityChange = output<boolean>();

  // ========================================
  // Internal State
  // ========================================

  /** Form values */
  readonly formValues = signal<Record<string, any>>({});

  /** Form errors */
  readonly formErrors = signal<Record<string, string | null>>({});

  /** Touched fields */
  readonly touchedFields = signal<Set<string>>(new Set());

  /** Form submitted flag */
  readonly submitted = signal<boolean>(false);

  // ========================================
  // Computed Properties
  // ========================================

  /** Is form valid */
  readonly isValid = computed(() => {
    const errors = this.formErrors();
    return Object.values(errors).every(error => error === null);
  });

  /** Form data */
  readonly formData = computed(() => {
    return this.formValues();
  });

  // ========================================
  // Lifecycle
  // ========================================

  constructor() {
    // Initialize form values and errors from fields
    effect(() => {
      const fields = this.fields();
      const values: Record<string, any> = {};
      const errors: Record<string, string | null> = {};

      fields.forEach(field => {
        values[field.name] = field.value ?? this.getDefaultValue(field.type);
        errors[field.name] = null;
      });

      this.formValues.set(values);
      this.formErrors.set(errors);
    });

    // Emit validity changes
    effect(() => {
      this.validityChange.emit(this.isValid());
    });
  }

  // ========================================
  // Methods
  // ========================================

  /**
   * Get default value for field type
   */
  private getDefaultValue(type: FormFieldType): any {
    switch (type) {
      case 'checkbox':
        return false;
      case 'number':
        return 0;
      default:
        return '';
    }
  }

  /**
   * Handle field value change
   */
  onFieldChange(field: FormField, value: any): void {
    this.formValues.update(values => ({
      ...values,
      [field.name]: value
    }));

    // Validate field if touched or form submitted
    if (this.touchedFields().has(field.name) || this.submitted()) {
      this.validateField(field);
    }
  }

  /**
   * Handle field blur (mark as touched)
   */
  onFieldBlur(field: FormField): void {
    this.touchedFields.update(touched => {
      const newTouched = new Set(touched);
      newTouched.add(field.name);
      return newTouched;
    });

    this.validateField(field);
  }

  /**
   * Validate a single field
   */
  private validateField(field: FormField): void {
    const value = this.formValues()[field.name];
    const error = this.getFieldError(field, value);

    this.formErrors.update(errors => ({
      ...errors,
      [field.name]: error
    }));
  }

  /**
   * Get error message for a field
   */
  private getFieldError(field: FormField, value: any): string | null {
    const validation = field.validation || {};

    // Required validation
    if (validation.required || field.required) {
      if (value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) {
        return `${field.label} is required`;
      }
    }

    // Skip other validations if value is empty and not required
    if (!value && !validation.required && !field.required) {
      return null;
    }

    // Min length validation
    if (validation.minLength !== undefined && String(value).length < validation.minLength) {
      return `${field.label} must be at least ${validation.minLength} characters`;
    }

    // Max length validation
    if (validation.maxLength !== undefined && String(value).length > validation.maxLength) {
      return `${field.label} must not exceed ${validation.maxLength} characters`;
    }

    // Min value validation
    if (validation.min !== undefined && Number(value) < validation.min) {
      return `${field.label} must be at least ${validation.min}`;
    }

    // Max value validation
    if (validation.max !== undefined && Number(value) > validation.max) {
      return `${field.label} must not exceed ${validation.max}`;
    }

    // Email validation
    if (validation.email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(String(value))) {
        return `${field.label} must be a valid email address`;
      }
    }

    // URL validation
    if (validation.url) {
      try {
        new URL(String(value));
      } catch {
        return `${field.label} must be a valid URL`;
      }
    }

    // Pattern validation
    if (validation.pattern && !validation.pattern.test(String(value))) {
      return `${field.label} format is invalid`;
    }

    // Custom validation
    if (validation.custom) {
      const customError = validation.custom(value);
      if (customError) {
        return customError;
      }
    }

    return null;
  }

  /**
   * Check if field should show error
   */
  shouldShowError(field: FormField): boolean {
    const error = this.formErrors()[field.name];
    const touched = this.touchedFields().has(field.name);
    const submitted = this.submitted();

    return !!error && (touched || submitted);
  }

  /**
   * Get error message for field
   */
  getError(field: FormField): string | null {
    return this.formErrors()[field.name];
  }

  /**
   * Handle form submission
   */
  onSubmit(event: Event): void {
    event.preventDefault();
    this.submitted.set(true);

    // Validate all fields
    this.fields().forEach(field => {
      this.validateField(field);
    });

    // Emit if valid
    if (this.isValid()) {
      this.formSubmit.emit(this.formValues());
    }
  }

  /**
   * Handle cancel
   */
  onCancel(): void {
    this.formCancel.emit();
  }

  /**
   * Handle reset
   */
  onReset(): void {
    // Reset to initial values
    const values: Record<string, any> = {};
    const errors: Record<string, string | null> = {};

    this.fields().forEach(field => {
      values[field.name] = field.value ?? this.getDefaultValue(field.type);
      errors[field.name] = null;
    });

    this.formValues.set(values);
    this.formErrors.set(errors);
    this.touchedFields.set(new Set());
    this.submitted.set(false);

    this.formReset.emit();
  }

  /**
   * Get field value
   */
  getFieldValue(field: FormField): any {
    return this.formValues()[field.name];
  }
}
