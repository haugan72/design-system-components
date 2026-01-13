# Form Group Component

A wrapper component that provides consistent layout and structure for form fields with labels, help text, and error messages.

## Features

- ✅ Consistent label + control + helper text layout
- ✅ Required and optional indicators
- ✅ Error message display with validation states
- ✅ Help text support
- ✅ Vertical and horizontal orientations
- ✅ Full-width and inline layouts
- ✅ Focus state management
- ✅ WCAG AA accessible with ARIA support
- ✅ TypeScript with Angular Signals

## Installation

```typescript
import { FormGroupComponent } from './components/form-group';

@Component({
  standalone: true,
  imports: [FormGroupComponent],
  // ...
})
```

## Basic Usage

```html
<app-form-group label="Email Address" [required]="true">
  <input type="email" placeholder="Enter your email" />
</app-form-group>
```

## With Help Text

```html
<app-form-group
  label="Password"
  [required]="true"
  helpText="Must be at least 8 characters with one number">
  <input type="password" />
</app-form-group>
```

## With Error Message

```html
<app-form-group
  label="Username"
  [required]="true"
  [error]="usernameError">
  <input type="text" [(ngModel)]="username" />
</app-form-group>
```

## With Custom Components

```html
<app-form-group label="Full Name" [required]="true">
  <app-text-input
    [(value)]="fullName"
    placeholder="John Doe">
  </app-text-input>
</app-form-group>

<app-form-group label="Bio" [optional]="true" helpText="Tell us about yourself">
  <app-textarea
    [(value)]="bio"
    [rows]="5"
    [maxLength]="500">
  </app-textarea>
</app-form-group>

<app-form-group>
  <app-checkbox
    [(checked)]="agreeToTerms"
    label="I agree to the terms and conditions">
  </app-checkbox>
</app-form-group>
```

## Horizontal Layout

```html
<app-form-group
  label="Country"
  orientation="horizontal"
  helpText="Select your country of residence">
  <select>
    <option>United States</option>
    <option>Canada</option>
    <option>United Kingdom</option>
  </select>
</app-form-group>
```

## Inline Layout

```html
<app-form-group
  label="Subscribe"
  [fullWidth]="false">
  <app-checkbox [(checked)]="subscribe" label="Yes, send me updates">
  </app-checkbox>
</app-form-group>
```

## API Reference

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `label` | `string` | - | Label text for the form field |
| `error` | `string` | - | Error message (takes priority over helpText) |
| `helpText` | `string` | - | Help text displayed below control |
| `required` | `boolean` | `false` | Show required indicator (*) |
| `optional` | `boolean` | `false` | Show optional indicator |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout orientation |
| `fullWidth` | `boolean` | `true` | Whether to take full width |
| `id` | `string` | auto-generated | Unique ID for the form group |

### Computed Properties

| Property | Type | Description |
|----------|------|-------------|
| `containerClasses` | `string` | Combined CSS classes for container |
| `labelClasses` | `string` | CSS classes for label element |
| `showHelperText` | `boolean` | Whether to show error or help text |
| `helperTextClasses` | `string` | CSS classes for helper text |

## Examples

### Complete Registration Form

```typescript
@Component({
  template: `
    <form (submit)="onSubmit()">
      <app-form-group
        label="Email"
        [required]="true"
        [error]="emailError"
        helpText="We'll never share your email">
        <app-text-input
          [(value)]="email"
          type="email"
          placeholder="you@example.com"
          (blurred)="validateEmail()">
        </app-text-input>
      </app-form-group>

      <app-form-group
        label="Password"
        [required]="true"
        [error]="passwordError"
        helpText="At least 8 characters">
        <app-text-input
          [(value)]="password"
          type="password"
          (blurred)="validatePassword()">
        </app-text-input>
      </app-form-group>

      <app-form-group
        label="Bio"
        [optional]="true"
        helpText="Tell us about yourself (max 500 characters)">
        <app-textarea
          [(value)]="bio"
          [rows]="5"
          [maxLength]="500">
        </app-textarea>
      </app-form-group>

      <app-form-group>
        <app-checkbox
          [(checked)]="agreeToTerms"
          label="I agree to the terms and conditions">
        </app-checkbox>
      </app-form-group>

      <button type="submit" [disabled]="!isValid()">
        Register
      </button>
    </form>
  `
})
export class RegistrationFormComponent {
  email = signal('');
  password = signal('');
  bio = signal('');
  agreeToTerms = signal(false);

  emailError = signal('');
  passwordError = signal('');

  validateEmail(): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email())) {
      this.emailError.set('Please enter a valid email address');
    } else {
      this.emailError.set('');
    }
  }

  validatePassword(): void {
    if (this.password().length < 8) {
      this.passwordError.set('Password must be at least 8 characters');
    } else {
      this.passwordError.set('');
    }
  }

  isValid(): boolean {
    return (
      this.email().length > 0 &&
      this.password().length >= 8 &&
      this.agreeToTerms() &&
      !this.emailError() &&
      !this.passwordError()
    );
  }

  onSubmit(): void {
    if (this.isValid()) {
      console.log('Submitting registration...');
    }
  }
}
```

### Horizontal Form Layout

```typescript
@Component({
  template: `
    <form class="settings-form">
      <app-form-group
        label="Username"
        orientation="horizontal"
        [required]="true">
        <app-text-input [(value)]="username"></app-text-input>
      </app-form-group>

      <app-form-group
        label="Email"
        orientation="horizontal"
        [required]="true">
        <app-text-input [(value)]="email" type="email"></app-text-input>
      </app-form-group>

      <app-form-group
        label="Country"
        orientation="horizontal">
        <select>
          <option>United States</option>
          <option>Canada</option>
        </select>
      </app-form-group>

      <app-form-group
        label="Notifications"
        orientation="horizontal">
        <app-toggle [(checked)]="notificationsEnabled"></app-toggle>
      </app-form-group>
    </form>
  `,
  styles: [`
    .settings-form {
      max-width: 600px;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
  `]
})
export class SettingsFormComponent {
  username = signal('');
  email = signal('');
  notificationsEnabled = signal(true);
}
```

### Dynamic Validation

```typescript
@Component({
  template: `
    <app-form-group
      label="Promo Code"
      [optional]="true"
      [error]="promoError()">
      <app-text-input
        [(value)]="promoCode"
        placeholder="Enter promo code"
        (valueChange)="validatePromoCode()">
      </app-text-input>
    </app-form-group>
  `
})
export class PromoCodeComponent {
  promoCode = signal('');
  promoError = computed(() => {
    const code = this.promoCode();
    if (code.length === 0) return '';
    if (code.length < 6) return 'Promo code must be at least 6 characters';
    if (!/^[A-Z0-9]+$/.test(code)) return 'Promo code can only contain uppercase letters and numbers';
    return '';
  });

  validatePromoCode(): void {
    // Additional validation logic
  }
}
```

## Styling

Uses DesignSystemA tokens:

```css
--color-primary: #6366F1 (Indigo)
--color-text-primary: #1F2937
--color-text-muted: #6B7280
--color-danger: #EF4444
--space-1: 4px
--space-2: 8px
--space-4: 16px
--text-xs: 12px
--text-sm: 14px
```

### Custom Styling

Override CSS variables or add custom classes:

```css
app-form-group {
  --form-group-gap: 12px;
}

.custom-form app-form-group {
  margin-bottom: 24px;
}
```

## Layout Behavior

### Vertical (Default)
```
[Label] (Required/Optional)
[Control]
[Help Text / Error]
```

### Horizontal
```
[Label] (Required/Optional)  [Control]  [Help Text / Error]
```

On mobile (<768px), horizontal layout automatically switches to vertical.

## Accessibility

- Proper label association with `for` attribute
- ARIA `role="alert"` on error/help text
- `aria-live="assertive"` for errors
- `aria-live="polite"` for help text
- Focus state management and visual indicators
- High contrast mode support
- Screen reader friendly

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android 90+)

## Dependencies

- Angular 19+ with Signals
- No external UI libraries required
- Uses CSS variables for theming

## Best Practices

1. **Use Required/Optional Indicators**: Make expectations clear
   ```html
   <app-form-group label="Email" [required]="true">
   ```

2. **Provide Help Text**: Guide users on what to enter
   ```html
   <app-form-group helpText="We'll never share your email">
   ```

3. **Show Validation Errors**: Display specific error messages
   ```html
   <app-form-group [error]="emailError">
   ```

4. **Use Horizontal Layout for Settings**: Better for label-value pairs
   ```html
   <app-form-group orientation="horizontal">
   ```

5. **Nest Form Components**: Combine with text-input, textarea, etc.
   ```html
   <app-form-group label="Name">
     <app-text-input [(value)]="name"></app-text-input>
   </app-form-group>
   ```
