import { Component, input, output, model, computed } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.css'
})
export class CheckboxComponent {
  // Inputs
  checked = model<boolean>(false); // Two-way binding
  label = input<string>();
  disabled = input<boolean>(false);
  indeterminate = input<boolean>(false); // For "some selected" state
  required = input<boolean>(false);
  error = input<string>();
  helpText = input<string>();
  id = input<string>(`checkbox-${Math.random().toString(36).substr(2, 9)}`);

  // Outputs
  changed = output<boolean>();

  // Computed Properties
  readonly containerClasses = computed(() => {
    const classes: string[] = ['checkbox-container'];
    if (this.disabled()) classes.push('checkbox-disabled');
    if (this.error()) classes.push('checkbox-error');
    return classes.join(' ');
  });

  readonly checkboxClasses = computed(() => {
    const classes: string[] = ['checkbox'];
    if (this.checked()) classes.push('checkbox-checked');
    if (this.indeterminate()) classes.push('checkbox-indeterminate');
    if (this.error()) classes.push('checkbox-error');
    return classes.join(' ');
  });

  // Methods
  onToggle(event: Event): void {
    if (this.disabled()) {
      event.preventDefault();
      return;
    }

    const newValue = !this.checked();
    this.checked.set(newValue);
    this.changed.emit(newValue);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled()) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const newValue = !this.checked();
      this.checked.set(newValue);
      this.changed.emit(newValue);
    }
  }
}
