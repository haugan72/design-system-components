import { Component, signal, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Sidebar navigation item interface
 */
export interface SidebarItem {
  id: string;
  label: string;
  href?: string;
  icon?: string;
  active?: boolean;
  disabled?: boolean;
  badge?: string | number;
  badgeType?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  children?: SidebarItem[];
  expanded?: boolean;
}

/**
 * Configuration for the sidebar
 */
export interface SidebarConfig {
  /** Start collapsed */
  collapsed?: boolean;
  /** Allow collapsing */
  collapsible?: boolean;
  /** Width when expanded (px) */
  width?: number;
  /** Width when collapsed (px) */
  collapsedWidth?: number;
  /** Show footer */
  showFooter?: boolean;
  /** Theme variant */
  theme?: 'light' | 'dark';
}

/**
 * World-class Sidebar Navigation Component
 *
 * A professional, accessible, and feature-rich sidebar navigation with
 * collapsible sub-items, badges, and responsive behavior.
 *
 * @example
 * ```html
 * <app-sidebar
 *   [items]="sidebarItems"
 *   [config]="{collapsible: true, collapsed: false}"
 *   (itemClick)="onSidebarItemClick($event)"
 *   (collapseToggle)="onCollapseToggle($event)">
 * </app-sidebar>
 * ```
 */
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  // ========================================
  // Inputs
  // ========================================

  /** Sidebar navigation items */
  items = input<SidebarItem[]>([]);

  /** Header content (logo/title) */
  header = input<string>();

  /** Footer content */
  footer = input<string>();

  /** Component configuration */
  config = input<SidebarConfig>({
    collapsed: false,
    collapsible: true,
    width: 260,
    collapsedWidth: 60,
    showFooter: true,
    theme: 'light'
  });

  // ========================================
  // Outputs
  // ========================================

  /** Emitted when an item is clicked */
  itemClick = output<SidebarItem>();

  /** Emitted when collapse state changes */
  collapseToggle = output<boolean>();

  // ========================================
  // Signals
  // ========================================

  /** Collapsed state */
  private collapsed = signal<boolean>(false);

  /** Expanded items (by ID) */
  private expandedItems = signal<Set<string>>(new Set());

  /** Active item ID */
  private activeItemId = signal<string | null>(null);

  // ========================================
  // Computed Properties
  // ========================================

  /** Check if sidebar is collapsed */
  readonly isCollapsed = computed(() => this.collapsed());

  /** Get sidebar width */
  readonly sidebarWidth = computed(() => {
    const cfg = this.config();
    return this.isCollapsed()
      ? `${cfg.collapsedWidth || 60}px`
      : `${cfg.width || 260}px`;
  });

  /** Get theme class */
  readonly themeClass = computed(() => `sidebar-theme-${this.config().theme || 'light'}`);

  /** Check if item is expanded */
  isItemExpanded(itemId: string): boolean {
    return this.expandedItems().has(itemId);
  }

  /** Check if item is active */
  isItemActive(itemId: string): boolean {
    return this.activeItemId() === itemId;
  }

  // ========================================
  // Lifecycle
  // ========================================

  constructor() {
    // Initialize collapsed state from config
    const cfg = this.config();
    if (cfg.collapsed) {
      this.collapsed.set(true);
    }

    // Set initial active item and expanded parents
    this.initializeActiveState();
  }

  // ========================================
  // Methods
  // ========================================

  /**
   * Initialize active state from items
   */
  private initializeActiveState(): void {
    const findActiveItem = (items: SidebarItem[], parentIds: string[] = []): void => {
      for (const item of items) {
        if (item.active) {
          this.activeItemId.set(item.id);
          // Expand all parent items
          parentIds.forEach(parentId => {
            this.expandedItems.update(set => {
              set.add(parentId);
              return new Set(set);
            });
          });
        }
        if (item.children) {
          findActiveItem(item.children, [...parentIds, item.id]);
        }
      }
    };

    findActiveItem(this.items());
  }

  /**
   * Toggle sidebar collapse
   */
  toggleCollapse(): void {
    this.collapsed.update(collapsed => {
      const newState = !collapsed;
      this.collapseToggle.emit(newState);
      return newState;
    });
  }

  /**
   * Toggle item expansion
   */
  toggleExpand(item: SidebarItem, event: Event): void {
    event.stopPropagation();

    if (!item.children || item.children.length === 0) {
      return;
    }

    // If sidebar is collapsed, expand it first
    if (this.isCollapsed()) {
      this.toggleCollapse();
    }

    this.expandedItems.update(set => {
      if (set.has(item.id)) {
        set.delete(item.id);
      } else {
        set.add(item.id);
      }
      return new Set(set);
    });
  }

  /**
   * Handle item click
   */
  onItemClick(item: SidebarItem, event: Event): void {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    // If item has children, toggle expansion
    if (item.children && item.children.length > 0) {
      this.toggleExpand(item, event);
      return;
    }

    // Set active item
    this.activeItemId.set(item.id);

    // Emit event
    this.itemClick.emit(item);
  }

  /**
   * Get badge variant class
   */
  getBadgeClass(type?: string): string {
    return `sidebar-badge-${type || 'primary'}`;
  }

  /**
   * Check if item has children
   */
  hasChildren(item: SidebarItem): boolean {
    return !!(item.children && item.children.length > 0);
  }

  /**
   * Get item nesting level for indentation
   */
  getItemLevel(level: number = 0): string {
    if (this.isCollapsed()) return '0px';
    return `${level * 16}px`;
  }

  /**
   * Handle keyboard navigation
   */
  onKeyDown(event: KeyboardEvent, item: SidebarItem): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onItemClick(item, event);
    } else if (event.key === 'ArrowRight' && this.hasChildren(item)) {
      event.preventDefault();
      if (!this.isItemExpanded(item.id)) {
        this.toggleExpand(item, event);
      }
    } else if (event.key === 'ArrowLeft' && this.hasChildren(item)) {
      event.preventDefault();
      if (this.isItemExpanded(item.id)) {
        this.toggleExpand(item, event);
      }
    }
  }
}
