import { Component, input, output, model, computed } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-radio',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.css'
})
export class RadioComponent {
  // Inputs
  value = input.required<any>(); // The value this radio represents
  selectedValue = model<any>(null); // Two-way binding for selected value
  label = input<string>();
  name = input.required<string>(); // Radio group name
  disabled = input<boolean>(false);
  required = input<boolean>(false);
  error = input<string>();
  helpText = input<string>();
  id = input<string>(`radio-${Math.random().toString(36).substr(2, 9)}`);

  // Outputs
  changed = output<any>();

  // Computed Properties
  readonly isChecked = computed(() => {
    return this.selectedValue() === this.value();
  });

  readonly containerClasses = computed(() => {
    const classes: string[] = ['radio-container'];
    if (this.disabled()) classes.push('radio-disabled');
    if (this.error()) classes.push('radio-error');
    return classes.join(' ');
  });

  readonly radioClasses = computed(() => {
    const classes: string[] = ['radio'];
    if (this.isChecked()) classes.push('radio-checked');
    if (this.error()) classes.push('radio-error');
    return classes.join(' ');
  });

  // Methods
  onSelect(): void {
    if (this.disabled()) return;

    this.selectedValue.set(this.value());
    this.changed.emit(this.value());
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled()) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onSelect();
    }
  }
}
