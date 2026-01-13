# Radio Button Component

A customizable radio button component with label, validation states, and full accessibility support for selecting one option from a group.

## Features

- ✅ Custom styled radio button (18x18px)
- ✅ Label support with required indicator
- ✅ Validation states (error, required)
- ✅ Help text and error messages
- ✅ Two-way data binding with model()
- ✅ Disabled state
- ✅ Keyboard navigation (Enter, Space)
- ✅ WCAG AA accessible
- ✅ TypeScript with Angular Signals

## Installation

```typescript
import { RadioComponent } from './components/radio';

@Component({
  standalone: true,
  imports: [RadioComponent],
  // ...
})
```

## Basic Usage

```html
<app-radio
  [value]="'option1'"
  [(selectedValue)]="selected"
  name="choice"
  label="Option 1">
</app-radio>

<app-radio
  [value]="'option2'"
  [(selectedValue)]="selected"
  name="choice"
  label="Option 2">
</app-radio>
```

## API Reference

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `value` | `any` | **required** | Value this radio represents |
| `selectedValue` | `any` (model) | `null` | Currently selected value (two-way binding) |
| `label` | `string` | - | Label text |
| `name` | `string` | **required** | Radio group name |
| `disabled` | `boolean` | `false` | Disabled state |
| `required` | `boolean` | `false` | Show required indicator |
| `error` | `string` | - | Error message |
| `helpText` | `string` | - | Help text below radio |
| `id` | `string` | auto-generated | Unique ID |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `changed` | `EventEmitter<any>` | Emitted when radio is selected |

## Dependencies

- Angular 19+ with Signals
- No external UI libraries required
- Uses CSS variables for theming
