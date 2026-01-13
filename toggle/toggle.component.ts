import { Component, input, output, model, computed } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

export type ToggleLabelPosition = 'left' | 'right';
export type ToggleSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-toggle',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.css'
})
export class ToggleComponent {
  // Inputs
  checked = model<boolean>(false); // Two-way binding
  disabled = input<boolean>(false);
  label = input<string>();
  labelPosition = input<ToggleLabelPosition>('right');
  size = input<ToggleSize>('md');
  ariaLabel = input<string>();
  id = input<string>(`toggle-${Math.random().toString(36).substr(2, 9)}`);

  // Outputs
  changed = output<boolean>();

  // Computed Properties
  readonly containerClasses = computed(() => {
    const classes: string[] = ['toggle-container'];
    classes.push(`toggle-size-${this.size()}`);

    if (this.labelPosition() === 'left') {
      classes.push('toggle-label-left');
    }

    if (this.disabled()) {
      classes.push('toggle-disabled');
    }

    return classes.join(' ');
  });

  readonly toggleClasses = computed(() => {
    const classes: string[] = ['toggle'];
    classes.push(`toggle-${this.size()}`);

    if (this.checked()) {
      classes.push('toggle-checked');
    }

    if (this.disabled()) {
      classes.push('toggle-disabled');
    }

    return classes.join(' ');
  });

  readonly effectiveAriaLabel = computed(() => {
    return this.ariaLabel() || this.label() || 'Toggle switch';
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
    if (this.disabled()) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const newValue = !this.checked();
      this.checked.set(newValue);
      this.changed.emit(newValue);
    }
  }
}
