import { Component, input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type FormGroupOrientation = 'vertical' | 'horizontal';

@Component({
  selector: 'app-form-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-group.component.html',
  styleUrl: './form-group.component.css'
})
export class FormGroupComponent {
  // Inputs
  label = input<string>();
  error = input<string>();
  helpText = input<string>();
  required = input<boolean>(false);
  optional = input<boolean>(false);
  orientation = input<FormGroupOrientation>('vertical');
  fullWidth = input<boolean>(true);
  id = input<string>(`form-group-${Math.random().toString(36).substr(2, 9)}`);

  // Signals
  private isFocused = signal(false);

  // Computed
  readonly containerClasses = computed(() => {
    const classes: string[] = ['form-group'];

    if (this.orientation() === 'horizontal') {
      classes.push('form-group-horizontal');
    }

    if (this.error()) {
      classes.push('form-group-error');
    }

    if (!this.fullWidth()) {
      classes.push('form-group-inline');
    }

    if (this.isFocused()) {
      classes.push('form-group-focused');
    }

    return classes.join(' ');
  });

  readonly labelClasses = computed(() => {
    const classes: string[] = ['form-group-label'];

    if (this.required()) {
      classes.push('form-group-label-required');
    }

    return classes.join(' ');
  });

  readonly showHelperText = computed(() => {
    return this.error() || this.helpText();
  });

  readonly helperTextClasses = computed(() => {
    const classes: string[] = ['form-group-helper'];

    if (this.error()) {
      classes.push('form-group-helper-error');
    }

    return classes.join(' ');
  });

  // Methods
  onFocus(): void {
    this.isFocused.set(true);
  }

  onBlur(): void {
    this.isFocused.set(false);
  }
}
