# Checkbox Component

A customizable checkbox component with label, validation states, indeterminate state, and full accessibility support.

## Features

- ✅ Custom styled checkbox (18x18px)
- ✅ Label support with required indicator
- ✅ Indeterminate state (for "select all" scenarios)
- ✅ Validation states (error, required)
- ✅ Help text and error messages
- ✅ Two-way data binding with model()
- ✅ Disabled state
- ✅ Keyboard navigation (Enter, Space)
- ✅ WCAG AA accessible
- ✅ TypeScript with Angular Signals

## Installation

```typescript
import { CheckboxComponent } from './components/checkbox';

@Component({
  standalone: true,
  imports: [CheckboxComponent],
  // ...
})
```

## Basic Usage

```html
<app-checkbox
  [(checked)]="isAgreed"
  label="I agree to the terms">
</app-checkbox>
```

## Examples

### Simple Checkbox
```html
<app-checkbox
  [(checked)]="acceptTerms"
  label="Accept terms and conditions"
  [required]="true">
</app-checkbox>
```

### With Help Text
```html
<app-checkbox
  [(checked)]="subscribe"
  label="Subscribe to newsletter"
  helpText="Receive updates about new features">
</app-checkbox>
```

### With Error
```html
<app-checkbox
  [(checked)]="agreed"
  label="I agree"
  [required]="true"
  [error]="agreedError">
</app-checkbox>
```

### Disabled
```html
<app-checkbox
  [checked]="true"
  label="Cannot be changed"
  [disabled]="true">
</app-checkbox>
```

### Indeterminate State
```html
<app-checkbox
  [(checked)]="allSelected"
  [indeterminate]="someSelected"
  label="Select all"
  (changed)="onSelectAll($event)">
</app-checkbox>
```

## API Reference

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `checked` | `boolean` (model) | `false` | Checkbox state (two-way binding) |
| `label` | `string` | - | Label text |
| `disabled` | `boolean` | `false` | Disabled state |
| `indeterminate` | `boolean` | `false` | Indeterminate state |
| `required` | `boolean` | `false` | Show required indicator |
| `error` | `string` | - | Error message |
| `helpText` | `string` | - | Help text below checkbox |
| `id` | `string` | auto-generated | Unique ID |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `changed` | `EventEmitter<boolean>` | Emitted when checkbox state changes |

## Dependencies

- Angular 19+ with Signals
- No external UI libraries required
- Uses CSS variables for theming
