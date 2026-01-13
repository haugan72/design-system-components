import { Component, input, output, model, computed, signal } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

export type TextInputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
export type TextInputState = 'default' | 'error' | 'success';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.css'
})
export class TextInputComponent {
  // Inputs
  value = model<string>(''); // Two-way binding
  type = input<TextInputType>('text');
  label = input.required<string>();
  placeholder = input<string>();
  disabled = input<boolean>(false);
  readonly = input<boolean>(false);
  required = input<boolean>(false);
  error = input<string>();
  helpText = input<string>();
  maxLength = input<number>();
  minLength = input<number>();
  pattern = input<string>();
  autocomplete = input<string>();
  prefixIcon = input<string>();
  suffixIcon = input<string>();
  showClearButton = input<boolean>(false);
  showCharacterCount = input<boolean>(false);
  id = input<string>(`text-input-${Math.random().toString(36).substr(2, 9)}`);

  // Outputs
  valueChange = output<string>();
  focused = output<void>();
  blurred = output<void>();
  cleared = output<void>();

  // Internal Signals
  private isFocused = signal<boolean>(false);
  private showPassword = signal<boolean>(false);

  // Computed Properties
  readonly state = computed<TextInputState>(() => {
    if (this.error()) return 'error';
    if (this.value() && !this.error()) return 'success';
    return 'default';
  });

  readonly containerClasses = computed(() => {
    const classes: string[] = ['text-input-container'];
    if (this.disabled()) classes.push('text-input-disabled');
    if (this.readonly()) classes.push('text-input-readonly');
    return classes.join(' ');
  });

  readonly inputClasses = computed(() => {
    const classes: string[] = ['text-input'];
    classes.push(`text-input-${this.state()}`);

    if (this.isFocused()) classes.push('text-input-focused');
    if (this.prefixIcon()) classes.push('text-input-with-prefix');
    if (this.suffixIcon() || this.showClearButton() || this.type() === 'password') {
      classes.push('text-input-with-suffix');
    }

    return classes.join(' ');
  });

  readonly inputType = computed(() => {
    if (this.type() === 'password' && this.showPassword()) {
      return 'text';
    }
    return this.type();
  });

  readonly characterCount = computed(() => {
    const current = this.value().length;
    const max = this.maxLength();
    return max ? `${current}/${max}` : `${current}`;
  });

  readonly showClear = computed(() => {
    return this.showClearButton() && this.value().length > 0 && !this.disabled() && !this.readonly();
  });

  // Methods
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value.set(input.value);
    this.valueChange.emit(input.value);
  }

  onFocus(): void {
    this.isFocused.set(true);
    this.focused.emit();
  }

  onBlur(): void {
    this.isFocused.set(false);
    this.blurred.emit();
  }

  onClear(): void {
    this.value.set('');
    this.valueChange.emit('');
    this.cleared.emit();
  }

  togglePasswordVisibility(): void {
    this.showPassword.update(show => !show);
  }
}
