# Text Input Component

A comprehensive text input component with validation states, icons, character counting, clear button, and password visibility toggle.

## Features

- ✅ Multiple input types (text, email, password, number, tel, url)
- ✅ Validation states (default, error, success)
- ✅ Prefix and suffix icons
- ✅ Clear button
- ✅ Password visibility toggle
- ✅ Character counter with max length
- ✅ Help text and error messages
- ✅ Two-way data binding with model()
- ✅ Disabled and readonly states
- ✅ Required field indicator
- ✅ WCAG AA accessible
- ✅ TypeScript with Angular Signals

## Installation

```typescript
import { TextInputComponent } from './components/text-input';

@Component({
  standalone: true,
  imports: [TextInputComponent],
  // ...
})
```

## Basic Usage

```html
<app-text-input
  label="Email Address"
  [(value)]="email"
  type="email"
  placeholder="your@email.com">
</app-text-input>
```

## Input Types

### Text (Default)
```html
<app-text-input
  label="Full Name"
  [(value)]="fullName"
  type="text">
</app-text-input>
```

### Email
```html
<app-text-input
  label="Email"
  [(value)]="email"
  type="email"
  [required]="true">
</app-text-input>
```

### Password
```html
<app-text-input
  label="Password"
  [(value)]="password"
  type="password"
  helpText="Must be at least 8 characters">
</app-text-input>
```

### Number
```html
<app-text-input
  label="Age"
  [(value)]="age"
  type="number">
</app-text-input>
```

### Telephone
```html
<app-text-input
  label="Phone Number"
  [(value)]="phone"
  type="tel">
</app-text-input>
```

### URL
```html
<app-text-input
  label="Website"
  [(value)]="website"
  type="url"
  placeholder="https://example.com">
</app-text-input>
```

## Validation States

### Error State
```html
<app-text-input
  label="Username"
  [(value)]="username"
  [error]="usernameError">
</app-text-input>
```

```typescript
export class FormComponent {
  username = '';
  usernameError = '';

  validateUsername(): void {
    if (this.username.length < 3) {
      this.usernameError = 'Username must be at least 3 characters';
    } else {
      this.usernameError = '';
    }
  }
}
```

### Success State
Success state is automatically applied when the input has a value and no error.

```html
<app-text-input
  label="Email"
  [(value)]="email">
</app-text-input>
<!-- Shows green border when email has value and no error -->
```

## Icons

### Prefix Icon
```html
<app-text-input
  label="Search"
  [(value)]="search"
  prefixIcon="🔍"
  placeholder="Search...">
</app-text-input>
```

### Suffix Icon
```html
<app-text-input
  label="Email"
  [(value)]="email"
  type="email"
  suffixIcon="✓">
</app-text-input>
```

### Both Icons
```html
<app-text-input
  label="Amount"
  [(value)]="amount"
  type="number"
  prefixIcon="$"
  suffixIcon=".00">
</app-text-input>
```

## Features

### Clear Button
```html
<app-text-input
  label="Search Query"
  [(value)]="query"
  [showClearButton]="true"
  (cleared)="onCleared()">
</app-text-input>
```

### Character Counter
```html
<app-text-input
  label="Bio"
  [(value)]="bio"
  [maxLength]="160"
  [showCharacterCount]="true"
  helpText="Brief description">
</app-text-input>
```

### Help Text
```html
<app-text-input
  label="Password"
  [(value)]="password"
  type="password"
  helpText="Must include letters, numbers, and special characters">
</app-text-input>
```

### Required Field
```html
<app-text-input
  label="Full Name"
  [(value)]="name"
  [required]="true">
</app-text-input>
<!-- Shows red asterisk next to label -->
```

### Disabled State
```html
<app-text-input
  label="Read Only Field"
  [value]="'Cannot edit'"
  [disabled]="true">
</app-text-input>
```

### Readonly State
```html
<app-text-input
  label="Display Field"
  [value]="displayValue"
  [readonly]="true">
</app-text-input>
```

## API Reference

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `value` | `string` (model) | `''` | Input value (two-way binding) |
| `type` | `'text' \| 'email' \| 'password' \| 'number' \| 'tel' \| 'url'` | `'text'` | Input type |
| `label` | `string` | **required** | Label text |
| `placeholder` | `string` | - | Placeholder text |
| `disabled` | `boolean` | `false` | Disabled state |
| `readonly` | `boolean` | `false` | Readonly state |
| `required` | `boolean` | `false` | Show required indicator |
| `error` | `string` | - | Error message (shows error state) |
| `helpText` | `string` | - | Help text below input |
| `maxLength` | `number` | - | Maximum character length |
| `minLength` | `number` | - | Minimum character length |
| `pattern` | `string` | - | Validation pattern (regex) |
| `autocomplete` | `string` | - | Autocomplete attribute |
| `prefixIcon` | `string` | - | Icon before input |
| `suffixIcon` | `string` | - | Icon after input |
| `showClearButton` | `boolean` | `false` | Show clear button when has value |
| `showCharacterCount` | `boolean` | `false` | Show character counter |
| `id` | `string` | auto-generated | Unique ID for input element |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `valueChange` | `EventEmitter<string>` | Emitted when value changes |
| `focused` | `EventEmitter<void>` | Emitted when input receives focus |
| `blurred` | `EventEmitter<void>` | Emitted when input loses focus |
| `cleared` | `EventEmitter<void>` | Emitted when clear button clicked |

## Examples

### Login Form
```html
<form (submit)="login()">
  <app-text-input
    label="Email"
    [(value)]="credentials.email"
    type="email"
    [required]="true"
    [error]="emailError"
    prefixIcon="📧"
    autocomplete="email">
  </app-text-input>

  <app-text-input
    label="Password"
    [(value)]="credentials.password"
    type="password"
    [required]="true"
    [error]="passwordError"
    prefixIcon="🔒"
    autocomplete="current-password">
  </app-text-input>

  <button type="submit">Sign In</button>
</form>
```

### Search with Clear
```html
<app-text-input
  label="Search Products"
  [(value)]="searchQuery"
  prefixIcon="🔍"
  [showClearButton]="true"
  placeholder="Search..."
  (valueChange)="onSearch($event)"
  (cleared)="clearSearch()">
</app-text-input>
```

### Profile Form
```html
<app-text-input
  label="Full Name"
  [(value)]="profile.name"
  [required]="true"
  [error]="nameError"
  [maxLength]="50"
  [showCharacterCount]="true">
</app-text-input>

<app-text-input
  label="Bio"
  [(value)]="profile.bio"
  [maxLength]="160"
  [showCharacterCount]="true"
  helpText="Tell us about yourself">
</app-text-input>

<app-text-input
  label="Website"
  [(value)]="profile.website"
  type="url"
  prefixIcon="🌐"
  placeholder="https://example.com">
</app-text-input>
```

### Validation Example
```html
<app-text-input
  label="Username"
  [(value)]="username"
  [required]="true"
  [error]="usernameError"
  [minLength]="3"
  [maxLength]="20"
  [showCharacterCount]="true"
  helpText="3-20 characters, letters and numbers only"
  (blurred)="validateUsername()">
</app-text-input>
```

```typescript
export class FormComponent {
  username = '';
  usernameError = '';

  validateUsername(): void {
    if (!this.username) {
      this.usernameError = 'Username is required';
    } else if (this.username.length < 3) {
      this.usernameError = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9]+$/.test(this.username)) {
      this.usernameError = 'Username can only contain letters and numbers';
    } else {
      this.usernameError = '';
    }
  }
}
```

### Real-time Validation
```html
<app-text-input
  label="Email"
  [(value)]="email"
  type="email"
  [required]="true"
  [error]="emailError"
  (valueChange)="validateEmail($event)">
</app-text-input>
```

```typescript
export class SignupComponent {
  email = '';
  emailError = '';

  validateEmail(value: string): void {
    if (!value) {
      this.emailError = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      this.emailError = 'Please enter a valid email address';
    } else {
      this.emailError = '';
    }
  }
}
```

### Contact Form
```html
<app-text-input
  label="Name"
  [(value)]="contact.name"
  [required]="true"
  prefixIcon="👤">
</app-text-input>

<app-text-input
  label="Email"
  [(value)]="contact.email"
  type="email"
  [required]="true"
  prefixIcon="📧">
</app-text-input>

<app-text-input
  label="Phone"
  [(value)]="contact.phone"
  type="tel"
  prefixIcon="📱"
  helpText="Optional">
</app-text-input>

<app-text-input
  label="Company"
  [(value)]="contact.company"
  prefixIcon="🏢">
</app-text-input>
```

## Styling

The component uses DesignSystemA design tokens:

```css
:root {
  --color-primary: #6366F1;         /* Focus border color */
  --color-danger: #EF4444;          /* Error state */
  --color-success: #10B981;         /* Success state */
  --color-border: #E5E7EB;          /* Default border */
  --color-surface: #FFFFFF;         /* Background */
  --radius-md: 12px;                /* Border radius */
}
```

## Accessibility

- ✅ **Labels**: Proper label association with for/id
- ✅ **ARIA Attributes**: `aria-invalid`, `aria-describedby`, `aria-label`
- ✅ **Keyboard Navigation**: Full keyboard support
- ✅ **Focus Indicators**: Clear focus outline (2px)
- ✅ **Error Announcements**: Error messages linked to input
- ✅ **Required Fields**: Visual and semantic indication
- ✅ **Screen Reader**: All states announced properly
- ✅ **Color Contrast**: WCAG AA compliant

## Best Practices

### Do's ✅
- Always provide descriptive labels
- Show error messages when validation fails
- Use appropriate input types (email, tel, etc.)
- Provide help text for complex requirements
- Use character counters for length-limited fields
- Disable submit buttons during validation

### Don'ts ❌
- Don't use placeholder as a replacement for label
- Don't show errors before user interaction
- Don't use vague error messages ("Invalid input")
- Don't forget to validate on blur and submit
- Don't make required fields optional later

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes

- Password toggle automatically appears for password type
- Clear button only shows when input has value
- Success state appears when value exists without error
- Character count updates in real-time
- Two-way binding works with `[(value)]` syntax
- Focus management handled automatically

## Dependencies

- Angular 19+ with Signals
- No external UI libraries required
- Uses CSS variables for theming
