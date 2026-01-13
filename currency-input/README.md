# Currency Input Component

A specialized input component for currency values with Norwegian formatting (space-separated thousands).

## Features

- ✅ **Norwegian Formatting**: Displays values as "1 234 567" with space separators
- ✅ **Configurable Currency**: Support for any currency symbol (default: "kr")
- ✅ **Flexible Positioning**: Currency symbol can be prefix or suffix
- ✅ **Decimal Support**: Configurable decimal places (0 for integers)
- ✅ **Smart Validation**: Min/max values, negative numbers optional
- ✅ **Accessible**: WCAG AA compliant with ARIA labels and keyboard support
- ✅ **Responsive**: Mobile-optimized with proper input modes
- ✅ **State Management**: Uses Angular Signals for reactivity

## Usage

### Basic Example

```typescript
import { CurrencyInputComponent } from '@shared/components/currency-input';

@Component({
  selector: 'app-my-form',
  standalone: true,
  imports: [CurrencyInputComponent],
  template: `
    <app-currency-input
      [(value)]="loanAmount"
      label="Loan Amount"
      [required]="true"
      currency="kr"
      placeholder="0"
    />
  `
})
export class MyFormComponent {
  loanAmount = signal<number | null>(null);
}
```

### Advanced Example

```html
<!-- With validation and help text -->
<app-currency-input
  [(value)]="monthlyIncome"
  label="Monthly Income"
  [required]="true"
  [min]="0"
  [max]="1000000"
  currency="kr"
  currencyPosition="suffix"
  placeholder="Enter your monthly income"
  helpText="Include all sources of income"
  [error]="incomeError()"
  (valueChange)="onIncomeChange($event)"
/>

<!-- With decimals (for interest rates, etc.) -->
<app-currency-input
  [(value)]="interestRate"
  label="Interest Rate"
  [decimals]="2"
  currency="%"
  currencyPosition="suffix"
  [allowNegative]="false"
  placeholder="0.00"
/>

<!-- Euros with prefix -->
<app-currency-input
  [(value)]="price"
  label="Price"
  currency="€"
  currencyPosition="prefix"
  [decimals]="2"
/>
```

## API

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `value` | `number \| null` | `null` | The numeric value (two-way binding with `model()`) |
| `label` | `string` | *required* | Label text for the input |
| `placeholder` | `string` | `'0'` | Placeholder text when empty |
| `disabled` | `boolean` | `false` | Whether the field is disabled |
| `readonly` | `boolean` | `false` | Whether the field is readonly |
| `required` | `boolean` | `false` | Whether the field is required |
| `error` | `string` | `undefined` | Error message to display |
| `helpText` | `string` | `undefined` | Help text displayed below input |
| `min` | `number` | `undefined` | Minimum allowed value |
| `max` | `number` | `undefined` | Maximum allowed value |
| `currency` | `string` | `'kr'` | Currency symbol to display |
| `currencyPosition` | `'prefix' \| 'suffix'` | `'suffix'` | Position of currency symbol |
| `allowNegative` | `boolean` | `false` | Allow negative values |
| `decimals` | `number` | `0` | Number of decimal places (0 for integers only) |
| `id` | `string` | *auto-generated* | Unique ID for the input element |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `valueChange` | `number \| null` | Emitted when the value changes |
| `focused` | `void` | Emitted when the input receives focus |
| `blurred` | `void` | Emitted when the input loses focus |

## Formatting Behavior

### Display Format
- **Thousands**: Space separator (1 234 567)
- **Decimals**: Comma separator (1 234,50)
- **On Focus**: Shows unformatted value for easy editing
- **On Blur**: Applies formatting automatically

### Input Handling
- Only allows numeric characters, spaces, comma, and dot
- Automatically removes invalid characters
- Converts comma to dot for decimal parsing
- Applies min/max constraints automatically

## Examples

### Norwegian Currency (NOK)
```typescript
// Input: "2500000"
// Display: "2 500 000 kr"
// Stored: 2500000

<app-currency-input
  [(value)]="amount"
  label="Beløp"
  currency="kr"
/>
```

### With Decimals
```typescript
// Input: "12345,67"
// Display: "12 345,67 kr"
// Stored: 12345.67

<app-currency-input
  [(value)]="amount"
  label="Pris"
  [decimals]="2"
  currency="kr"
/>
```

### Interest Rate
```typescript
// Input: "4,5"
// Display: "4,50 %"
// Stored: 4.5

<app-currency-input
  [(value)]="rate"
  label="Rente"
  [decimals]="2"
  currency="%"
  currencyPosition="suffix"
/>
```

## Accessibility

- ✅ Semantic HTML with proper `<label>` and `<input>` elements
- ✅ ARIA labels and descriptions for screen readers
- ✅ Error announcements via `role="alert"`
- ✅ Keyboard navigation support
- ✅ Focus visible states for keyboard users
- ✅ High contrast mode support
- ✅ Reduced motion support
- ✅ Mobile-optimized with `inputmode="decimal"`

## Styling

The component uses Design System A tokens for consistent styling:

```css
--color-primary: #6366F1 (focus border)
--color-success: #10B981 (success state)
--color-danger: #EF4444 (error state)
--color-border: #E5E7EB (default border)
--space-*: Consistent spacing scale
--radius-md: 12px border radius
```

### Custom Styling

You can override styles using CSS custom properties or by targeting component classes:

```css
.currency-input {
  /* Your custom styles */
}
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires Angular 17+ (Signals support)

## Related Components

- [Text Input](../text-input/) - General text input component
- [Form Group](../form-group/) - Form layout component
- [Repeater Field](../repeater-field/) - For multiple currency inputs

## License

Part of the shared component library - Design System A
