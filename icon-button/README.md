# Icon Button Component

A standalone icon button component with multiple variants, shapes, loading states, and tooltip support. Perfect for toolbars, action menus, and compact UI elements.

## Features

- ✅ 5 variants (Primary, Secondary, Outline, Ghost, Danger)
- ✅ 2 shapes (Square, Round)
- ✅ Loading state with spinner
- ✅ Disabled state
- ✅ Native tooltip support
- ✅ 40x40px dimensions (36px on mobile)
- ✅ Keyboard navigation
- ✅ WCAG AA accessible
- ✅ Smooth animations
- ✅ TypeScript with Angular Signals

## Installation

```typescript
import { IconButtonComponent } from './icon-button/icon-button.component';

@Component({
  standalone: true,
  imports: [IconButtonComponent],
  // ...
})
```

## Basic Usage

```html
<app-icon-button
  variant="primary"
  icon="🚀"
  ariaLabel="Launch"
  (clicked)="handleClick()">
</app-icon-button>
```

```typescript
export class AppComponent {
  handleClick(event: MouseEvent): void {
    console.log('Icon button clicked!', event);
  }
}
```

## Variants

### Primary (Default)
Solid indigo background - used for primary actions.

```html
<app-icon-button
  variant="primary"
  icon="✓"
  ariaLabel="Confirm">
</app-icon-button>
```

### Secondary
Lighter indigo background - used for secondary actions.

```html
<app-icon-button
  variant="secondary"
  icon="✎"
  ariaLabel="Edit">
</app-icon-button>
```

### Outline
Indigo border with transparent background - used for tertiary actions.

```html
<app-icon-button
  variant="outline"
  icon="⋯"
  ariaLabel="More options">
</app-icon-button>
```

### Ghost
No border, minimal styling - used for subtle actions.

```html
<app-icon-button
  variant="ghost"
  icon="✕"
  ariaLabel="Close">
</app-icon-button>
```

### Danger
Red background - used for destructive actions.

```html
<app-icon-button
  variant="danger"
  icon="🗑"
  ariaLabel="Delete">
</app-icon-button>
```

## Shapes

### Round (Default)
Fully circular button - modern look.

```html
<app-icon-button
  shape="round"
  icon="❤"
  ariaLabel="Like">
</app-icon-button>
```

### Square
Rounded square - more traditional look.

```html
<app-icon-button
  shape="square"
  icon="⊞"
  ariaLabel="Maximize">
</app-icon-button>
```

## States

### Disabled
```html
<app-icon-button
  [disabled]="true"
  icon="🔒"
  ariaLabel="Locked">
</app-icon-button>
```

### Loading
Shows spinner and prevents clicks.

```html
<app-icon-button
  [loading]="isLoading"
  icon="💾"
  ariaLabel="Save">
</app-icon-button>
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

## Tooltip

### Automatic Tooltip (from aria-label)
```html
<app-icon-button
  icon="ℹ"
  ariaLabel="Information">
</app-icon-button>
<!-- Tooltip will show "Information" on hover -->
```

### Custom Tooltip
```html
<app-icon-button
  icon="✎"
  ariaLabel="Edit"
  tooltip="Edit this item">
</app-icon-button>
<!-- Tooltip will show "Edit this item" on hover -->
```

## Button Types

### Submit (for forms)
```html
<form (submit)="handleSubmit()">
  <app-icon-button
    type="submit"
    variant="primary"
    icon="✓"
    ariaLabel="Submit form">
  </app-icon-button>
</form>
```

### Reset
```html
<app-icon-button
  type="reset"
  icon="↺"
  ariaLabel="Reset form">
</app-icon-button>
```

## API Reference

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger'` | `'primary'` | Button style variant |
| `shape` | `'square' \| 'round'` | `'round'` | Button shape |
| `disabled` | `boolean` | `false` | Disabled state |
| `loading` | `boolean` | `false` | Loading state (shows spinner) |
| `icon` | `string` | **required** | Icon (emoji or icon class) |
| `ariaLabel` | `string` | **required** | ARIA label for accessibility |
| `tooltip` | `string` | - | Custom tooltip text (defaults to ariaLabel) |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `clicked` | `EventEmitter<MouseEvent>` | Emitted when button is clicked (not when disabled/loading) |

## Examples

### Toolbar Actions

```html
<div class="toolbar">
  <app-icon-button
    variant="ghost"
    icon="⟵"
    ariaLabel="Go back">
  </app-icon-button>

  <app-icon-button
    variant="ghost"
    icon="⟶"
    ariaLabel="Go forward">
  </app-icon-button>

  <app-icon-button
    variant="ghost"
    icon="↻"
    ariaLabel="Refresh">
  </app-icon-button>
</div>
```

### Card Actions

```html
<div class="card">
  <div class="card-header">
    <h3>Product Item</h3>
    <div class="card-actions">
      <app-icon-button
        variant="ghost"
        icon="✎"
        ariaLabel="Edit"
        (clicked)="editItem()">
      </app-icon-button>

      <app-icon-button
        variant="ghost"
        icon="⋯"
        ariaLabel="More options"
        (clicked)="showMenu()">
      </app-icon-button>

      <app-icon-button
        variant="danger"
        shape="round"
        icon="🗑"
        ariaLabel="Delete"
        (clicked)="deleteItem()">
      </app-icon-button>
    </div>
  </div>
</div>
```

### Loading State Example

```html
<app-icon-button
  variant="primary"
  [loading]="isSaving"
  icon="💾"
  ariaLabel="Save changes"
  (clicked)="save()">
</app-icon-button>
```

```typescript
export class EditorComponent {
  isSaving = false;

  async save(): Promise<void> {
    this.isSaving = true;
    try {
      await this.editorService.save();
      this.showSuccess();
    } catch (error) {
      this.showError(error);
    } finally {
      this.isSaving = false;
    }
  }
}
```

### Modal Close Button

```html
<div class="modal-header">
  <h2>Dialog Title</h2>
  <app-icon-button
    variant="ghost"
    shape="round"
    icon="✕"
    ariaLabel="Close dialog"
    (clicked)="closeModal()">
  </app-icon-button>
</div>
```

### Navigation Menu Toggle

```html
<app-icon-button
  variant="ghost"
  icon="☰"
  ariaLabel="Open menu"
  (clicked)="toggleMenu()">
</app-icon-button>
```

### Social Actions

```html
<div class="social-actions">
  <app-icon-button
    variant="outline"
    icon="❤"
    ariaLabel="Like"
    [disabled]="!canLike"
    (clicked)="like()">
  </app-icon-button>

  <app-icon-button
    variant="outline"
    icon="💬"
    ariaLabel="Comment"
    (clicked)="openComments()">
  </app-icon-button>

  <app-icon-button
    variant="outline"
    icon="↗"
    ariaLabel="Share"
    (clicked)="share()">
  </app-icon-button>
</div>
```

### Table Row Actions

```html
<tr>
  <td>John Doe</td>
  <td>john@example.com</td>
  <td class="actions">
    <app-icon-button
      variant="ghost"
      size="sm"
      icon="👁"
      ariaLabel="View details"
      (clicked)="viewUser(user)">
    </app-icon-button>

    <app-icon-button
      variant="ghost"
      size="sm"
      icon="✎"
      ariaLabel="Edit user"
      (clicked)="editUser(user)">
    </app-icon-button>

    <app-icon-button
      variant="ghost"
      size="sm"
      icon="🗑"
      ariaLabel="Delete user"
      (clicked)="deleteUser(user)">
    </app-icon-button>
  </td>
</tr>
```

### Media Player Controls

```html
<div class="media-controls">
  <app-icon-button
    variant="ghost"
    icon="⏮"
    ariaLabel="Previous track"
    (clicked)="previous()">
  </app-icon-button>

  <app-icon-button
    variant="primary"
    shape="round"
    [icon]="isPlaying ? '⏸' : '▶'"
    [ariaLabel]="isPlaying ? 'Pause' : 'Play'"
    (clicked)="togglePlay()">
  </app-icon-button>

  <app-icon-button
    variant="ghost"
    icon="⏭"
    ariaLabel="Next track"
    (clicked)="next()">
  </app-icon-button>
</div>
```

### Search with Clear Button

```html
<div class="search-box">
  <input type="text" [(ngModel)]="searchQuery" placeholder="Search...">

  @if (searchQuery) {
    <app-icon-button
      variant="ghost"
      shape="round"
      icon="✕"
      ariaLabel="Clear search"
      (clicked)="clearSearch()">
    </app-icon-button>
  }
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
  --radius-md: 12px;                /* Square border radius */
  --radius-full: 9999px;            /* Round border radius */
  --transition-fast: 150ms;         /* Transition speed */
}
```

### Custom Styling

You can override icon button styles using CSS:

```css
/* Custom button color */
.icon-btn-custom {
  background: #10B981;
  border-color: #10B981;
}

.icon-btn-custom:hover {
  background: #059669;
}

/* Larger icon button */
.icon-btn-lg {
  width: 48px;
  height: 48px;
  font-size: 24px;
}
```

## Accessibility

- ✅ **Keyboard Support**: Full keyboard navigation (Tab, Enter, Space)
- ✅ **ARIA Attributes**: Required aria-label for screen readers
  - `aria-label` identifies button purpose
  - `aria-busy` when loading
  - `aria-disabled` when disabled
- ✅ **Focus Indicators**: Clear 2px focus outline
- ✅ **Tooltips**: Native tooltip on hover for visual feedback
- ✅ **Screen Reader**: Announces button state changes
- ✅ **Color Contrast**: WCAG AA compliant contrast ratios
- ✅ **Reduced Motion**: Respects `prefers-reduced-motion`

## Best Practices

### Do's ✅
- Always provide descriptive `ariaLabel` (required for accessibility)
- Use Primary for main actions, Ghost for less prominent actions
- Use Danger for destructive actions (delete, remove)
- Show loading state during async operations
- Use round shape for modern UIs, square for traditional UIs
- Group related icon buttons with consistent spacing

### Don'ts ❌
- Don't forget aria-label (it's required!)
- Don't use icons that are unclear or ambiguous
- Don't make clickable areas too small (minimum 40x40px maintained)
- Don't use icon buttons for navigation (use links instead)
- Don't disable buttons without explaining why (use tooltip)

## Responsive Behavior

### Desktop
- 40x40px dimensions
- Hover effects with lift animation
- Tooltip appears on hover

### Mobile (<768px)
- 36x36px dimensions (still touch-friendly)
- Slightly smaller icon (18px)
- Tooltip still appears on long-press

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
- Native tooltip using `title` attribute
- 40x40px meets minimum touch target size (44x44px with tap area)

## Dependencies

- Angular 19+ with Signals
- No external UI libraries required
- Uses CSS variables for theming
