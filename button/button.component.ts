import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Button variant types
 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

/**
 * Button size types
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Button type for HTML button element
 */
export type ButtonType = 'button' | 'submit' | 'reset';

/**
 * Icon position in button
 */
export type IconPosition = 'left' | 'right';

/**
 * World-class Button Component
 *
 * A professional, accessible, and feature-rich button component with
 * multiple variants, sizes, loading states, and icon support.
 *
 * @example
 * ```html
 * <app-button
 *   variant="primary"
 *   size="md"
 *   [loading]="isLoading"
 *   [disabled]="isDisabled"
 *   (click)="handleClick()">
 *   Click Me
 * </app-button>
 * ```
 */
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  // ========================================
  // Inputs
  // ========================================

  /** Button variant style */
  variant = input<ButtonVariant>('primary');

  /** Button size */
  size = input<ButtonSize>('md');

  /** Button type attribute */
  type = input<ButtonType>('button');

  /** Disabled state */
  disabled = input<boolean>(false);

  /** Loading state (shows spinner) */
  loading = input<boolean>(false);

  /** Icon (emoji or icon class) */
  icon = input<string>();

  /** Icon position */
  iconPosition = input<IconPosition>('left');

  /** Full width button */
  fullWidth = input<boolean>(false);

  /** ARIA label for accessibility */
  ariaLabel = input<string>();

  // ========================================
  // Outputs
  // ========================================

  /** Emitted when button is clicked */
  clicked = output<MouseEvent>();

  // ========================================
  // Computed Properties
  // ========================================

  /** Get button classes */
  readonly buttonClasses = computed(() => {
    const classes: string[] = ['btn'];

    // Variant
    classes.push(`btn-${this.variant()}`);

    // Size
    classes.push(`btn-${this.size()}`);

    // Full width
    if (this.fullWidth()) {
      classes.push('btn-full-width');
    }

    // Loading state
    if (this.loading()) {
      classes.push('btn-loading');
    }

    return classes.join(' ');
  });

  /** Check if button is disabled (disabled or loading) */
  readonly isDisabled = computed(() => this.disabled() || this.loading());

  /** Check if icon should be on the left */
  readonly iconOnLeft = computed(() => this.iconPosition() === 'left');

  /** Check if icon should be on the right */
  readonly iconOnRight = computed(() => this.iconPosition() === 'right');

  /** Check if button has icon */
  readonly hasIcon = computed(() => !!this.icon());

  // ========================================
  // Methods
  // ========================================

  /**
   * Handle button click
   */
  onClick(event: MouseEvent): void {
    if (!this.isDisabled()) {
      this.clicked.emit(event);
    }
  }

  /**
   * Handle keyboard interaction for accessibility
   */
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
