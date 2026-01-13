import { Component, input, output, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * List item interface
 */
export interface ListItem {
  id: string | number;
  title: string;
  subtitle?: string;
  description?: string;
  icon?: string;
  avatar?: string;
  badge?: string;
  badgeType?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  metadata?: Record<string, any>;
  disabled?: boolean;
}

/**
 * List configuration
 */
export interface ListConfig {
  variant?: 'simple' | 'detailed' | 'card' | 'compact';
  selectable?: boolean;
  hoverable?: boolean;
  dividers?: boolean;
  showSearch?: boolean;
  searchPlaceholder?: string;
  emptyMessage?: string;
}

/**
 * List Component
 *
 * A flexible list component for displaying collections of items with
 * search/filter functionality, multiple variants, and item selection.
 *
 * Features:
 * - Multiple variants (simple, detailed, card, compact)
 * - Search and filter functionality
 * - Item selection support
 * - Hover states
 * - Icons, avatars, and badges
 * - Empty states
 * - Fully responsive
 * - Accessible with ARIA support
 *
 * @example
 * ```html
 * <app-list
 *   [items]="users()"
 *   [config]="{variant: 'detailed', selectable: true, showSearch: true}"
 *   (itemClick)="onUserClick($event)"
 *   (itemsSelected)="onUsersSelected($event)">
 * </app-list>
 * ```
 */
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  // ========================================
  // Inputs
  // ========================================

  /** List items */
  items = input.required<ListItem[]>();

  /** List configuration */
  config = input<ListConfig>({
    variant: 'simple',
    selectable: false,
    hoverable: true,
    dividers: true,
    showSearch: false,
    searchPlaceholder: 'Search...',
    emptyMessage: 'No items found'
  });

  // ========================================
  // Outputs
  // ========================================

  /** Emitted when an item is clicked */
  itemClick = output<ListItem>();

  /** Emitted when selected items change */
  itemsSelected = output<ListItem[]>();

  // ========================================
  // State
  // ========================================

  /** Search query */
  searchQuery = signal('');

  /** Selected item IDs */
  private selectedIds = signal<Set<string | number>>(new Set());

  // ========================================
  // Computed Properties
  // ========================================

  /**
   * Filtered items based on search query
   */
  readonly filteredItems = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) {
      return this.items();
    }

    return this.items().filter(item => {
      const searchableText = [
        item.title,
        item.subtitle,
        item.description,
        item.badge
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return searchableText.includes(query);
    });
  });

  /**
   * Selected items
   */
  readonly selectedItems = computed(() => {
    const ids = this.selectedIds();
    return this.items().filter(item => ids.has(item.id));
  });

  // ========================================
  // Methods
  // ========================================

  /**
   * Handle item click
   */
  onItemClick(item: ListItem): void {
    if (item.disabled) {
      return;
    }

    const cfg = this.config();

    if (cfg.selectable) {
      this.toggleSelection(item.id);
    }

    this.itemClick.emit(item);
  }

  /**
   * Toggle item selection
   */
  private toggleSelection(id: string | number): void {
    this.selectedIds.update(ids => {
      const newSet = new Set(ids);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });

    this.itemsSelected.emit(this.selectedItems());
  }

  /**
   * Check if item is selected
   */
  isSelected(id: string | number): boolean {
    return this.selectedIds().has(id);
  }

  /**
   * Handle search input
   */
  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  /**
   * Clear search
   */
  clearSearch(): void {
    this.searchQuery.set('');
  }

  /**
   * Get list container classes
   */
  getListClasses(): string {
    const cfg = this.config();
    const classes = ['list'];

    classes.push(`list-variant-${cfg.variant || 'simple'}`);

    if (cfg.dividers) {
      classes.push('list-dividers');
    }

    if (cfg.hoverable) {
      classes.push('list-hoverable');
    }

    if (cfg.selectable) {
      classes.push('list-selectable');
    }

    return classes.join(' ');
  }

  /**
   * Get list item classes
   */
  getItemClasses(item: ListItem): string {
    const classes = ['list-item'];

    if (this.isSelected(item.id)) {
      classes.push('list-item-selected');
    }

    if (item.disabled) {
      classes.push('list-item-disabled');
    }

    return classes.join(' ');
  }

  /**
   * Get badge color class
   */
  getBadgeClass(type?: string): string {
    return `badge badge-${type || 'neutral'}`;
  }
}
