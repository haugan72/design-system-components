# Modal Component

A flexible, accessible modal dialog component with smooth animations and keyboard support.

## Features

- ✅ **Multiple sizes** - sm, md, lg, xl, full
- ✅ **Smooth animations** - Fade in/out, slide up transitions
- ✅ **Keyboard support** - Escape to close, Tab key focus trap
- ✅ **Click outside** - Close on overlay click (configurable)
- ✅ **Focus management** - Auto-focus modal, restore focus on close
- ✅ **Scroll lock** - Prevents background scrolling when open
- ✅ **Accessible** - WCAG AA compliant with ARIA labels
- ✅ **Customizable** - Header, body, footer slots
- ✅ **Loading states** - Built-in button loading spinner

## Installation

```typescript
import { ModalComponent } from './components/modal';

@Component({
  imports: [ModalComponent],
  // ...
})
```

## Basic Usage

```html
<button (click)="showModal.set(true)">Open Modal</button>

<app-modal
  [isOpen]="showModal()"
  [title]="'Welcome'"
  (close)="showModal.set(false)">
  <p>This is a simple modal dialog.</p>
</app-modal>
```

```typescript
export class MyComponent {
  showModal = signal(false);
}
```

## Advanced Usage

### With Actions

```html
<app-modal
  [isOpen]="showConfirmModal()"
  [title]="'Confirm Delete'"
  [config]="{size: 'md', closeOnOverlayClick: false}"
  [primaryButtonLabel]="'Delete'"
  [secondaryButtonLabel]="'Cancel'"
  [loading]="isDeleting()"
  (primaryAction)="onDelete()"
  (secondaryAction)="onCancel()"
  (close)="onCancel()">
  <p>Are you sure you want to delete this item? This action cannot be undone.</p>
</app-modal>
```

### Custom Footer

```html
<app-modal
  [isOpen]="showModal()"
  [title]="'Custom Actions'"
  [showFooter]="true"
  (close)="onClose()">
  <p>Modal content goes here.</p>

  <div footer class="custom-footer">
    <button (click)="action1()">Action 1</button>
    <button (click)="action2()">Action 2</button>
    <button (click)="action3()">Action 3</button>
  </div>
</app-modal>
```

### Different Sizes

```html
<!-- Small Modal -->
<app-modal
  [isOpen]="show()"
  [config]="{size: 'sm'}"
  [title]="'Small Modal'">
  <p>Small modal content.</p>
</app-modal>

<!-- Medium Modal (default) -->
<app-modal
  [isOpen]="show()"
  [config]="{size: 'md'}"
  [title]="'Medium Modal'">
  <p>Medium modal content.</p>
</app-modal>

<!-- Large Modal -->
<app-modal
  [isOpen]="show()"
  [config]="{size: 'lg'}"
  [title]="'Large Modal'">
  <p>Large modal content.</p>
</app-modal>

<!-- Extra Large Modal -->
<app-modal
  [isOpen]="show()"
  [config]="{size: 'xl'}"
  [title]="'Extra Large Modal'">
  <p>Extra large modal content.</p>
</app-modal>

<!-- Full Screen Modal -->
<app-modal
  [isOpen]="show()"
  [config]="{size: 'full'}"
  [title]="'Full Screen Modal'">
  <p>Full screen modal content.</p>
</app-modal>
```

### Without Title or Close Button

```html
<app-modal
  [isOpen]="show()"
  [config]="{showCloseButton: false}"
  (close)="onClose()">
  <div class="custom-content">
    <h3>Custom Content</h3>
    <p>Modal without title bar.</p>
  </div>
</app-modal>
```

## API Reference

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `isOpen` | `boolean` | `false` | Controls modal visibility |
| `title` | `string` | - | Modal title |
| `config` | `ModalConfig` | `{size: 'md', ...}` | Modal configuration |
| `primaryButtonLabel` | `string` | - | Primary button text |
| `secondaryButtonLabel` | `string` | - | Secondary button text |
| `showFooter` | `boolean` | `true` | Show footer section |
| `loading` | `boolean` | `false` | Loading state for primary button |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `close` | `void` | Emitted when modal is closed |
| `primaryAction` | `void` | Emitted when primary button clicked |
| `secondaryAction` | `void` | Emitted when secondary button clicked |

### Types

```typescript
interface ModalConfig {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;  // Default: true
  closeOnEscape?: boolean;         // Default: true
  showCloseButton?: boolean;       // Default: true
  centered?: boolean;              // Default: true
}
```

## Examples

### Confirmation Dialog

```typescript
export class ConfirmDialog {
  showConfirm = signal(false);
  isDeleting = signal(false);

  async onDelete() {
    this.isDeleting.set(true);
    try {
      await this.api.deleteItem();
      this.showConfirm.set(false);
      this.notify.success('Item deleted successfully');
    } catch (error) {
      this.notify.error('Failed to delete item');
    } finally {
      this.isDeleting.set(false);
    }
  }

  onCancel() {
    this.showConfirm.set(false);
  }
}
```

### Form in Modal

```typescript
export class FormModal {
  showModal = signal(false);
  formData = signal({ name: '', email: '' });
  isSaving = signal(false);

  async onSubmit() {
    this.isSaving.set(true);
    try {
      await this.api.saveData(this.formData());
      this.showModal.set(false);
    } catch (error) {
      console.error('Save failed', error);
    } finally {
      this.isSaving.set(false);
    }
  }
}
```

```html
<app-modal
  [isOpen]="showModal()"
  [title]="'Add New User'"
  [primaryButtonLabel]="'Save'"
  [secondaryButtonLabel]="'Cancel'"
  [loading]="isSaving()"
  (primaryAction)="onSubmit()"
  (secondaryAction)="showModal.set(false)"
  (close)="showModal.set(false)">

  <form>
    <div class="form-field">
      <label>Name</label>
      <input [(ngModel)]="formData().name" type="text">
    </div>
    <div class="form-field">
      <label>Email</label>
      <input [(ngModel)]="formData().email" type="email">
    </div>
  </form>
</app-modal>
```

### Information Modal

```typescript
export class InfoModal {
  showInfo = signal(false);

  openInfo() {
    this.showInfo.set(true);
  }
}
```

```html
<app-modal
  [isOpen]="showInfo()"
  [title]="'About This Feature'"
  [config]="{size: 'lg'}"
  [primaryButtonLabel]="'Got it'"
  (primaryAction)="showInfo.set(false)"
  (close)="showInfo.set(false)">

  <h3>Feature Overview</h3>
  <p>This feature allows you to...</p>

  <ul>
    <li>Feature benefit 1</li>
    <li>Feature benefit 2</li>
    <li>Feature benefit 3</li>
  </ul>
</app-modal>
```

## Styling

The component uses CSS variables from the Modern Business Design System:

```css
--color-primary: #2563EB
--color-bg: #FFFFFF
--color-border: #E5E7EB
--color-text-primary: #1F2937
--color-text-secondary: #6B7280
--radius-lg: 12px
```

## Accessibility

- ✅ ARIA `role="dialog"` and `aria-modal="true"`
- ✅ ARIA `aria-labelledby` for title reference
- ✅ Focus trap prevents tabbing outside modal
- ✅ Escape key closes modal
- ✅ Focus restoration to trigger element
- ✅ Keyboard navigation support
- ✅ Screen reader announcements
- ✅ Reduced motion support

## Keyboard Shortcuts

- `Escape` - Close modal (if `closeOnEscape: true`)
- `Tab` / `Shift+Tab` - Navigate focusable elements (trapped within modal)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

Part of the Modern Business Design System.
