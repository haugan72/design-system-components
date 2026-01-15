import { Component, input, output, computed, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * View toggle option configuration
 */
export interface ViewToggleOption {
  /** Unique identifier for the option */
  id: string;
  /** SVG icon string or emoji */
  icon: string;
  /** Accessible label (used for title and aria-label) */
  label: string;
}

/**
 * View Toggle Component
 *
 * A button group for switching between different view modes (e.g., table vs kanban).
 * Supports icon-based toggle buttons with tooltips and keyboard navigation.
 *
 * @example
 * ```html
 * <app-view-toggle
 *   [options]="viewOptions"
 *   [(value)]="currentView">
 * </app-view-toggle>
 * ```
 */
@Component({
  selector: 'app-view-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-toggle.component.html',
  styleUrl: './view-toggle.component.css'
})
export class ViewToggleComponent {
  // ========================================
  // Inputs/Outputs
  // ========================================

  /** Available toggle options */
  options = input.required<ViewToggleOption[]>();

  /** Currently selected value (two-way bindable) */
  value = model<string>('');

  // ========================================
  // Constructor
  // ========================================

  constructor(private sanitizer: DomSanitizer) {}

  // ========================================
  // Methods
  // ========================================

  /**
   * Select an option
   */
  select(optionId: string): void {
    this.value.set(optionId);
  }

  /**
   * Check if an option is selected
   */
  isSelected(optionId: string): boolean {
    return this.value() === optionId;
  }

  /**
   * Check if icon is an SVG string (contains '<')
   */
  isSvgIcon(icon: string): boolean {
    return icon.includes('<');
  }

  /**
   * Sanitize SVG for safe rendering
   */
  sanitizeSvg(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  /**
   * Handle keyboard navigation
   */
  onKeyDown(event: KeyboardEvent, currentIndex: number): void {
    const opts = this.options();

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      const nextIndex = (currentIndex + 1) % opts.length;
      this.select(opts[nextIndex].id);
      this.focusButton(nextIndex);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      const prevIndex = (currentIndex - 1 + opts.length) % opts.length;
      this.select(opts[prevIndex].id);
      this.focusButton(prevIndex);
    } else if (event.key === 'Home') {
      event.preventDefault();
      this.select(opts[0].id);
      this.focusButton(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      const lastIndex = opts.length - 1;
      this.select(opts[lastIndex].id);
      this.focusButton(lastIndex);
    }
  }

  /**
   * Focus a button by index
   */
  private focusButton(index: number): void {
    setTimeout(() => {
      const buttons = document.querySelectorAll('.view-toggle-btn');
      const button = buttons[index] as HTMLButtonElement;
      button?.focus();
    }, 0);
  }

  /**
   * Track function for options
   */
  trackOption(index: number, option: ViewToggleOption): string {
    return option.id;
  }
}
