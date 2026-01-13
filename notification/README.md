# Notification Component (Toast/Alert)

A flexible notification/toast component for displaying temporary messages to users with animations and auto-dismiss.

## Features

- ✅ **Multiple types** - success, error, warning, info
- ✅ **Auto-dismiss** - Configurable duration with visual progress bar
- ✅ **Positions** - 6 positions (top/bottom × left/center/right)
- ✅ **Animations** - Smooth slide-in and fade-out
- ✅ **Stacking** - Multiple notifications stack properly
- ✅ **Pause on hover** - Prevents auto-dismiss when hovering
- ✅ **Accessible** - ARIA live regions and labels
- ✅ **Icons** - Built-in icons for each type
- ✅ **Customizable** - Title, message, duration, position

## Installation

```typescript
import { NotificationComponent } from './components/notification';

@Component({
  imports: [NotificationComponent],
  // ...
})
```

## Basic Usage

```html
<app-notification
  [notifications]="notifications()"
  (dismiss)="onDismiss($event)">
</app-notification>
```

```typescript
export class MyComponent {
  notifications = signal<Notification[]>([]);

  showSuccess() {
    this.notifications.update(notifs => [...notifs, {
      id: crypto.randomUUID(),
      type: 'success',
      title: 'Success!',
      message: 'Your changes have been saved.'
    }]);
  }

  onDismiss(id: string) {
    this.notifications.update(notifs =>
      notifs.filter(n => n.id !== id)
    );
  }
}
```

## Advanced Usage

### Different Types

```typescript
// Success notification
this.notifications.update(notifs => [...notifs, {
  id: crypto.randomUUID(),
  type: 'success',
  message: 'Operation completed successfully!'
}]);

// Error notification
this.notifications.update(notifs => [...notifs, {
  id: crypto.randomUUID(),
  type: 'error',
  title: 'Error',
  message: 'Something went wrong. Please try again.'
}]);

// Warning notification
this.notifications.update(notifs => [...notifs, {
  id: crypto.randomUUID(),
  type: 'warning',
  message: 'Your session will expire in 5 minutes.'
}]);

// Info notification
this.notifications.update(notifs => [...notifs, {
  id: crypto.randomUUID(),
  type: 'info',
  title: 'Tip',
  message: 'You can customize notifications with different options.'
}]);
```

### Custom Configuration

```typescript
// Custom duration and position
this.notifications.update(notifs => [...notifs, {
  id: crypto.randomUUID(),
  type: 'success',
  message: 'Settings saved!',
  config: {
    duration: 3000,
    position: 'bottom-right',
    showCloseButton: true,
    showIcon: true
  }
}]);

// Persistent notification (no auto-dismiss)
this.notifications.update(notifs => [...notifs, {
  id: crypto.randomUUID(),
  type: 'info',
  title: 'Important',
  message: 'Please read this carefully.',
  config: {
    duration: 0, // 0 = no auto-dismiss
    position: 'top-center'
  }
}]);
```

### Different Positions

```typescript
// Top right (default)
config: { position: 'top-right' }

// Top left
config: { position: 'top-left' }

// Top center
config: { position: 'top-center' }

// Bottom right
config: { position: 'bottom-right' }

// Bottom left
config: { position: 'bottom-left' }

// Bottom center
config: { position: 'bottom-center' }
```

## API Reference

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `notifications` | `Notification[]` | `[]` | Array of notifications to display |
| `defaultConfig` | `NotificationConfig` | `{duration: 5000, ...}` | Default config for all notifications |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `dismiss` | `string` | Emitted when notification is dismissed (notification id) |

### Types

```typescript
interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  config?: NotificationConfig;
}

interface NotificationConfig {
  duration?: number;          // Duration in ms (0 = no auto-dismiss)
  position?: NotificationPosition;
  showCloseButton?: boolean;  // Default: true
  showIcon?: boolean;         // Default: true
}

type NotificationPosition =
  | 'top-right' | 'top-left' | 'top-center'
  | 'bottom-right' | 'bottom-left' | 'bottom-center';
```

## Examples

### Notification Service

```typescript
import { Injectable, signal } from '@angular/core';
import { Notification } from './components/notification';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  notifications = signal<Notification[]>([]);

  success(message: string, title?: string) {
    this.add({ type: 'success', message, title });
  }

  error(message: string, title?: string) {
    this.add({ type: 'error', message, title });
  }

  warning(message: string, title?: string) {
    this.add({ type: 'warning', message, title });
  }

  info(message: string, title?: string) {
    this.add({ type: 'info', message, title });
  }

  private add(notification: Omit<Notification, 'id'>) {
    const id = crypto.randomUUID();
    this.notifications.update(notifs => [...notifs, { ...notification, id }]);
  }

  dismiss(id: string) {
    this.notifications.update(notifs => notifs.filter(n => n.id !== id));
  }
}
```

### Usage with Service

```typescript
export class MyComponent {
  constructor(private notificationService: NotificationService) {}

  async saveChanges() {
    try {
      await this.api.save();
      this.notificationService.success('Changes saved successfully!');
    } catch (error) {
      this.notificationService.error('Failed to save changes', 'Error');
    }
  }
}
```

```html
<app-notification
  [notifications]="notificationService.notifications()"
  (dismiss)="notificationService.dismiss($event)">
</app-notification>
```

## Styling

The component uses CSS variables from the Modern Business Design System:

```css
--color-success: #10B981
--color-danger: #EF4444
--color-warning: #F59E0B
--color-info: #3B82F6
--color-bg: #FFFFFF
--color-text-primary: #1F2937
```

## Accessibility

- ✅ ARIA `role="alert"` for notifications
- ✅ ARIA `aria-live` regions (polite/assertive)
- ✅ Keyboard accessible close button
- ✅ Focus visible states
- ✅ Screen reader announcements
- ✅ Reduced motion support

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

Part of the Modern Business Design System.
