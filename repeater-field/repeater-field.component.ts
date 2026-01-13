import { Component, input, output, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Configuration for a single field within a repeater item
 */
export interface RepeaterFieldConfig {
  /** Unique field identifier */
  fieldName: string;
  /** Display label */
  label: string;
  /** Field type */
  type: 'text' | 'email' | 'tel' | 'url' | 'number' | 'date' | 'textarea' | 'select' | 'checkbox' | 'currency';
  /** Whether the field is required */
  required?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Options for select fields */
  options?: Array<{ label: string; value: string | number }>;
  /** Currency symbol (for currency type) */
  currency?: string;
  /** Currency position (for currency type) */
  currencyPosition?: 'prefix' | 'suffix';
  /** Decimal places (for currency/number type) */
  decimals?: number;
  /** Minimum value (for number/currency type) */
  min?: number;
  /** Maximum value (for number/currency type) */
  max?: number;
}

/**
 * Configuration for the repeater field component
 */
export interface RepeaterConfig {
  /** Field configurations for each item */
  itemFields: RepeaterFieldConfig[];
  /** Minimum required items */
  minItems?: number;
  /** Maximum allowed items */
  maxItems?: number;
  /** Label for add button */
  addButtonLabel?: string;
  /** Label for remove button */
  removeButtonLabel?: string;
  /** Label for each item (e.g., "Loan", "Income") */
  itemLabel?: string;
}

/**
 * Represents a single item in the repeater
 */
export interface RepeaterItem {
  /** Unique identifier for this item */
  id: string;
  /** Field values for this item */
  values: Record<string, any>;
  /** Validation errors for this item */
  errors?: Record<string, string>;
}

/**
 * Repeater Field Component
 *
 * A dynamic form component that allows users to add/remove multiple items
 * of the same type (e.g., loans, income sources, etc.).
 *
 * @example
 * ```html
 * <app-repeater-field
 *   [config]="loanRepeaterConfig"
 *   [items]="existingLoans()"
 *   (itemsChange)="onLoansChange($event)"
 *   (itemAdded)="onLoanAdded($event)"
 *   (itemRemoved)="onLoanRemoved($event)"
 * />
 * ```
 */
@Component({
  selector: 'app-repeater-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './repeater-field.component.html',
  styleUrl: './repeater-field.component.css'
})
export class RepeaterFieldComponent {
  // Inputs
  /** Configuration for the repeater */
  config = input.required<RepeaterConfig>();

  /** Current items in the repeater */
  items = input<RepeaterItem[]>([]);

  /** Label for the entire repeater section */
  label = input<string>();

  /** Whether the repeater is disabled */
  disabled = input<boolean>(false);

  /** Whether the repeater is readonly */
  readonly = input<boolean>(false);

  // Outputs
  /** Emitted when items change */
  itemsChange = output<RepeaterItem[]>();

  /** Emitted when an item is added */
  itemAdded = output<RepeaterItem>();

  /** Emitted when an item is removed */
  itemRemoved = output<{ item: RepeaterItem; index: number }>();

  /** Emitted when a field value changes */
  fieldValueChanged = output<{ itemId: string; fieldName: string; value: any }>();

  // Internal Signals
  private internalItems = signal<RepeaterItem[]>([]);

  // Computed Properties
  readonly canAddItem = computed(() => {
    const cfg = this.config();
    const currentCount = this.internalItems().length;
    const maxItems = cfg.maxItems;

    return !this.disabled() && !this.readonly() && (maxItems === undefined || currentCount < maxItems);
  });

  readonly addButtonText = computed(() => {
    return this.config().addButtonLabel || 'Add Item';
  });

  readonly removeButtonText = computed(() => {
    return this.config().removeButtonLabel || 'Remove';
  });

  readonly itemLabelText = computed(() => {
    return this.config().itemLabel || 'Item';
  });

  constructor() {
    // Initialize internal items from input
    this.internalItems.set(this.items() || []);
  }

  /**
   * Add a new item to the repeater
   */
  addItem(): void {
    if (!this.canAddItem()) return;

    const newItem: RepeaterItem = {
      id: this.generateId(),
      values: this.createEmptyValues(),
      errors: {}
    };

    const updatedItems = [...this.internalItems(), newItem];
    this.internalItems.set(updatedItems);
    this.itemsChange.emit(updatedItems);
    this.itemAdded.emit(newItem);
  }

  /**
   * Remove an item from the repeater
   */
  removeItem(index: number): void {
    if (this.disabled() || this.readonly()) return;

    const items = this.internalItems();
    const cfg = this.config();

    // Check minimum items constraint
    if (cfg.minItems !== undefined && items.length <= cfg.minItems) {
      return;
    }

    const removedItem = items[index];
    const updatedItems = items.filter((_, i) => i !== index);

    this.internalItems.set(updatedItems);
    this.itemsChange.emit(updatedItems);
    this.itemRemoved.emit({ item: removedItem, index });
  }

  /**
   * Check if an item can be removed
   */
  canRemoveItem(index: number): boolean {
    const cfg = this.config();
    const currentCount = this.internalItems().length;
    const minItems = cfg.minItems || 0;

    return !this.disabled() && !this.readonly() && currentCount > minItems;
  }

  /**
   * Update a field value within an item
   */
  updateFieldValue(itemId: string, fieldName: string, value: any): void {
    const items = this.internalItems();
    const updatedItems = items.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          values: {
            ...item.values,
            [fieldName]: value
          }
        };
      }
      return item;
    });

    this.internalItems.set(updatedItems);
    this.itemsChange.emit(updatedItems);
    this.fieldValueChanged.emit({ itemId, fieldName, value });
  }

  /**
   * Get the value of a field for a specific item
   */
  getFieldValue(item: RepeaterItem, fieldName: string): any {
    return item.values[fieldName];
  }

  /**
   * Get the error message for a field in a specific item
   */
  getFieldError(item: RepeaterItem, fieldName: string): string | undefined {
    return item.errors?.[fieldName];
  }

  /**
   * Get all items (for template access)
   */
  getItems(): RepeaterItem[] {
    return this.internalItems();
  }

  /**
   * Generate a unique ID for a new item
   */
  private generateId(): string {
    return `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Create empty values object based on field config
   */
  private createEmptyValues(): Record<string, any> {
    const values: Record<string, any> = {};
    const fields = this.config().itemFields;

    fields.forEach(field => {
      switch (field.type) {
        case 'checkbox':
          values[field.fieldName] = false;
          break;
        case 'number':
        case 'currency':
          values[field.fieldName] = null;
          break;
        default:
          values[field.fieldName] = '';
      }
    });

    return values;
  }

  /**
   * Track items by ID for performance
   */
  trackByItemId(index: number, item: RepeaterItem): string {
    return item.id;
  }

  /**
   * Handle input change for a field
   */
  onFieldInput(event: Event, item: RepeaterItem, field: RepeaterFieldConfig): void {
    const input = event.target as HTMLInputElement;
    let value: any = input.value;

    // Convert value based on field type
    if (field.type === 'number' || field.type === 'currency') {
      value = this.parseNumericValue(value);
    } else if (field.type === 'checkbox') {
      value = input.checked;
    }

    this.updateFieldValue(item.id, field.fieldName, value);
  }

  /**
   * Parse numeric input value
   */
  private parseNumericValue(value: string): number | null {
    if (!value || value.trim() === '') return null;

    // Remove spaces and convert comma to dot
    const cleaned = value.replace(/\s/g, '').replace(',', '.');
    const parsed = parseFloat(cleaned);

    return isNaN(parsed) ? null : parsed;
  }

  /**
   * Format numeric value for display
   */
  formatNumericValue(value: number | null, decimals: number = 0): string {
    if (value === null || value === undefined) return '';

    const fixed = value.toFixed(decimals);
    const [integerPart, decimalPart] = fixed.split('.');

    // Add space thousand separators
    const formatted = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    return decimals > 0 ? `${formatted},${decimalPart}` : formatted;
  }
}
