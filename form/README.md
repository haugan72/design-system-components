# Form Component

A flexible, accessible form component with built-in validation, multiple field types, and customizable layouts.

## Features

- ✅ **Multiple field types** - Text, email, password, number, tel, URL, textarea, select, checkbox, radio, date
- ✅ **Built-in validation** - Required, min/max length, min/max value, pattern, email, URL, custom validators
- ✅ **Real-time validation** - Instant feedback with touch and submit tracking
- ✅ **Flexible layouts** - Vertical, horizontal, and inline layouts
- ✅ **Loading states** - Built-in loading spinner and disabled states
- ✅ **Help text** - Optional help text for each field
- ✅ **Accessible** - WCAG AA compliant with ARIA labels
- ✅ **Responsive** - Mobile-friendly design

## Installation

```typescript
import { FormComponent } from './components/form';

@Component({
  imports: [FormComponent],
  // ...
})
```

## Basic Usage

```html
<app-form
  [fields]="formFields()"
  (formSubmit)="onSubmit($event)">
</app-form>
```

```typescript
export class MyComponent {
  formFields = signal<FormField[]>([
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      required: true,
      placeholder: 'Enter your name'
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      validation: { email: true }
    },
    {
      name: 'message',
      label: 'Message',
      type: 'textarea',
      rows: 4,
      validation: { minLength: 10, maxLength: 500 }
    }
  ]);

  onSubmit(data: Record<string, any>) {
    console.log('Form submitted:', data);
  }
}
```

## Advanced Usage

### With All Features

```html
<app-form
  [fields]="formFields()"
  [config]="{
    layout: 'vertical',
    submitLabel: 'Create Account',
    cancelLabel: 'Cancel',
    showCancel: true,
    showReset: true,
    resetLabel: 'Clear Form'
  }"
  [loading]="isSubmitting()"
  [title]="'Contact Us'"
  [description]="'Fill out the form below and we will get back to you.'"
  (formSubmit)="onSubmit($event)"
  (formCancel)="onCancel()"
  (formReset)="onReset()"
  (validityChange)="onValidityChange($event)">
</app-form>
```

### Field Types

```typescript
formFields = signal<FormField[]>([
  // Text Input
  { name: 'username', label: 'Username', type: 'text', required: true },

  // Email Input
  { name: 'email', label: 'Email', type: 'email', validation: { email: true } },

  // Password Input
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    validation: { minLength: 8, maxLength: 50 }
  },

  // Number Input
  {
    name: 'age',
    label: 'Age',
    type: 'number',
    validation: { min: 18, max: 120 }
  },

  // Textarea
  {
    name: 'bio',
    label: 'Bio',
    type: 'textarea',
    rows: 6,
    helpText: 'Tell us about yourself'
  },

  // Select
  {
    name: 'country',
    label: 'Country',
    type: 'select',
    options: [
      { label: 'United States', value: 'us' },
      { label: 'Canada', value: 'ca' },
      { label: 'United Kingdom', value: 'uk' }
    ],
    required: true
  },

  // Checkbox
  {
    name: 'terms',
    label: 'Terms and Conditions',
    type: 'checkbox',
    placeholder: 'I agree to the terms and conditions',
    required: true
  },

  // Radio
  {
    name: 'plan',
    label: 'Select Plan',
    type: 'radio',
    options: [
      { label: 'Free', value: 'free' },
      { label: 'Pro ($9/mo)', value: 'pro' },
      { label: 'Enterprise ($29/mo)', value: 'enterprise' }
    ],
    required: true
  }
]);
```

### Custom Validation

```typescript
formFields = signal<FormField[]>([
  {
    name: 'username',
    label: 'Username',
    type: 'text',
    validation: {
      required: true,
      minLength: 3,
      maxLength: 20,
      pattern: /^[a-zA-Z0-9_]+$/,
      custom: (value: string) => {
        if (value && value.toLowerCase() === 'admin') {
          return 'Username "admin" is not allowed';
        }
        return null;
      }
    }
  }
]);
```

## API Reference

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `fields` | `FormField[]` | required | Array of form field definitions |
| `config` | `FormConfig` | `{layout: 'vertical', submitLabel: 'Submit'}` | Form configuration |
| `loading` | `boolean` | `false` | Show loading state |
| `title` | `string` | - | Form title |
| `description` | `string` | - | Form description |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `formSubmit` | `Record<string, any>` | Emitted when form is submitted (if valid) |
| `formCancel` | `void` | Emitted when cancel button is clicked |
| `formReset` | `void` | Emitted when reset button is clicked |
| `validityChange` | `boolean` | Emitted when form validity changes |

### Types

```typescript
interface FormField {
  name: string;
  label: string;
  type: FormFieldType;
  value?: any;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options?: { label: string; value: any }[]; // For select/radio
  validation?: FormFieldValidation;
  helpText?: string;
  rows?: number; // For textarea
}

interface FormFieldValidation {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  email?: boolean;
  url?: boolean;
  custom?: (value: any) => string | null;
}

interface FormConfig {
  layout?: 'vertical' | 'horizontal' | 'inline';
  submitLabel?: string;
  cancelLabel?: string;
  showCancel?: boolean;
  showReset?: boolean;
  resetLabel?: string;
}

type FormFieldType =
  | 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date';
```

## Examples

### Contact Form

```typescript
export class ContactForm {
  formFields = signal<FormField[]>([
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true, validation: { email: true } },
    { name: 'subject', label: 'Subject', type: 'text', required: true },
    { name: 'message', label: 'Message', type: 'textarea', rows: 6, required: true }
  ]);

  isSubmitting = signal(false);

  async onSubmit(data: Record<string, any>) {
    this.isSubmitting.set(true);
    try {
      await this.api.sendMessage(data);
      alert('Message sent successfully!');
    } catch (error) {
      alert('Failed to send message');
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
```

### Registration Form

```typescript
export class RegistrationForm {
  formFields = signal<FormField[]>([
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      required: true,
      validation: { minLength: 3, maxLength: 20 },
      helpText: '3-20 characters, letters and numbers only'
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      validation: { email: true }
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      required: true,
      validation: { minLength: 8 },
      helpText: 'Minimum 8 characters'
    },
    {
      name: 'age',
      label: 'Age',
      type: 'number',
      required: true,
      validation: { min: 18, max: 120 }
    },
    {
      name: 'terms',
      label: 'Terms',
      type: 'checkbox',
      placeholder: 'I agree to the terms and conditions',
      required: true
    }
  ]);

  onSubmit(data: Record<string, any>) {
    console.log('Registration:', data);
  }
}
```

## Styling

The component uses CSS variables from the Modern Business Design System:

```css
--color-primary: #2563EB
--color-danger: #EF4444
--color-bg: #FFFFFF
--color-border: #E5E7EB
--color-text-primary: #1F2937
--color-text-secondary: #6B7280
```

## Accessibility

- ✅ Semantic HTML form elements
- ✅ ARIA labels and descriptions
- ✅ Error announcements with role="alert"
- ✅ Keyboard navigation support
- ✅ Focus visible states
- ✅ Required field indicators
- ✅ Reduced motion support

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

Part of the Modern Business Design System.
