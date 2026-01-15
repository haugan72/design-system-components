import { Component, input, output, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Drop event data for Kanban column
 */
export interface KanbanDropEvent {
  item: any;
  columnId: string;
}

/**
 * Kanban Column Component
 *
 * A column container for a Kanban board that acts as a drop zone for draggable cards.
 * Displays a header with title and item count, and a scrollable body for cards.
 * Supports collapsible state for space management.
 *
 * @example
 * ```html
 * <app-kanban-column
 *   [columnId]="'lead'"
 *   [title]="'Leads'"
 *   [count]="5"
 *   [collapsed]="false"
 *   (itemDropped)="onItemDropped($event)"
 *   (toggleCollapse)="onToggleCollapse()">
 *   <app-kanban-card *ngFor="let item of items" [title]="item.name"></app-kanban-card>
 * </app-kanban-column>
 * ```
 */
@Component({
  selector: 'app-kanban-column',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kanban-column.component.html',
  styleUrl: './kanban-column.component.css'
})
export class KanbanColumnComponent {
  // ========================================
  // Inputs
  // ========================================

  /** Unique identifier for the column (used for drag-drop targeting) */
  columnId = input.required<string>();

  /** Column header title */
  title = input.required<string>();

  /** Optional icon for the header (deprecated - prefer no icons for clean design) */
  icon = input<string>();

  /** Number of items in the column */
  count = input<number>(0);

  /** Optional header color accent (deprecated - prefer card-style headers) */
  headerColor = input<string>();

  /** Whether the column is collapsed */
  collapsed = input<boolean>(false);

  // ========================================
  // Outputs
  // ========================================

  /** Emitted when an item is dropped in this column */
  itemDropped = output<KanbanDropEvent>();

  /** Emitted when collapse toggle is clicked */
  toggleCollapse = output<void>();

  // ========================================
  // Internal State
  // ========================================

  /** Whether a drag is currently over this column */
  isDragOver = signal(false);

  // ========================================
  // Computed Properties
  // ========================================

  /** Column CSS classes */
  readonly columnClasses = computed(() => {
    const classes = ['kanban-column'];
    if (this.collapsed()) {
      classes.push('collapsed');
    }
    if (this.count() === 0) {
      classes.push('empty');
    }
    return classes.join(' ');
  });

  /** Column body CSS classes */
  readonly bodyClasses = computed(() => {
    const classes = ['kanban-column-body'];
    if (this.isDragOver()) {
      classes.push('drag-over');
    }
    return classes.join(' ');
  });

  /** Handle collapse toggle click */
  onToggleCollapse(event: MouseEvent): void {
    event.stopPropagation();
    this.toggleCollapse.emit();
  }

  // ========================================
  // Drag and Drop Handlers
  // ========================================

  /**
   * Handle drag over event
   */
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
  }

  /**
   * Handle drag enter event
   */
  onDragEnter(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver.set(true);
  }

  /**
   * Handle drag leave event
   */
  onDragLeave(event: DragEvent): void {
    // Only set to false if we're leaving the column entirely
    const relatedTarget = event.relatedTarget as HTMLElement;
    const currentTarget = event.currentTarget as HTMLElement;

    if (!currentTarget.contains(relatedTarget)) {
      this.isDragOver.set(false);
    }
  }

  /**
   * Handle drop event
   */
  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver.set(false);

    if (event.dataTransfer) {
      const dataString = event.dataTransfer.getData('text/plain');
      try {
        const item = JSON.parse(dataString);
        this.itemDropped.emit({
          item,
          columnId: this.columnId()
        });
      } catch (e) {
        // Data wasn't JSON, emit raw data
        this.itemDropped.emit({
          item: dataString,
          columnId: this.columnId()
        });
      }
    }
  }
}
