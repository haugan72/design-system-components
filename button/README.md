# Button Component

A professional, accessible, and feature-rich button component with multiple variants, sizes, loading states, and icon support.

## Features

- ✅ 5 variants (Primary, Secondary, Outline, Ghost, Danger)
- ✅ 3 sizes (Small, Medium, Large)
- ✅ Loading state with spinner
- ✅ Icon support (left or right position)
- ✅ Disabled state
- ✅ Full width option
- ✅ Keyboard navigation
- ✅ WCAG AA accessible
- ✅ Smooth animations
- ✅ TypeScript with Angular Signals

## Installation

```typescript
import { ButtonComponent } from './button/button.component';

@Component({
  standalone: true,
  imports: [ButtonComponent],
  // ...
})
```

## Basic Usage

```html
<app-button
  variant="primary"
  size="md"
  (clicked)="handleClick()">
  Click Me
</app-button>
```

```typescript
export class AppComponent {
  handleClick(event: MouseEvent): void {
    console.log('Button clicked!', event);
  }
}
```

## Variants

### Primary (Default)
Solid indigo background - used for primary actions.

```html
<app-button variant="primary">
  Primary Action
</app-button>
```

### Secondary
Lighter indigo background - used for secondary actions.

```html
<app-button variant="secondary">
  Secondary Action
</app-button>
```

### Outline
Indigo border with transparent background - used for tertiary actions.

```html
<app-button variant="outline">
  Outline Button
</app-button>
```

### Ghost
No border, minimal styling - used for subtle actions.

```html
<app-button variant="ghost">
  Ghost Button
</app-button>
```

### Danger
Red background - used for destructive actions.

```html
<app-button variant="danger">
  Delete Item
</app-button>
```

## Sizes

### Small (32px height)
```html
<app-button size="sm">Small</app-button>
```

### Medium (40px height - Default)
```html
<app-button size="md">Medium</app-button>
```

### Large (48px height)
```html
<app-button size="lg">Large</app-button>
```

## States

### Disabled
```html
<app-button [disabled]="true">
  Disabled Button
</app-button>
```

### Loading
Shows spinner and prevents clicks.

```html
<app-button [loading]="isLoading">
  Save Changes
</app-button>
```

```typescript
export class AppComponent {
  isLoading = false;

  async saveData(): Promise<void> {
    this.isLoading = true;
    try {
      await this.api.save();
    } finally {
      this.isLoading = false;
    }
  }
}
```

## Icons

### Icon on Left (Default)
```html
<app-button icon="🚀">
  Launch
</app-button>
```

### Icon on Right
```html
<app-button icon="→" iconPosition="right">
  Next Step
</app-button>
```

### Icon Only
```html
<app-button icon="✓" ariaLabel="Confirm"></app-button>
```

## Full Width

```html
<app-button [fullWidth]="true">
  Full Width Button
</app-button>
```

## Button Types

### Submit (for forms)
```html
<form (submit)="handleSubmit()">
  <app-button type="submit" variant="primary">
    Submit Form
  </app-button>
</form>
```

### Reset
```html
<app-button type="reset">
  Reset Form
</app-button>
```

## API Reference

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger'` | `'primary'` | Button style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |
| `disabled` | `boolean` | `false` | Disabled state |
| `loading` | `boolean` | `false` | Loading state (shows spinner) |
| `icon` | `string` | - | Icon (emoji or icon class) |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Icon position |
| `fullWidth` | `boolean` | `false` | Full width button |
| `ariaLabel` | `string` | - | ARIA label for accessibility |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `clicked` | `EventEmitter<MouseEvent>` | Emitted when button is clicked (not when disabled/loading) |

## Examples

### Save Form with Loading

```html
<app-button
  variant="primary"
  [loading]="isSaving"
  icon="💾"
  (clicked)="saveForm()">
  Save Changes
</app-button>
```

```typescript
export class FormComponent {
  isSaving = false;

  async saveForm(): Promise<void> {
    this.isSaving = true;
    try {
      await this.formService.save();
      this.showSuccess();
    } catch (error) {
      this.showError(error);
    } finally {
      this.isSaving = false;
    }
  }
}
```

### Delete Confirmation

```html
<app-button
  variant="danger"
  icon="🗑️"
  [disabled]="!canDelete"
  (clicked)="confirmDelete()">
  Delete Account
</app-button>
```

### Action Bar with Multiple Buttons

```html
<div class="action-bar">
  <app-button variant="ghost" icon="←">
    Back
  </app-button>

  <app-button variant="outline">
    Save Draft
  </app-button>

  <app-button variant="primary" icon="✓">
    Publish
  </app-button>
</div>
```

### Responsive Button Group

```html
<div class="button-group">
  <app-button variant="outline" size="sm">
    Cancel
  </app-button>
  <app-button variant="secondary" size="sm">
    Save Draft
  </app-button>
  <app-button variant="primary" size="sm" icon="→" iconPosition="right">
    Continue
  </app-button>
</div>
```

### Login Form

```html
<form (submit)="login()">
  <app-button
    type="submit"
    variant="primary"
    size="lg"
    [fullWidth]="true"
    [loading]="isLoggingIn"
    icon="🔓">
    Sign In
  </app-button>
</form>
```

### Wizard Navigation

```html
<div class="wizard-nav">
  <app-button
    variant="ghost"
    icon="←"
    [disabled]="currentStep === 0"
    (clicked)="previousStep()">
    Previous
  </app-button>

  @if (isLastStep) {
    <app-button
      variant="primary"
      icon="✓"
      [loading]="isSubmitting"
      (clicked)="submitWizard()">
      Complete
    </app-button>
  } @else {
    <app-button
      variant="primary"
      icon="→"
      iconPosition="right"
      (clicked)="nextStep()">
      Next
    </app-button>
  }
</div>
```

### Card Actions

```html
<div class="card">
  <h3>Product Item</h3>
  <p>Description of the product...</p>

  <div class="card-actions">
    <app-button variant="ghost" icon="👁️">
      View Details
    </app-button>
    <app-button variant="secondary" icon="🛒">
      Add to Cart
    </app-button>
    <app-button variant="primary" icon="💳">
      Buy Now
    </app-button>
  </div>
</div>
```

## Styling

The component uses DesignSystemA design tokens:

```css
:root {
  --color-primary: #6366F1;         /* Primary button color */
  --color-primary-hover: #4F46E5;   /* Hover state */
  --color-danger: #EF4444;          /* Danger button */
  --color-surface-secondary: #F5F7FA; /* Ghost hover */
  --radius-md: 12px;                /* Border radius */
  --transition-fast: 150ms;         /* Transition speed */
}
```

### Custom Styling

You can override button styles using CSS:

```css
/* Custom button color */
.btn-custom {
  background: #10B981;
  border-color: #10B981;
}

.btn-custom:hover {
  background: #059669;
}

/* Custom size */
.btn-xl {
  height: 56px;
  padding: 0 32px;
  font-size: 18px;
}
```

## Accessibility

- ✅ **Keyboard Support**: Full keyboard navigation (Tab, Enter, Space)
- ✅ **ARIA Attributes**: Proper ARIA labels and states
  - `aria-label` for accessibility labels
  - `aria-busy` when loading
  - `aria-disabled` when disabled
- ✅ **Focus Indicators**: Clear focus outlines
- ✅ **Screen Reader**: Announces button state changes
- ✅ **Color Contrast**: WCAG AA compliant contrast ratios
- ✅ **Reduced Motion**: Respects `prefers-reduced-motion`

## Best Practices

### Do's ✅
- Use Primary for the main action on a page
- Use Danger for destructive actions (delete, remove)
- Provide `ariaLabel` for icon-only buttons
- Show loading state during async operations
- Use appropriate button types (submit, reset) in forms

### Don'ts ❌
- Don't use multiple Primary buttons in the same context
- Don't use Danger for non-destructive actions
- Don't forget to disable buttons during loading
- Don't use buttons for navigation (use links instead)
- Don't make buttons too small (minimum 32px height)

## Responsive Behavior

### Desktop
- Standard sizes (sm: 32px, md: 40px, lg: 48px)
- Hover effects with lift animation
- Clear spacing between buttons

### Mobile (<768px)
- Slightly reduced sizes for better fit
- Touch-friendly tap targets (minimum 44x44px)
- Full-width buttons on very small screens (<480px)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes

- Loading state automatically disables the button
- Icon is hidden when loading (replaced by spinner)
- Keyboard events (Enter/Space) trigger click
- Animations respect `prefers-reduced-motion`
- Focus outline is 2px for visibility
- Button prevents default form submission when type is "button"

## Dependencies

- Angular 19+ with Signals
- No external UI libraries required
- Uses CSS variables for theming
