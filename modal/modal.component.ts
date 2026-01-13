import { Component, signal, input, output, effect, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Modal size options
 */
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Modal configuration
 */
export interface ModalConfig {
  size?: ModalSize;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  centered?: boolean;
}

/**
 * Modal Component
 *
 * A flexible, accessible modal dialog component with animations and keyboard support.
 * Built with Angular Signals and modern accessibility practices.
 *
 * Features:
 * - Multiple sizes (sm, md, lg, xl, full)
 * - Smooth animations (fade in/out, slide up)
 * - Keyboard support (Escape to close)
 * - Click outside to close
 * - Focus trap for accessibility
 * - ARIA labels and roles
 * - Scroll lock when open
 * - Customizable header, body, and footer
 *
 * @example
 * ```html
 * <app-modal
 *   [isOpen]="showModal()"
 *   [title]="'Confirm Action'"
 *   [config]="{size: 'md', closeOnOverlayClick: true}"
 *   (close)="onClose()">
 *   <p>Are you sure you want to proceed?</p>
 * </app-modal>
 * ```
 */
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  // ========================================
  // Inputs
  // ========================================

  /** Is modal open */
  isOpen = input<boolean>(false);

  /** Modal title */
  title = input<string>();

  /** Modal configuration */
  config = input<ModalConfig>({
    size: 'md',
    closeOnOverlayClick: true,
    closeOnEscape: true,
    showCloseButton: true,
    centered: true
  });

  /** Primary button label */
  primaryButtonLabel = input<string>();

  /** Secondary button label */
  secondaryButtonLabel = input<string>();

  /** Show footer */
  showFooter = input<boolean>(true);

  /** Loading state for primary button */
  loading = input<boolean>(false);

  // ========================================
  // Outputs
  // ========================================

  /** Emitted when modal is closed */
  close = output<void>();

  /** Emitted when primary button is clicked */
  primaryAction = output<void>();

  /** Emitted when secondary button is clicked */
  secondaryAction = output<void>();

  // ========================================
  // Internal State
  // ========================================

  /** Is modal animating */
  readonly isAnimating = signal<boolean>(false);

  /** Previous focus element (for restoration) */
  private previousActiveElement: HTMLElement | null = null;

  // ========================================
  // View References
  // ========================================

  @ViewChild('modalElement', { read: ElementRef }) modalElement?: ElementRef<HTMLElement>;

  // ========================================
  // Lifecycle
  // ========================================

  constructor() {
    // Handle modal open/close
    effect(() => {
      if (this.isOpen()) {
        this.onModalOpen();
      } else {
        this.onModalClose();
      }
    });

    // Keyboard event listener
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', this.handleKeyDown.bind(this));
    }
  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', this.handleKeyDown.bind(this));
    }
    this.restoreFocus();
    this.unlockScroll();
  }

  // ========================================
  // Methods
  // ========================================

  /**
   * Handle modal open
   */
  private onModalOpen(): void {
    this.isAnimating.set(true);
    this.saveFocus();
    this.lockScroll();

    // Set animation complete after transition
    setTimeout(() => {
      this.isAnimating.set(false);
      this.focusModal();
    }, 300);
  }

  /**
   * Handle modal close
   */
  private onModalClose(): void {
    this.isAnimating.set(true);
    this.unlockScroll();
    this.restoreFocus();

    setTimeout(() => {
      this.isAnimating.set(false);
    }, 300);
  }

  /**
   * Save currently focused element
   */
  private saveFocus(): void {
    if (typeof document !== 'undefined') {
      this.previousActiveElement = document.activeElement as HTMLElement;
    }
  }

  /**
   * Restore focus to previously focused element
   */
  private restoreFocus(): void {
    if (this.previousActiveElement && typeof this.previousActiveElement.focus === 'function') {
      setTimeout(() => {
        this.previousActiveElement?.focus();
      }, 100);
    }
  }

  /**
   * Focus modal element
   */
  private focusModal(): void {
    if (this.modalElement) {
      this.modalElement.nativeElement.focus();
    }
  }

  /**
   * Lock body scroll
   */
  private lockScroll(): void {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  /**
   * Unlock body scroll
   */
  private unlockScroll(): void {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  /**
   * Handle keyboard events
   */
  private handleKeyDown(event: KeyboardEvent): void {
    if (!this.isOpen()) return;

    const cfg = this.config();

    // Escape key
    if (event.key === 'Escape' && cfg.closeOnEscape) {
      event.preventDefault();
      this.onClose();
    }

    // Tab key (trap focus)
    if (event.key === 'Tab') {
      this.handleTabKey(event);
    }
  }

  /**
   * Handle tab key for focus trap
   */
  private handleTabKey(event: KeyboardEvent): void {
    if (!this.modalElement) return;

    const focusableElements = this.modalElement.nativeElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }

  /**
   * Handle overlay click
   */
  onOverlayClick(event: MouseEvent): void {
    const cfg = this.config();
    if (cfg.closeOnOverlayClick && event.target === event.currentTarget) {
      this.onClose();
    }
  }

  /**
   * Close modal
   */
  onClose(): void {
    this.close.emit();
  }

  /**
   * Handle primary action
   */
  onPrimaryAction(): void {
    this.primaryAction.emit();
  }

  /**
   * Handle secondary action
   */
  onSecondaryAction(): void {
    this.secondaryAction.emit();
  }

  /**
   * Get modal size class
   */
  getSizeClass(): string {
    const size = this.config().size || 'md';
    return `modal-${size}`;
  }
}
