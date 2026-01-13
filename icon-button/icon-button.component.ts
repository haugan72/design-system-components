import { Component, input, output, computed } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

export type IconButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type IconButtonShape = 'square' | 'round';

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.css'
})
export class IconButtonComponent {
  // Inputs
  variant = input<IconButtonVariant>('primary');
  shape = input<IconButtonShape>('round');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  icon = input.required<string>();
  ariaLabel = input.required<string>(); // Required for accessibility
  tooltip = input<string>(); // Optional tooltip text
  type = input<'button' | 'submit' | 'reset'>('button');

  // Outputs
  clicked = output<MouseEvent>();

  // Computed Properties
  readonly buttonClasses = computed(() => {
    const classes: string[] = ['icon-btn'];
    classes.push(`icon-btn-${this.variant()}`);
    classes.push(`icon-btn-${this.shape()}`);
    if (this.loading()) {
      classes.push('icon-btn-loading');
    }
    return classes.join(' ');
  });

  readonly isDisabled = computed(() => {
    return this.disabled() || this.loading();
  });

  readonly tooltipText = computed(() => {
    return this.tooltip() || this.ariaLabel();
  });

  // Methods
  onClick(event: MouseEvent): void {
    if (this.isDisabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.clicked.emit(event);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const mouseEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      });
      this.onClick(mouseEvent);
    }
  }
}
