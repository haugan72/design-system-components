import { Component, input, output, computed, signal, TemplateRef, ContentChild, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanColumnComponent, type KanbanDropEvent } from '../kanban-column/kanban-column.component';
import { KanbanCardComponent, type KanbanCardBadge } from '../kanban-card/kanban-card.component';

/**
 * Column configuration for Kanban board
 */
export interface KanbanColumn {
  id: string;
  title: string;
  icon?: string;
  color?: string;
}

/**
 * Item move event data
 */
export interface KanbanItemMoveEvent {
  item: any;
  fromColumn: string;
  toColumn: string;
}

/**
 * Card display configuration
 */
export interface KanbanCardConfig {
  titleField: string;
  subtitleField?: string;
  descriptionField?: string;
  progressField?: string;
  badgeField?: string;
  badgeVariantMap?: Record<string, KanbanCardBadge['variant']>;
  /** Field name or function to get meta info (e.g., "days in stage") */
  metaInfoField?: string;
  /** Custom function to compute meta info from item */
  metaInfoFn?: (item: any) => string | undefined;
}

/**
 * Kanban Board Component
 *
 * A complete Kanban board with horizontal scrolling columns and drag-and-drop support.
 * Groups items by a specified field and displays them in columns.
 *
 * @example
 * ```html
 * <app-kanban-board
 *   [columns]="stages"
 *   [items]="customers"
 *   [groupByField]="'currentStage'"
 *   [cardConfig]="{ titleField: 'name', subtitleField: 'email' }"
 *   (itemMoved)="onCustomerMoved($event)"
 *   (itemClicked)="onCustomerClicked($event)">
 * </app-kanban-board>
 * ```
 */
@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [CommonModule, KanbanColumnComponent, KanbanCardComponent],
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.css'
})
export class KanbanBoardComponent implements AfterViewInit, OnDestroy {
  // ========================================
  // View Children
  // ========================================

  @ViewChild('boardContainer') boardContainer?: ElementRef<HTMLElement>;

  // ========================================
  // Inputs
  // ========================================

  /** Column configurations */
  columns = input.required<KanbanColumn[]>();

  /** Array of items to display */
  items = input.required<any[]>();

  /** Field name to group items by (must match column IDs) */
  groupByField = input.required<string>();

  /** Card display configuration */
  cardConfig = input.required<KanbanCardConfig>();

  /** Empty column message */
  emptyMessage = input<string>('No items');

  // ========================================
  // Outputs
  // ========================================

  /** Emitted when an item is moved between columns */
  itemMoved = output<KanbanItemMoveEvent>();

  /** Emitted when an item card is clicked */
  itemClicked = output<any>();

  // ========================================
  // Content Children
  // ========================================

  /** Custom card template (optional) */
  @ContentChild('cardTemplate') cardTemplate?: TemplateRef<any>;

  // ========================================
  // Internal State
  // ========================================

  /** Currently dragged item for tracking source column */
  private draggedItem = signal<any>(null);
  private draggedFromColumn = signal<string>('');

  /** Scroll state for navigation indicators */
  canScrollLeft = signal(false);
  canScrollRight = signal(false);

  /** Collapsed columns tracking */
  collapsedColumns = signal<Set<string>>(new Set());

  /** Scroll observer cleanup */
  private resizeObserver?: ResizeObserver;

  // ========================================
  // Computed Properties
  // ========================================

  /** Items grouped by column */
  readonly groupedItems = computed(() => {
    const allItems = this.items();
    const field = this.groupByField();
    const cols = this.columns();

    const grouped = new Map<string, any[]>();

    // Initialize all columns with empty arrays
    cols.forEach(col => {
      grouped.set(col.id, []);
    });

    // Group items by field value
    allItems.forEach(item => {
      const columnId = item[field];
      if (grouped.has(columnId)) {
        grouped.get(columnId)!.push(item);
      }
    });

    return grouped;
  });

  // ========================================
  // Methods
  // ========================================

  /**
   * Get items for a specific column
   */
  getColumnItems(columnId: string): any[] {
    return this.groupedItems().get(columnId) || [];
  }

  /**
   * Get item count for a column
   */
  getColumnCount(columnId: string): number {
    return this.getColumnItems(columnId).length;
  }

  /**
   * Get card title from item
   */
  getCardTitle(item: any): string {
    return item[this.cardConfig().titleField] || '';
  }

  /**
   * Get card subtitle from item
   */
  getCardSubtitle(item: any): string | undefined {
    const field = this.cardConfig().subtitleField;
    return field ? item[field] : undefined;
  }

  /**
   * Get card description from item
   */
  getCardDescription(item: any): string | undefined {
    const field = this.cardConfig().descriptionField;
    return field ? item[field] : undefined;
  }

  /**
   * Get card progress from item
   */
  getCardProgress(item: any): number | undefined {
    const field = this.cardConfig().progressField;
    return field ? item[field] : undefined;
  }

  /**
   * Get card badge from item
   */
  getCardBadge(item: any): KanbanCardBadge | undefined {
    const config = this.cardConfig();
    if (!config.badgeField) return undefined;

    const value = item[config.badgeField];
    if (!value) return undefined;

    const variant = config.badgeVariantMap?.[value] || 'neutral';
    return { label: value, variant };
  }

  /**
   * Get meta info from item (e.g., "3 days in stage")
   */
  getCardMetaInfo(item: any): string | undefined {
    const config = this.cardConfig();

    // Use custom function if provided
    if (config.metaInfoFn) {
      return config.metaInfoFn(item);
    }

    // Use field if provided
    if (config.metaInfoField) {
      return item[config.metaInfoField];
    }

    return undefined;
  }

  /**
   * Handle card drag start
   */
  onCardDragStart(item: any, columnId: string): void {
    this.draggedItem.set(item);
    this.draggedFromColumn.set(columnId);
  }

  /**
   * Handle card drag end
   */
  onCardDragEnd(): void {
    this.draggedItem.set(null);
    this.draggedFromColumn.set('');
  }

  /**
   * Handle item dropped in column
   */
  onItemDropped(event: KanbanDropEvent): void {
    const fromColumn = this.draggedFromColumn();
    const toColumn = event.columnId;

    // Only emit if column changed
    if (fromColumn && fromColumn !== toColumn) {
      this.itemMoved.emit({
        item: event.item,
        fromColumn,
        toColumn
      });
    }

    // Reset drag state
    this.draggedItem.set(null);
    this.draggedFromColumn.set('');
  }

  /**
   * Handle card click
   */
  onCardClick(item: any): void {
    this.itemClicked.emit(item);
  }

  /**
   * Track function for columns
   */
  trackColumn(index: number, column: KanbanColumn): string {
    return column.id;
  }

  /**
   * Track function for items
   */
  trackItem(index: number, item: any): any {
    return item.id || index;
  }

  // ========================================
  // Lifecycle Hooks
  // ========================================

  ngAfterViewInit(): void {
    this.setupScrollObserver();
    // Initial scroll check
    setTimeout(() => this.updateScrollIndicators(), 100);
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  // ========================================
  // Scroll Navigation
  // ========================================

  /**
   * Set up observer to track scroll state
   */
  private setupScrollObserver(): void {
    if (this.boardContainer?.nativeElement) {
      this.resizeObserver = new ResizeObserver(() => {
        this.updateScrollIndicators();
      });
      this.resizeObserver.observe(this.boardContainer.nativeElement);
    }
  }

  /**
   * Update scroll indicator states
   */
  updateScrollIndicators(): void {
    const container = this.boardContainer?.nativeElement;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    this.canScrollLeft.set(scrollLeft > 0);
    this.canScrollRight.set(scrollLeft + clientWidth < scrollWidth - 1);
  }

  /**
   * Scroll the board left
   */
  scrollLeft(): void {
    const container = this.boardContainer?.nativeElement;
    if (!container) return;

    container.scrollBy({ left: -300, behavior: 'smooth' });
  }

  /**
   * Scroll the board right
   */
  scrollRight(): void {
    const container = this.boardContainer?.nativeElement;
    if (!container) return;

    container.scrollBy({ left: 300, behavior: 'smooth' });
  }

  /**
   * Handle scroll event
   */
  onScroll(): void {
    this.updateScrollIndicators();
  }

  // ========================================
  // Column Collapse
  // ========================================

  /**
   * Toggle column collapsed state
   */
  toggleColumnCollapse(columnId: string): void {
    const collapsed = new Set(this.collapsedColumns());
    if (collapsed.has(columnId)) {
      collapsed.delete(columnId);
    } else {
      collapsed.add(columnId);
    }
    this.collapsedColumns.set(collapsed);
  }

  /**
   * Check if a column is collapsed
   */
  isColumnCollapsed(columnId: string): boolean {
    return this.collapsedColumns().has(columnId);
  }

  /**
   * Check if a column should auto-collapse (empty columns)
   */
  shouldAutoCollapse(columnId: string): boolean {
    return this.getColumnCount(columnId) === 0 && !this.collapsedColumns().has(columnId);
  }
}
