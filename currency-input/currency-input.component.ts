import { Component, input, output, model, computed, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

export type CurrencyInputState = 'default' | 'error' | 'success';

/**
 * Currency Input Component
 *
 * A specialized input field for currency values with Norwegian formatting.
 * - Displays values with space-separated thousands (1 234 567)
 * - Allows configurable currency symbol (default: 'kr')
 * - Stores raw numeric values internally
 * - Supports validation and error states
 *
 * @example
 * ```html
 * <app-currency-input
 *   [(value)]="amount"
 *   label="Loan Amount"
 *   [required]="true"
 *   currency="kr"
 *   placeholder="0"
 * />
 * ```
 */
@Component({
  selector: 'app-currency-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './currency-input.component.html',
  styleUrl: './currency-input.component.css'
})
export class CurrencyInputComponent {
  // Inputs
  /** The numeric value (two-way binding) */
  value = model<number | null>(null);

  /** Label text for the input */
  label = input.required<string>();

  /** Placeholder text when empty */
  placeholder = input<string>('0');

  /** Whether the field is disabled */
  disabled = input<boolean>(false);

  /** Whether the field is readonly */
  readonly = input<boolean>(false);

  /** Whether the field is required */
  required = input<boolean>(false);

  /** Error message to display */
  error = input<string>();

  /** Help text displayed below input */
  helpText = input<string>();

  /** Minimum allowed value */
  min = input<number>();

  /** Maximum allowed value */
  max = input<number>();

  /** Currency symbol (default: 'kr') */
  currency = input<string>('kr');

  /** Position of currency symbol */
  currencyPosition = input<'prefix' | 'suffix'>('suffix');

  /** Allow negative values */
  allowNegative = input<boolean>(false);

  /** Number of decimal places (0 for integers only) */
  decimals = input<number>(0);

  /** Unique ID for the input */
  id = input<string>(`currency-input-${Math.random().toString(36).substr(2, 9)}`);

  // Outputs
  valueChange = output<number | null>();
  focused = output<void>();
  blurred = output<void>();

  // Internal Signals
  /** The formatted display value (with spaces) */
  private displayValue = signal<string>('');

  /** Whether the input is currently focused */
  private isFocused = signal<boolean>(false);

  // Computed Properties
  readonly state = computed<CurrencyInputState>(() => {
    if (this.error()) return 'error';
    if (this.value() !== null && !this.error()) return 'success';
    return 'default';
  });

  readonly containerClasses = computed(() => {
    const classes: string[] = ['currency-input-container'];
    if (this.disabled()) classes.push('currency-input-disabled');
    if (this.readonly()) classes.push('currency-input-readonly');
    return classes.join(' ');
  });

  readonly inputClasses = computed(() => {
    const classes: string[] = ['currency-input'];
    classes.push(`currency-input-${this.state()}`);
    if (this.isFocused()) classes.push('currency-input-focused');
    return classes.join(' ');
  });

  readonly showPrefix = computed(() => this.currencyPosition() === 'prefix');
  readonly showSuffix = computed(() => this.currencyPosition() === 'suffix');

  constructor() {
    // Initialize display value when component value changes
    effect(() => {
      const val = this.value();
      if (val !== null && !this.isFocused()) {
        this.displayValue.set(this.formatForDisplay(val));
      } else if (val === null) {
        this.displayValue.set('');
      }
    });
  }

  /**
   * Format a number for display with Norwegian thousand separators
   * Example: 1234567 -> "1 234 567"
   */
  private formatForDisplay(value: number): string {
    if (value === null || value === undefined) return '';

    const decimals = this.decimals();
    const fixed = value.toFixed(decimals);
    const [integerPart, decimalPart] = fixed.split('.');

    // Add space thousand separators
    const formatted = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    return decimals > 0 ? `${formatted},${decimalPart}` : formatted;
  }

  /**
   * Parse user input and extract numeric value
   * Removes spaces and handles Norwegian decimal comma
   */
  private parseInput(input: string): number | null {
    if (!input || input.trim() === '') return null;

    // Remove spaces (thousand separators) and convert comma to dot
    const cleaned = input.replace(/\s/g, '').replace(',', '.');

    // Remove any non-numeric characters except minus and dot
    const numeric = cleaned.replace(/[^\d.-]/g, '');

    if (numeric === '' || numeric === '-') return null;

    const parsed = parseFloat(numeric);

    if (isNaN(parsed)) return null;

    // Apply constraints
    if (!this.allowNegative() && parsed < 0) return null;

    const min = this.min();
    const max = this.max();

    if (min !== undefined && parsed < min) return min;
    if (max !== undefined && parsed > max) return max;

    return parsed;
  }

  /**
   * Handle input events - allow only valid characters
   */
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Allow only numbers, spaces, minus (if allowed), and comma/dot for decimals
    const allowedChars = this.allowNegative()
      ? /[0-9\s,.-]/g
      : /[0-9\s,.]/g;

    const filtered = value.match(allowedChars)?.join('') || '';

    if (filtered !== value) {
      input.value = filtered;
      value = filtered;
    }

    this.displayValue.set(value);
  }

  /**
   * Handle focus event
   */
  onFocus(): void {
    this.isFocused.set(true);

    // When focused, show unformatted value for easier editing
    const val = this.value();
    if (val !== null) {
      const decimals = this.decimals();
      this.displayValue.set(decimals > 0 ? val.toFixed(decimals).replace('.', ',') : val.toString());
    }

    this.focused.emit();
  }

  /**
   * Handle blur event - parse and format the value
   */
  onBlur(): void {
    this.isFocused.set(false);

    const input = this.displayValue();
    const parsed = this.parseInput(input);

    // Update the model value
    this.value.set(parsed);
    this.valueChange.emit(parsed);

    // Update display with formatted value
    if (parsed !== null) {
      this.displayValue.set(this.formatForDisplay(parsed));
    } else {
      this.displayValue.set('');
    }

    this.blurred.emit();
  }

  /**
   * Get the current display value for the template
   */
  getDisplayValue(): string {
    return this.displayValue();
  }
}
