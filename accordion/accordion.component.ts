import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Accordion item interface
 */
export interface AccordionItem {
  id: string | number;
  title: string;
  content: string;
  icon?: string;
  badge?: string;
  badgeType?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  disabled?: boolean;
  expanded?: boolean;
}

/**
 * Accordion configuration
 */
export interface AccordionConfig {
  allowMultiple?: boolean;
  bordered?: boolean;
  separated?: boolean;
  animated?: boolean;
}

/**
 * Accordion Component
 *
 * A flexible accordion component for collapsible content sections with
 * expand/collapse functionality and customizable styling.
 *
 * Features:
 * - Single or multiple open items
 * - Smooth animations
 * - Icons and badges
 * - Bordered or separated variants
 * - Disabled items
 * - Keyboard accessible
 * - ARIA compliant
 *
 * @example
 * ```html
 * <app-accordion
 *   [items]="faqItems()"
 *   [config]="{allowMultiple: false, animated: true}"
 *   (itemToggle)="onToggle($event)">
 * </app-accordion>
 * ```
 */
@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.css'
})
export class AccordionComponent {
  // ========================================
  // Inputs
  // ========================================

  /** Accordion items */
  items = input.required<AccordionItem[]>();

  /** Accordion configuration */
  config = input<AccordionConfig>({
    allowMultiple: false,
    bordered: true,
    separated: false,
    animated: true
  });

  // ========================================
  // Outputs
  // ========================================

  /** Emitted when an item is toggled */
  itemToggle = output<AccordionItem>();

  /** Emitted when expanded items change */
  expandedChange = output<AccordionItem[]>();

  // ========================================
  // State
  // ========================================

  /** Set of expanded item IDs */
  private expandedIds = signal<Set<string | number>>(new Set());

  // ========================================
  // Lifecycle
  // ========================================

  constructor() {
    // Initialize expanded state from items
    const initialExpanded = this.items()
      ?.filter(item => item.expanded)
      .map(item => item.id) || [];

    if (initialExpanded.length > 0) {
      this.expandedIds.set(new Set(initialExpanded));
    }
  }

  // ========================================
  // Methods
  // ========================================

  /**
   * Check if item is expanded
   */
  isExpanded(id: string | number): boolean {
    return this.expandedIds().has(id);
  }

  /**
   * Toggle item expansion
   */
  toggleItem(item: AccordionItem): void {
    if (item.disabled) {
      return;
    }

    const cfg = this.config();
    const isCurrentlyExpanded = this.isExpanded(item.id);

    this.expandedIds.update(ids => {
      const newSet = new Set(ids);

      if (isCurrentlyExpanded) {
        // Collapse the item
        newSet.delete(item.id);
      } else {
        // Expand the item
        if (!cfg.allowMultiple) {
          // Single mode: close all other items
          newSet.clear();
        }
        newSet.add(item.id);
      }

      return newSet;
    });

    this.itemToggle.emit(item);
    this.emitExpandedItems();
  }

  /**
   * Emit currently expanded items
   */
  private emitExpandedItems(): void {
    const expanded = this.items().filter(item => this.isExpanded(item.id));
    this.expandedChange.emit(expanded);
  }

  /**
   * Get accordion container classes
   */
  getAccordionClasses(): string {
    const cfg = this.config();
    const classes = ['accordion'];

    if (cfg.bordered) {
      classes.push('accordion-bordered');
    }

    if (cfg.separated) {
      classes.push('accordion-separated');
    }

    if (cfg.animated) {
      classes.push('accordion-animated');
    }

    return classes.join(' ');
  }

  /**
   * Get accordion item classes
   */
  getItemClasses(item: AccordionItem): string {
    const classes = ['accordion-item'];

    if (this.isExpanded(item.id)) {
      classes.push('accordion-item-expanded');
    }

    if (item.disabled) {
      classes.push('accordion-item-disabled');
    }

    return classes.join(' ');
  }

  /**
   * Get badge class
   */
  getBadgeClass(type?: string): string {
    return `badge badge-${type || 'neutral'}`;
  }

  /**
   * Handle keyboard navigation
   */
  onKeyDown(event: KeyboardEvent, item: AccordionItem): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggleItem(item);
    }
  }
}
