# Using Currency Input and Repeater Field in toneTapp

This guide shows how to integrate the new **Currency Input** and **Repeater Field** components from the shared component library into your toneTapp application.

## Installation

Since these components are in your shared component library at `/Users/knuthaugan/DevProjects/shared/design-systems/components/`, you'll need to import them into your toneTapp app.

## 1. Currency Input Component

### Import the Component

```typescript
// In your toneTapp component or form
import { CurrencyInputComponent } from '@shared/design-systems/components/currency-input';

@Component({
  selector: 'app-loan-form',
  standalone: true,
  imports: [CurrencyInputComponent],
  // ...
})
```

### Basic Usage

```html
<!-- Simple currency input -->
<app-currency-input
  [(value)]="loanAmount"
  label="Lånebeløp"
  [required]="true"
  currency="kr"
  placeholder="0"
/>
```

### With Validation

```typescript
import { signal, computed } from '@angular/core';

export class LoanFormComponent {
  loanAmount = signal<number | null>(null);

  loanAmountError = computed(() => {
    const amount = this.loanAmount();
    if (amount === null) return 'Lånebeløp er påkrevd';
    if (amount < 100000) return 'Minimum lånebeløp er 100 000 kr';
    if (amount > 10000000) return 'Maksimum lånebeløp er 10 000 000 kr';
    return undefined;
  });
}
```

```html
<app-currency-input
  [(value)]="loanAmount"
  label="Lånebeløp"
  [required]="true"
  [min]="100000"
  [max]="10000000"
  currency="kr"
  [error]="loanAmountError()"
  helpText="Skriv inn ønsket lånebeløp"
/>
```

### Examples for toneTapp

#### Monthly Income
```html
<app-currency-input
  [(value)]="monthlyIncome"
  label="Månedlig inntekt"
  [required]="true"
  currency="kr"
  placeholder="0"
  helpText="Inkluder all inntekt før skatt"
/>
```

#### Property Value
```html
<app-currency-input
  [(value)]="propertyValue"
  label="Boligverdi"
  [required]="true"
  currency="kr"
  placeholder="0"
  helpText="Takst eller markedsverdi"
/>
```

#### Interest Rate
```html
<app-currency-input
  [(value)]="interestRate"
  label="Rentesats"
  [decimals]="2"
  currency="%"
  currencyPosition="suffix"
  placeholder="0.00"
  helpText="Effektiv rente p.a."
/>
```

## 2. Repeater Field Component

### Import the Component

```typescript
import { RepeaterFieldComponent, type RepeaterConfig, type RepeaterItem } from '@shared/design-systems/components/repeater-field';

@Component({
  selector: 'app-loan-form',
  standalone: true,
  imports: [RepeaterFieldComponent],
  // ...
})
```

### Configuration Example: Existing Mortgages

```typescript
export class LoanFormComponent {
  existingMortgages = signal<RepeaterItem[]>([]);

  mortgageConfig: RepeaterConfig = {
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
        placeholder: 'f.eks. DNB, Nordea'
      },
      {
        fieldName: 'outstandingBalance',
        label: 'Restgjeld',
        type: 'currency',
        required: true,
        currency: 'kr',
        currencyPosition: 'suffix',
        decimals: 0,
        min: 0
      },
      {
        fieldName: 'monthlyPayment',
        label: 'Månedlig betaling',
        type: 'currency',
        required: true,
        currency: 'kr',
        currencyPosition: 'suffix',
        decimals: 0,
        min: 0
      },
      {
        fieldName: 'interestRate',
        label: 'Rentesats (%)',
        type: 'number',
        required: false,
        placeholder: '0.00',
        decimals: 2,
        min: 0,
        max: 100
      }
    ]
  };

  onMortgagesChange(items: RepeaterItem[]): void {
    this.existingMortgages.set(items);
    console.log('Mortgages updated:', items);
  }
}
```

### Template

```html
<app-repeater-field
  [config]="mortgageConfig"
  [items]="existingMortgages()"
  label="Eksisterende boliglån"
  (itemsChange)="onMortgagesChange($event)"
/>
```

### Configuration Example: Income Sources

```typescript
incomeSourcesConfig: RepeaterConfig = {
  itemLabel: 'Inntektskilde',
  addButtonLabel: 'Legg til inntekt',
  removeButtonLabel: 'Fjern',
  minItems: 1, // At least one income required
  maxItems: 3,
  itemFields: [
    {
      fieldName: 'type',
      label: 'Type inntekt',
      type: 'select',
      required: true,
      options: [
        { label: 'Lønn', value: 'salary' },
        { label: 'Næringsinntekt', value: 'business' },
        { label: 'Pensjon', value: 'pension' },
        { label: 'Leieinntekt', value: 'rental' },
        { label: 'Annet', value: 'other' }
      ]
    },
    {
      fieldName: 'monthlyAmount',
      label: 'Månedlig beløp',
      type: 'currency',
      required: true,
      currency: 'kr',
      currencyPosition: 'suffix',
      decimals: 0,
      min: 0
    },
    {
      fieldName: 'description',
      label: 'Beskrivelse',
      type: 'textarea',
      required: false,
      placeholder: 'Tilleggsinformasjon...'
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

### Configuration Example: Other Loans

```typescript
otherLoansConfig: RepeaterConfig = {
  itemLabel: 'Lån',
  addButtonLabel: 'Legg til lån',
  removeButtonLabel: 'Fjern',
  minItems: 0,
  maxItems: 10,
  itemFields: [
    {
      fieldName: 'loanType',
      label: 'Lånetype',
      type: 'select',
      required: true,
      options: [
        { label: 'Billån', value: 'car' },
        { label: 'Kredittkort', value: 'credit_card' },
        { label: 'Forbrukslån', value: 'consumer' },
        { label: 'Studielån', value: 'student' },
        { label: 'Annet', value: 'other' }
      ]
    },
    {
      fieldName: 'lender',
      label: 'Långiver',
      type: 'text',
      required: false,
      placeholder: 'Bank eller kredittselskap'
    },
    {
      fieldName: 'outstandingBalance',
      label: 'Restgjeld',
      type: 'currency',
      required: true,
      currency: 'kr',
      decimals: 0
    },
    {
      fieldName: 'monthlyPayment',
      label: 'Månedlig betaling',
      type: 'currency',
      required: true,
      currency: 'kr',
      decimals: 0
    }
  ]
};
```

## 3. Integration with toneTapp Workflow Model

To integrate with your existing `workflow.model.ts`, you can extend the `FieldType`:

### Update workflow.model.ts

```typescript
// Add to FieldType
export type FieldType =
  | 'text'
  | 'email'
  | 'tel'
  | 'url'
  | 'number'
  | 'date'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'currency'    // ← New
  | 'repeater';   // ← New

// Add repeater configuration interface
export interface RepeaterFieldConfig {
  itemFields: WorkflowField[];
  minItems?: number;
  maxItems?: number;
  addButtonLabel?: string;
  removeButtonLabel?: string;
  itemLabel?: string;
}

// Extend WorkflowField
export interface WorkflowField {
  fieldName: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: Array<{ label: string; value: string | number }>;

  // For currency fields
  currency?: string;
  currencyPosition?: 'prefix' | 'suffix';
  decimals?: number;

  // For repeater fields
  repeaterConfig?: RepeaterFieldConfig;

  // For number/currency validation
  min?: number;
  max?: number;
}
```

### Example JSON Configuration

```json
{
  "stageId": "financial-info",
  "title": "Financial Information",
  "fields": [
    {
      "fieldName": "monthlyIncome",
      "label": "Månedlig inntekt",
      "type": "currency",
      "required": true,
      "currency": "kr",
      "currencyPosition": "suffix",
      "decimals": 0,
      "min": 0
    },
    {
      "fieldName": "existingMortgages",
      "label": "Eksisterende boliglån",
      "type": "repeater",
      "required": false,
      "repeaterConfig": {
        "itemLabel": "Boliglån",
        "addButtonLabel": "Legg til boliglån",
        "minItems": 0,
        "maxItems": 5,
        "itemFields": [
          {
            "fieldName": "lender",
            "label": "Långiver",
            "type": "text"
          },
          {
            "fieldName": "outstandingBalance",
            "label": "Restgjeld",
            "type": "currency",
            "required": true,
            "currency": "kr"
          }
        ]
      }
    }
  ]
}
```

## 4. Using in DynamicFormFieldComponent

Update your `DynamicFormFieldComponent` to handle the new field types:

```typescript
// Import the components
import { CurrencyInputComponent } from '@shared/design-systems/components/currency-input';
import { RepeaterFieldComponent } from '@shared/design-systems/components/repeater-field';

@Component({
  selector: 'app-dynamic-form-field',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CurrencyInputComponent,
    RepeaterFieldComponent
  ],
  // ...
})
```

### In the template

```html
<!-- Currency Field -->
@if (field.type === 'currency') {
  <app-currency-input
    [(value)]="currencyValue"
    [label]="field.label"
    [required]="field.required || false"
    [currency]="field.currency || 'kr'"
    [currencyPosition]="field.currencyPosition || 'suffix'"
    [decimals]="field.decimals || 0"
    [min]="field.min"
    [max]="field.max"
    [placeholder]="field.placeholder || '0'"
    [error]="fieldError()"
    (valueChange)="onCurrencyChange($event)"
  />
}

<!-- Repeater Field -->
@if (field.type === 'repeater' && field.repeaterConfig) {
  <app-repeater-field
    [config]="field.repeaterConfig"
    [items]="repeaterItems()"
    [label]="field.label"
    (itemsChange)="onRepeaterChange($event)"
  />
}
```

## 5. Data Handling

### Currency Values
- **Stored as**: `number` (e.g., `2500000`)
- **Displayed as**: `"2 500 000 kr"`
- **User inputs**: `"2500000"` or `"2 500 000"`

### Repeater Items
- **Stored as**: `RepeaterItem[]`
- **Structure**:
  ```typescript
  {
    id: "item-123",
    values: {
      lender: "DNB",
      outstandingBalance: 2500000,
      monthlyPayment: 12500
    }
  }
  ```

## 6. Complete Example

Here's a complete example integrating both components in toneTapp:

```typescript
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyInputComponent } from '@shared/design-systems/components/currency-input';
import { RepeaterFieldComponent, type RepeaterConfig, type RepeaterItem } from '@shared/design-systems/components/repeater-field';

@Component({
  selector: 'app-loan-application-form',
  standalone: true,
  imports: [CommonModule, CurrencyInputComponent, RepeaterFieldComponent],
  template: `
    <div class="form-container">
      <h2>Lånesøknad</h2>

      <!-- Currency Inputs -->
      <app-currency-input
        [(value)]="desiredLoanAmount"
        label="Ønsket lånebeløp"
        [required]="true"
        currency="kr"
        [min]="100000"
        [max]="10000000"
      />

      <app-currency-input
        [(value)]="monthlyIncome"
        label="Månedlig inntekt"
        [required]="true"
        currency="kr"
      />

      <!-- Repeater for Existing Mortgages -->
      <app-repeater-field
        [config]="mortgageConfig"
        [items]="existingMortgages()"
        label="Eksisterende boliglån"
        (itemsChange)="existingMortgages.set($event)"
      />

      <button (click)="submitForm()">Send søknad</button>
    </div>
  `
})
export class LoanApplicationFormComponent {
  desiredLoanAmount = signal<number | null>(null);
  monthlyIncome = signal<number | null>(null);
  existingMortgages = signal<RepeaterItem[]>([]);

  mortgageConfig: RepeaterConfig = {
    itemLabel: 'Boliglån',
    addButtonLabel: 'Legg til boliglån',
    minItems: 0,
    maxItems: 5,
    itemFields: [
      {
        fieldName: 'lender',
        label: 'Långiver',
        type: 'text'
      },
      {
        fieldName: 'balance',
        label: 'Restgjeld',
        type: 'currency',
        required: true,
        currency: 'kr'
      }
    ]
  };

  submitForm(): void {
    const formData = {
      desiredLoanAmount: this.desiredLoanAmount(),
      monthlyIncome: this.monthlyIncome(),
      existingMortgages: this.existingMortgages().map(item => item.values)
    };

    console.log('Form data:', formData);
    // Send to API...
  }
}
```

## 7. Path Configuration

If you need to configure path aliases in your toneTapp `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@shared/*": ["../../../shared/*"]
    }
  }
}
```

Then import like this:
```typescript
import { CurrencyInputComponent } from '@shared/design-systems/components/currency-input';
```

## 8. Testing the Components

You can view and test these components in the Component Gallery:

```bash
# If your component gallery is set up as a standalone app
cd /Users/knuthaugan/DevProjects/shared/design-systems/components
npm start
```

Then navigate to the gallery and filter by "Forms" category to see both components in action.

## Summary

✅ **Currency Input** - Ready to use for all monetary values
✅ **Repeater Field** - Ready to use for dynamic arrays of data
✅ **Norwegian Formatting** - Built-in space-separated thousands
✅ **Fully Typed** - TypeScript interfaces included
✅ **Accessible** - WCAG AA compliant
✅ **Responsive** - Works on all devices
✅ **Design System A** - Consistent styling

Both components are now available in your shared component library and can be used across all your applications!
