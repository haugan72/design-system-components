import { Component, input, output, model, computed } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

export type TextareaState = 'default' | 'error' | 'success';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.css'
})
export class TextareaComponent {
  // Inputs
  value = model<string>(''); // Two-way binding
  label = input.required<string>();
  placeholder = input<string>();
  disabled = input<boolean>(false);
  readonly = input<boolean>(false);
  required = input<boolean>(false);
  error = input<string>();
  helpText = input<string>();
  rows = input<number>(4);
  maxLength = input<number>();
  minLength = input<number>();
  showCharacterCount = input<boolean>(false);
  resizable = input<boolean>(true);
  id = input<string>(`textarea-${Math.random().toString(36).substr(2, 9)}`);

  // Outputs
  valueChange = output<string>();
  focused = output<void>();
  blurred = output<void>();

  // Computed Properties
  readonly state = computed<TextareaState>(() => {
    if (this.error()) return 'error';
    if (this.value() && !this.error()) return 'success';
    return 'default';
  });

  readonly containerClasses = computed(() => {
    const classes: string[] = ['textarea-container'];
    if (this.disabled()) classes.push('textarea-disabled');
    if (this.readonly()) classes.push('textarea-readonly');
    return classes.join(' ');
  });

  readonly textareaClasses = computed(() => {
    const classes: string[] = ['textarea'];
    classes.push(`textarea-${this.state()}`);
    if (!this.resizable()) classes.push('textarea-no-resize');
    return classes.join(' ');
  });

  readonly characterCount = computed(() => {
    const current = this.value().length;
    const max = this.maxLength();
    return max ? `${current}/${max}` : `${current}`;
  });

  // Methods
  onInput(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    this.value.set(textarea.value);
    this.valueChange.emit(textarea.value);
  }

  onFocus(): void {
    this.focused.emit();
  }

  onBlur(): void {
    this.blurred.emit();
  }
}
