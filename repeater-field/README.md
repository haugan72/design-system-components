# Repeater Field Component

A dynamic form component that allows users to add/remove multiple items of the same type (e.g., existing loans, income sources, family members).

## Features

- ✅ **Dynamic Items**: Add/remove items with min/max constraints
- ✅ **Flexible Fields**: Support for multiple field types (text, number, currency, select, etc.)
- ✅ **Norwegian Currency**: Built-in currency formatting with "kr" suffix
- ✅ **Validation Ready**: Error display for each field
- ✅ **Accessible**: WCAG AA compliant with ARIA labels
- ✅ **Responsive**: Mobile-optimized layout (1 column → 2 columns)
- ✅ **State Management**: Uses Angular Signals for reactivity

## Usage

### Basic Example

```typescript
import { RepeaterFieldComponent, RepeaterConfig, RepeaterItem } from '@shared/components/repeater-field';

@Component({
  selector: 'app-loan-form',
  standalone: true,
  imports: [RepeaterFieldComponent],
  template: `
    <app-repeater-field
      [config]="loanConfig"
      [items]="existingLoans()"
      label="Eksisterende boliglån"
      (itemsChange)="onLoansChange($event)"
      (itemAdded)="onLoanAdded($event)"
      (itemRemoved)="onLoanRemoved($event)"
    />
  `
})
export class LoanFormComponent {
  existingLoans = signal<RepeaterItem[]>([]);

  loanConfig: RepeaterConfig = {
    itemLabel: 'Boliglån',
    addButtonLabel: 'Legg til boliglån',
    removeButtonLabel: 'Fjern',
    minItems: 0,
    maxItems: 5,
    itemFields: [
      {
        fieldName: 'lender',
        label: 'Långiver',
        type: 'text',
        required: false,
        placeholder: 'f.eks. DNB'
      },
      {
        fieldName: 'outstandingBalance',
        label: 'Restgjeld',
        type: 'currency',
        required: true,
        currency: 'kr',
        currencyPosition: 'suffix',
        decimals: 0
      },
      {
        fieldName: 'monthlyPayment',
        label: 'Månedlig betaling',
        type: 'currency',
        required: true,
        currency: 'kr',
        currencyPosition: 'suffix',
        decimals: 0
      },
      {
        fieldName: 'interestRate',
        label: 'Rentesats',
        type: 'number',
        required: false,
        placeholder: '0.00',
        decimals: 2,
        min: 0,
        max: 100
      }
    ]
  };

  onLoansChange(items: RepeaterItem[]): void {
    this.existingLoans.set(items);
  }

  onLoanAdded(item: RepeaterItem): void {
    console.log('Loan added:', item);
  }

  onLoanRemoved(event: { item: RepeaterItem; index: number }): void {
    console.log('Loan removed:', event);
  }
}
```

### Income Sources Example

```typescript
incomeConfig: RepeaterConfig = {
  itemLabel: 'Inntektskilde',
  addButtonLabel: 'Legg til inntekt',
  minItems: 1, // At least one income required
  maxItems: 3,
  itemFields: [
    {
      fieldName: 'source',
      label: 'Kilde',
      type: 'select',
      required: true,
      options: [
        { label: 'Lønn', value: 'salary' },
        { label: 'Næring', value: 'business' },
        { label: 'Pensjon', value: 'pension' },
        { label: 'Annet', value: 'other' }
      ]
    },
    {
      fieldName: 'monthlyAmount',
      label: 'Månedlig beløp',
      type: 'currency',
      required: true,
      currency: 'kr',
      decimals: 0
    },
    {
      fieldName: 'isPrimary',
      label: 'Hovedinntekt',
      type: 'checkbox',
      required: false
    }
  ]
};
```

### Family Members Example

```typescript
familyConfig: RepeaterConfig = {
  itemLabel: 'Familiemedlem',
  addButtonLabel: 'Legg til person',
  removeButtonLabel: 'Fjern',
  itemFields: [
    {
      fieldName: 'name',
      label: 'Navn',
      type: 'text',
      required: true
    },
    {
      fieldName: 'relation',
      label: 'Relasjon',
      type: 'select',
      required: true,
      options: [
        { label: 'Ektefelle', value: 'spouse' },
        { label: 'Barn', value: 'child' },
        { label: 'Forelder', value: 'parent' }
      ]
    },
    {
      fieldName: 'birthdate',
      label: 'Fødselsdato',
      type: 'date',
      required: true
    }
  ]
};
```

## API

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `config` | `RepeaterConfig` | *required* | Configuration for the repeater |
| `items` | `RepeaterItem[]` | `[]` | Current items in the repeater |
| `label` | `string` | `undefined` | Label for the entire repeater section |
| `disabled` | `boolean` | `false` | Whether the repeater is disabled |
| `readonly` | `boolean` | `false` | Whether the repeater is readonly |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `itemsChange` | `RepeaterItem[]` | Emitted when items change |
| `itemAdded` | `RepeaterItem` | Emitted when an item is added |
| `itemRemoved` | `{ item: RepeaterItem; index: number }` | Emitted when an item is removed |
| `fieldValueChanged` | `{ itemId: string; fieldName: string; value: any }` | Emitted when a field value changes |

## Types

### RepeaterConfig

```typescript
interface RepeaterConfig {
  itemFields: RepeaterFieldConfig[];
  minItems?: number;
  maxItems?: number;
  addButtonLabel?: string;
  removeButtonLabel?: string;
  itemLabel?: string;
}
```

### RepeaterFieldConfig

```typescript
interface RepeaterFieldConfig {
  fieldName: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'url' | 'number' | 'date' |
        'textarea' | 'select' | 'checkbox' | 'currency';
  required?: boolean;
  placeholder?: string;
  options?: Array<{ label: string; value: string | number }>;
  currency?: string;
  currencyPosition?: 'prefix' | 'suffix';
  decimals?: number;
  min?: number;
  max?: number;
}
```

### RepeaterItem

```typescript
interface RepeaterItem {
  id: string;
  values: Record<string, any>;
  errors?: Record<string, string>;
}
```

## Field Types Supported

| Type | Description | Example |
|------|-------------|---------|
| `text` | Basic text input | Name, address |
| `email` | Email input with validation | user@example.com |
| `tel` | Telephone input | +47 123 45 678 |
| `url` | URL input | https://example.com |
| `number` | Numeric input | Age, quantity |
| `currency` | Currency with formatting | 1 234 567 kr |
| `date` | Date picker | 2024-01-13 |
| `textarea` | Multi-line text | Comments, notes |
| `select` | Dropdown selection | Country, category |
| `checkbox` | Boolean toggle | Yes/no, true/false |

## Currency Formatting

The `currency` field type automatically formats Norwegian currency:

- **Input**: `2500000`
- **Display**: `2 500 000 kr`
- **Stored**: `2500000` (number)

### Currency Configuration

```typescript
{
  fieldName: 'amount',
  label: 'Amount',
  type: 'currency',
  currency: 'kr',           // Symbol to display
  currencyPosition: 'suffix', // 'prefix' or 'suffix'
  decimals: 0,              // Number of decimal places
  min: 0,                   // Minimum value
  max: 10000000            // Maximum value
}
```

## Validation

You can set errors programmatically:

```typescript
onLoansChange(items: RepeaterItem[]): void {
  const validatedItems = items.map(item => {
    const errors: Record<string, string> = {};

    if (!item.values.lender) {
      errors.lender = 'Långiver er påkrevd';
    }

    if (item.values.outstandingBalance <= 0) {
      errors.outstandingBalance = 'Restgjeld må være større enn 0';
    }

    return { ...item, errors };
  });

  this.existingLoans.set(validatedItems);
}
```

## Min/Max Items

Control how many items can be added:

```typescript
{
  minItems: 1,  // User cannot remove below this
  maxItems: 5,  // "Add" button disabled after this
  // ...
}
```

## Styling

The component uses Design System A tokens:

```css
--color-primary: #6366F1 (buttons, focus)
--color-danger: #EF4444 (remove, errors)
--color-border: #E5E7EB (borders)
--space-*: Consistent spacing
--radius-md: 12px border radius
```

### Custom Styling

Override component styles:

```css
.repeater-item {
  /* Your custom item styles */
}

.repeater-add-btn {
  /* Your custom button styles */
}
```

## Responsive Behavior

- **Mobile (<768px)**: Single column layout
- **Tablet/Desktop (≥768px)**: Two column grid
- **Touch Friendly**: Proper spacing and button sizes

## Accessibility

- ✅ Semantic HTML structure
- ✅ ARIA labels for all interactive elements
- ✅ Keyboard navigation support
- ✅ Focus visible states
- ✅ Error announcements via `role="alert"`
- ✅ Screen reader friendly labels
- ✅ High contrast mode support
- ✅ Reduced motion support

## Integration with Forms

### Reactive Forms

```typescript
import { FormArray, FormGroup, FormControl } from '@angular/forms';

formArray = new FormArray([]);

onLoansChange(items: RepeaterItem[]): void {
  this.formArray.clear();
  items.forEach(item => {
    this.formArray.push(new FormGroup({
      lender: new FormControl(item.values.lender),
      outstandingBalance: new FormControl(item.values.outstandingBalance),
      // ...
    }));
  });
}
```

### Template-Driven Forms

```html
<form #myForm="ngForm">
  <app-repeater-field
    [config]="config"
    [items]="items()"
    (itemsChange)="onItemsChange($event)"
  />
</form>
```

## Performance

- Uses `trackBy` for efficient rendering
- Signals-based reactivity for minimal re-renders
- Lazy validation on blur/change

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires Angular 17+ (Signals support)

## Related Components

- [Currency Input](../currency-input/) - Standalone currency field
- [Text Input](../text-input/) - General text input
- [Form Group](../form-group/) - Form layout wrapper

## License

Part of the shared component library - Design System A
