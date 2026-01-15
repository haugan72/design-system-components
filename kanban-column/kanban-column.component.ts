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
 * Displays a header with icon, title, and item count, and a scrollable body for cards.
 *
 * @example
 * ```html
 * <app-kanban-column
 *   [columnId]="'lead'"
 *   [title]="'Leads'"
 *   [icon]="'🎯'"
 *   [count]="5"
 *   (itemDropped)="onItemDropped($event)">
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

  /** Optional icon/emoji for the header */
  icon = input<string>();

  /** Number of items in the column */
  count = input<number>(0);

  /** Optional header color accent */
  headerColor = input<string>();

  // ========================================
  // Outputs
  // ========================================

  /** Emitted when an item is dropped in this column */
  itemDropped = output<KanbanDropEvent>();

  // ========================================
  // Internal State
  // ========================================

  /** Whether a drag is currently over this column */
  isDragOver = signal(false);

  // ========================================
  // Computed Properties
  // ========================================

  /** Column body CSS classes */
  readonly bodyClasses = computed(() => {
    const classes = ['kanban-column-body'];
    if (this.isDragOver()) {
      classes.push('drag-over');
    }
    return classes.join(' ');
  });

  /** Header style with optional accent color */
  readonly headerStyle = computed(() => {
    const color = this.headerColor();
    if (color) {
      return { 'border-left': `3px solid ${color}` };
    }
    return {};
  });

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
