import { Component, signal, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Column definition for the data table
 */
export interface TableColumn<T = any> {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  formatter?: (value: any, row: T) => string;
}

/**
 * Sort direction
 */
export type SortDirection = 'asc' | 'desc' | null;

/**
 * Sort state
 */
export interface SortState {
  column: string;
  direction: SortDirection;
}

/**
 * Table configuration
 */
export interface TableConfig {
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  compact?: boolean;
  stickyHeader?: boolean;
}

/**
 * Data Table Component
 *
 * A professional, feature-rich table component with sorting, filtering, pagination,
 * and row selection. Built with Angular Signals and modern best practices.
 *
 * @example
 * ```html
 * <app-data-table
 *   [data]="users()"
 *   [columns]="columns"
 *   [config]="{striped: true, hoverable: true}"
 *   [loading]="isLoading()"
 *   (rowClick)="onRowClick($event)"
 *   (sortChange)="onSortChange($event)">
 * </app-data-table>
 * ```
 */
@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})
export class DataTableComponent<T = any> {
  // ========================================
  // Inputs
  // ========================================

  /** Table data */
  data = input.required<T[]>();

  /** Column definitions */
  columns = input.required<TableColumn<T>[]>();

  /** Table configuration */
  config = input<TableConfig>({
    striped: true,
    hoverable: true,
    bordered: false,
    compact: false,
    stickyHeader: false
  });

  /** Loading state */
  loading = input<boolean>(false);

  /** Error message */
  error = input<string>();

  /** Enable row selection */
  selectable = input<boolean>(false);

  /** Selected rows */
  selectedRows = input<T[]>([]);

  /** Empty state message */
  emptyMessage = input<string>('No data available');

  /** Page size for pagination */
  pageSize = input<number>(10);

  /** Current page (0-indexed) */
  currentPage = input<number>(0);

  // ========================================
  // Outputs
  // ========================================

  /** Emitted when a row is clicked */
  rowClick = output<T>();

  /** Emitted when sort changes */
  sortChange = output<SortState>();

  /** Emitted when selection changes */
  selectionChange = output<T[]>();

  /** Emitted when page changes */
  pageChange = output<number>();

  // ========================================
  // Internal State
  // ========================================

  /** Current sort state */
  readonly sortState = signal<SortState>({ column: '', direction: null });

  /** Internal selected rows */
  readonly internalSelection = signal<Set<T>>(new Set());

  // ========================================
  // Computed Properties
  // ========================================

  /** Sorted data */
  readonly sortedData = computed(() => {
    const data = [...this.data()];
    const sort = this.sortState();

    if (!sort.column || !sort.direction) {
      return data;
    }

    return data.sort((a: any, b: any) => {
      const aVal = a[sort.column];
      const bVal = b[sort.column];

      if (aVal === bVal) return 0;

      const comparison = aVal > bVal ? 1 : -1;
      return sort.direction === 'asc' ? comparison : -comparison;
    });
  });

  /** Paginated data */
  readonly paginatedData = computed(() => {
    const sorted = this.sortedData();
    const pageSize = this.pageSize();
    const page = this.currentPage();

    if (pageSize === 0) return sorted;

    const start = page * pageSize;
    const end = start + pageSize;
    return sorted.slice(start, end);
  });

  /** Total pages */
  readonly totalPages = computed(() => {
    const pageSize = this.pageSize();
    if (pageSize === 0) return 1;
    return Math.ceil(this.data().length / pageSize);
  });

  /** Is all rows selected */
  readonly allSelected = computed(() => {
    const data = this.paginatedData();
    const selection = this.internalSelection();
    return data.length > 0 && data.every(row => selection.has(row));
  });

  /** Is some rows selected */
  readonly someSelected = computed(() => {
    const data = this.paginatedData();
    const selection = this.internalSelection();
    const selectedCount = data.filter(row => selection.has(row)).length;
    return selectedCount > 0 && selectedCount < data.length;
  });

  // ========================================
  // Methods
  // ========================================

  /**
   * Handle column header click for sorting
   */
  onColumnClick(column: TableColumn<T>): void {
    if (!column.sortable) return;

    const current = this.sortState();
    let newDirection: SortDirection = 'asc';

    if (current.column === column.key) {
      if (current.direction === 'asc') {
        newDirection = 'desc';
      } else if (current.direction === 'desc') {
        newDirection = null;
      }
    }

    const newState: SortState = {
      column: newDirection ? column.key : '',
      direction: newDirection
    };

    this.sortState.set(newState);
    this.sortChange.emit(newState);
  }

  /**
   * Get sort icon for column
   */
  getSortIcon(column: TableColumn<T>): string {
    if (!column.sortable) return '';

    const sort = this.sortState();
    if (sort.column !== column.key) return '↕';

    return sort.direction === 'asc' ? '↑' : '↓';
  }

  /**
   * Handle row click
   */
  onRowClick(row: T, event: Event): void {
    if ((event.target as HTMLElement).tagName === 'INPUT') return;
    this.rowClick.emit(row);
  }

  /**
   * Toggle row selection
   */
  toggleRowSelection(row: T): void {
    const selection = new Set(this.internalSelection());

    if (selection.has(row)) {
      selection.delete(row);
    } else {
      selection.add(row);
    }

    this.internalSelection.set(selection);
    this.selectionChange.emit(Array.from(selection));
  }

  /**
   * Toggle all rows selection
   */
  toggleAllSelection(): void {
    const selection = new Set(this.internalSelection());
    const data = this.paginatedData();

    if (this.allSelected()) {
      data.forEach(row => selection.delete(row));
    } else {
      data.forEach(row => selection.add(row));
    }

    this.internalSelection.set(selection);
    this.selectionChange.emit(Array.from(selection));
  }

  /**
   * Check if row is selected
   */
  isRowSelected(row: T): boolean {
    return this.internalSelection().has(row);
  }

  /**
   * Get cell value
   */
  getCellValue(row: T, column: TableColumn<T>): string {
    const value = (row as any)[column.key];

    if (column.formatter) {
      return column.formatter(value, row);
    }

    return value != null ? String(value) : '';
  }

  /**
   * Go to page
   */
  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages()) {
      this.pageChange.emit(page);
    }
  }

  /**
   * Next page
   */
  nextPage(): void {
    this.goToPage(this.currentPage() + 1);
  }

  /**
   * Previous page
   */
  previousPage(): void {
    this.goToPage(this.currentPage() - 1);
  }
}
