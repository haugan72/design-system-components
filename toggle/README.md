# Toggle Switch Component

A modern, accessible toggle switch component for boolean settings with smooth animations, multiple sizes, and label positioning options.

## Features

- ✅ Smooth sliding animation
- ✅ 3 sizes (Small, Medium, Large)
- ✅ Label support (left or right position)
- ✅ Two-way data binding with model()
- ✅ Disabled state
- ✅ Keyboard navigation (Enter, Space)
- ✅ WCAG AA accessible
- ✅ Unique auto-generated IDs
- ✅ TypeScript with Angular Signals

## Installation

```typescript
import { ToggleComponent } from './toggle/toggle.component';

@Component({
  standalone: true,
  imports: [ToggleComponent],
  // ...
})
```

## Basic Usage

```html
<app-toggle
  [(checked)]="isDarkMode"
  label="Dark Mode">
</app-toggle>
```

```typescript
export class AppComponent {
  isDarkMode = false;
}
```

## Sizes

### Small (40x20px)
```html
<app-toggle
  size="sm"
  [(checked)]="option1"
  label="Compact option">
</app-toggle>
```

### Medium (48x24px - Default)
```html
<app-toggle
  size="md"
  [(checked)]="option2"
  label="Standard option">
</app-toggle>
```

### Large (56x28px)
```html
<app-toggle
  size="lg"
  [(checked)]="option3"
  label="Large option">
</app-toggle>
```

## Label Position

### Right (Default)
Label appears to the right of the toggle.

```html
<app-toggle
  [(checked)]="notifications"
  label="Enable notifications"
  labelPosition="right">
</app-toggle>
```

### Left
Label appears to the left of the toggle.

```html
<app-toggle
  [(checked)]="autoSave"
  label="Auto-save"
  labelPosition="left">
</app-toggle>
```

## States

### Disabled
```html
<app-toggle
  [disabled]="true"
  [checked]="true"
  label="Cannot be changed">
</app-toggle>
```

### Without Label (Icon Only)
```html
<app-toggle
  [(checked)]="isEnabled"
  ariaLabel="Enable feature">
</app-toggle>
```

## Two-Way Binding

The component uses Angular's `model()` for two-way binding:

```html
<app-toggle
  [(checked)]="darkMode"
  label="Dark Mode">
</app-toggle>

<p>Dark mode is {{ darkMode ? 'enabled' : 'disabled' }}</p>
```

```typescript
export class SettingsComponent {
  darkMode = false;

  // darkMode automatically updates when toggle changes
}
```

## Change Event

Listen to changes without two-way binding:

```html
<app-toggle
  [checked]="emailNotifications"
  label="Email notifications"
  (changed)="onNotificationChange($event)">
</app-toggle>
```

```typescript
export class SettingsComponent {
  emailNotifications = true;

  onNotificationChange(enabled: boolean): void {
    console.log('Email notifications:', enabled);
    this.emailNotifications = enabled;
    this.saveSettings();
  }
}
```

## API Reference

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `checked` | `boolean` (model) | `false` | Toggle state (supports two-way binding) |
| `disabled` | `boolean` | `false` | Disabled state |
| `label` | `string` | - | Label text |
| `labelPosition` | `'left' \| 'right'` | `'right'` | Label position |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Toggle size |
| `ariaLabel` | `string` | - | ARIA label (falls back to label) |
| `id` | `string` | auto-generated | Unique ID for input element |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `changed` | `EventEmitter<boolean>` | Emitted when toggle state changes |

## Examples

### Settings Panel

```html
<div class="settings-panel">
  <h3>Preferences</h3>

  <app-toggle
    [(checked)]="settings.notifications"
    label="Enable notifications"
    (changed)="saveSettings()">
  </app-toggle>

  <app-toggle
    [(checked)]="settings.autoSave"
    label="Auto-save documents"
    (changed)="saveSettings()">
  </app-toggle>

  <app-toggle
    [(checked)]="settings.darkMode"
    label="Dark mode"
    (changed)="toggleDarkMode($event)">
  </app-toggle>

  <app-toggle
    [(checked)]="settings.analytics"
    label="Share analytics"
    (changed)="saveSettings()">
  </app-toggle>
</div>
```

```typescript
export class SettingsComponent {
  settings = {
    notifications: true,
    autoSave: false,
    darkMode: false,
    analytics: true
  };

  saveSettings(): void {
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }

  toggleDarkMode(enabled: boolean): void {
    document.body.classList.toggle('dark-mode', enabled);
    this.saveSettings();
  }
}
```

### Feature Flags

```html
<div class="feature-flags">
  <h3>Feature Flags</h3>

  @for (feature of features; track feature.id) {
    <div class="feature-item">
      <app-toggle
        [(checked)]="feature.enabled"
        [label]="feature.name"
        [disabled]="!canEdit"
        (changed)="updateFeature(feature)">
      </app-toggle>
      <p class="feature-description">{{ feature.description }}</p>
    </div>
  }
</div>
```

```typescript
export class FeatureFlagsComponent {
  canEdit = true;

  features = [
    { id: 1, name: 'New Dashboard', description: 'Enable new dashboard UI', enabled: false },
    { id: 2, name: 'Beta Features', description: 'Access beta features', enabled: true },
    { id: 3, name: 'Advanced Mode', description: 'Show advanced options', enabled: false }
  ];

  updateFeature(feature: any): void {
    console.log(`Feature ${feature.name} is now ${feature.enabled ? 'enabled' : 'disabled'}`);
    this.api.updateFeatureFlag(feature.id, feature.enabled);
  }
}
```

### Form Integration

```html
<form [formGroup]="profileForm" (submit)="saveProfile()">
  <div class="form-group">
    <app-toggle
      [(checked)]="publicProfile"
      label="Make profile public"
      labelPosition="left">
    </app-toggle>
  </div>

  <div class="form-group">
    <app-toggle
      [(checked)]="emailVisible"
      label="Show email address"
      labelPosition="left"
      [disabled]="!publicProfile">
    </app-toggle>
  </div>

  <div class="form-group">
    <app-toggle
      [(checked)]="phoneVisible"
      label="Show phone number"
      labelPosition="left"
      [disabled]="!publicProfile">
    </app-toggle>
  </div>

  <app-button type="submit" variant="primary">
    Save Profile
  </app-button>
</form>
```

```typescript
export class ProfileComponent {
  publicProfile = false;
  emailVisible = false;
  phoneVisible = false;

  profileForm = this.fb.group({
    // other fields
  });

  constructor(private fb: FormBuilder) {}

  saveProfile(): void {
    const data = {
      ...this.profileForm.value,
      publicProfile: this.publicProfile,
      emailVisible: this.emailVisible,
      phoneVisible: this.phoneVisible
    };
    this.api.saveProfile(data);
  }
}
```

### Privacy Settings

```html
<div class="privacy-settings">
  <h3>Privacy</h3>

  <div class="setting-item">
    <app-toggle
      [(checked)]="privacy.trackingConsent"
      size="lg"
      labelPosition="left">
    </app-toggle>
    <div class="setting-info">
      <h4>Allow tracking</h4>
      <p>Help us improve by sharing anonymous usage data</p>
    </div>
  </div>

  <div class="setting-item">
    <app-toggle
      [(checked)]="privacy.marketingEmails"
      size="lg"
      labelPosition="left">
    </app-toggle>
    <div class="setting-info">
      <h4>Marketing emails</h4>
      <p>Receive updates about new features and offers</p>
    </div>
  </div>
</div>
```

### Table Row Actions

```html
<table>
  <thead>
    <tr>
      <th>User</th>
      <th>Email</th>
      <th>Active</th>
      <th>Admin</th>
    </tr>
  </thead>
  <tbody>
    @for (user of users; track user.id) {
      <tr>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>
          <app-toggle
            [(checked)]="user.active"
            size="sm"
            [ariaLabel]="'Toggle active status for ' + user.name"
            (changed)="updateUserStatus(user)">
          </app-toggle>
        </td>
        <td>
          <app-toggle
            [(checked)]="user.isAdmin"
            size="sm"
            [disabled]="!canManageAdmins"
            [ariaLabel]="'Toggle admin status for ' + user.name"
            (changed)="updateUserRole(user)">
          </app-toggle>
        </td>
      </tr>
    }
  </tbody>
</table>
```

### Notification Preferences

```html
<div class="notification-prefs">
  <h3>Notifications</h3>

  <div class="pref-group">
    <h4>Email Notifications</h4>
    <app-toggle
      [(checked)]="notifications.email.comments"
      label="New comments">
    </app-toggle>
    <app-toggle
      [(checked)]="notifications.email.mentions"
      label="Mentions">
    </app-toggle>
    <app-toggle
      [(checked)]="notifications.email.updates"
      label="Product updates">
    </app-toggle>
  </div>

  <div class="pref-group">
    <h4>Push Notifications</h4>
    <app-toggle
      [(checked)]="notifications.push.enabled"
      label="Enable push notifications"
      (changed)="onPushToggle($event)">
    </app-toggle>
    <app-toggle
      [(checked)]="notifications.push.sound"
      label="Notification sound"
      [disabled]="!notifications.push.enabled">
    </app-toggle>
  </div>
</div>
```

### Comparison View

```html
<div class="comparison-controls">
  <app-toggle
    [(checked)]="showDifferences"
    label="Show only differences"
    size="sm">
  </app-toggle>

  <app-toggle
    [(checked)]="syncScroll"
    label="Sync scrolling"
    size="sm">
  </app-toggle>

  <app-toggle
    [(checked)]="wrapLines"
    label="Wrap long lines"
    size="sm">
  </app-toggle>
</div>
```

### Accessibility Options

```html
<div class="accessibility-settings">
  <h3>Accessibility</h3>

  <app-toggle
    [(checked)]="a11y.highContrast"
    label="High contrast mode"
    (changed)="applyHighContrast($event)">
  </app-toggle>

  <app-toggle
    [(checked)]="a11y.largeText"
    label="Large text"
    (changed)="applyLargeText($event)">
  </app-toggle>

  <app-toggle
    [(checked)]="a11y.reducedMotion"
    label="Reduce motion"
    (changed)="applyReducedMotion($event)">
  </app-toggle>

  <app-toggle
    [(checked)]="a11y.screenReaderMode"
    label="Screen reader optimizations">
  </app-toggle>
</div>
```

## Styling

The component uses DesignSystemA design tokens:

```css
:root {
  --color-primary: #6366F1;         /* Checked state color */
  --color-border: #E5E7EB;          /* Unchecked state */
  --color-surface: #FFFFFF;         /* Slider color */
  --radius-full: 9999px;            /* Round shape */
  --transition-base: 200ms;         /* Animation speed */
}
```

### Custom Styling

```css
/* Custom toggle color */
.toggle-custom .toggle-checked {
  background: #10B981;
  border-color: #10B981;
}

/* Extra large toggle */
.toggle-xl {
  width: 64px;
  height: 32px;
}

.toggle-xl .toggle-slider {
  width: 24px;
  height: 24px;
}

.toggle-xl.toggle-checked .toggle-slider {
  transform: translateX(32px);
}
```

## Accessibility

- ✅ **Keyboard Support**: Full keyboard navigation (Tab, Enter, Space)
- ✅ **ARIA Attributes**: Proper ARIA labels and states
  - `aria-label` for accessibility labels
  - `aria-checked` for toggle state
  - Hidden checkbox for form compatibility
- ✅ **Focus Indicators**: Clear 2px focus outline
- ✅ **Screen Reader**: Announces toggle state changes
- ✅ **Label Association**: Proper for/id association
- ✅ **Reduced Motion**: Respects `prefers-reduced-motion`
- ✅ **High Contrast**: Enhanced borders in high contrast mode

## Best Practices

### Do's ✅
- Use toggles for immediate on/off settings
- Provide clear, descriptive labels
- Use appropriate size for context (sm in tables, lg in settings)
- Show visual feedback for state changes
- Consider disabled state for dependent settings
- Use ariaLabel for toggles without visible labels

### Don'ts ❌
- Don't use toggles for actions (use buttons instead)
- Don't use toggles when changes require confirmation
- Don't make users guess what the toggle controls
- Don't use tiny toggles (minimum 40x20px maintained)
- Don't forget to save settings after toggle

## Responsive Behavior

### Desktop
- Standard sizes (sm: 40x20px, md: 48x24px, lg: 56x28px)
- Hover effects on track
- Smooth slider animation

### Mobile (<768px)
- Slightly larger touch targets (50x26px for md)
- Touch-friendly tap area
- Same smooth animations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes

- Uses hidden checkbox input for semantic HTML and form compatibility
- Smooth 200ms transition on state changes
- Animations respect `prefers-reduced-motion`
- Auto-generated unique IDs prevent conflicts
- Two-way binding works with `[(checked)]` syntax
- Label click toggles the switch
- Press animation provides tactile feedback
- Print styles show On/Off text

## Dependencies

- Angular 19+ with Signals
- No external UI libraries required
- Uses CSS variables for theming
