import { Component, input, output, computed, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Badge configuration for Kanban card
 */
export interface KanbanCardBadge {
  label: string;
  variant: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
}

/**
 * Kanban Card Component
 *
 * A draggable card for displaying items in a Kanban board column.
 * Supports title, subtitle, description, badge, and progress bar.
 *
 * @example
 * ```html
 * <app-kanban-card
 *   [title]="customer.name"
 *   [subtitle]="customer.email"
 *   [description]="customer.company"
 *   [badge]="{ label: 'High', variant: 'danger' }"
 *   [progress]="75"
 *   [data]="customer"
 *   (cardClick)="onCardClick($event)"
 *   (dragStarted)="onDragStart($event)">
 * </app-kanban-card>
 * ```
 */
@Component({
  selector: 'app-kanban-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kanban-card.component.html',
  styleUrl: './kanban-card.component.css'
})
export class KanbanCardComponent {
  // ========================================
  // Inputs
  // ========================================

  /** Primary text displayed on the card */
  title = input.required<string>();

  /** Secondary text (e.g., email) */
  subtitle = input<string>();

  /** Tertiary text (e.g., company name) */
  description = input<string>();

  /** Optional badge configuration */
  badge = input<KanbanCardBadge>();

  /** Progress value (0-100), displays progress bar if provided */
  progress = input<number>();

  /** Whether the card can be dragged */
  draggable = input<boolean>(true);

  /** The underlying data object (passed through events) */
  data = input<any>();

  // ========================================
  // Outputs
  // ========================================

  /** Emitted when the card is clicked */
  cardClick = output<any>();

  /** Emitted when drag starts */
  dragStarted = output<any>();

  /** Emitted when drag ends */
  dragEnded = output<void>();

  // ========================================
  // Internal State
  // ========================================

  /** Whether the card is currently being dragged */
  isDragging = signal(false);

  // ========================================
  // Computed Properties
  // ========================================

  /** Card CSS classes */
  readonly cardClasses = computed(() => {
    const classes = ['kanban-card'];
    if (this.isDragging()) {
      classes.push('dragging');
    }
    if (this.draggable()) {
      classes.push('draggable');
    }
    return classes.join(' ');
  });

  /** Progress bar CSS classes based on value */
  readonly progressClasses = computed(() => {
    const value = this.progress();
    if (value === undefined) return '';

    const classes = ['progress-bar-fill'];
    if (value === 100) {
      classes.push('complete');
    } else if (value >= 67) {
      classes.push('progress-high');
    } else if (value >= 34) {
      classes.push('progress-medium');
    }
    return classes.join(' ');
  });

  /** Badge CSS classes based on variant */
  readonly badgeClasses = computed(() => {
    const badgeConfig = this.badge();
    if (!badgeConfig) return '';
    return `badge badge-${badgeConfig.variant}`;
  });

  /** Whether progress bar should be shown */
  readonly showProgress = computed(() => this.progress() !== undefined);

  // ========================================
  // Methods
  // ========================================

  /**
   * Handle card click
   */
  onClick(event: MouseEvent): void {
    // Don't emit click if we're dragging
    if (!this.isDragging()) {
      this.cardClick.emit(this.data());
    }
  }

  /**
   * Handle drag start
   */
  onDragStart(event: DragEvent): void {
    if (!this.draggable()) {
      event.preventDefault();
      return;
    }

    this.isDragging.set(true);

    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', JSON.stringify(this.data()));
    }

    this.dragStarted.emit(this.data());
  }

  /**
   * Handle drag end
   */
  onDragEnd(event: DragEvent): void {
    this.isDragging.set(false);
    this.dragEnded.emit();
  }

  /**
   * Handle keyboard interaction for accessibility
   */
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.cardClick.emit(this.data());
    }
  }
}
