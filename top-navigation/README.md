# Top Navigation Component

A professional, accessible, and feature-rich top navigation bar component with sticky positioning, search functionality, mobile menu, and user dropdown.

## Features

- ✅ Sticky positioning option
- ✅ Responsive mobile menu with hamburger toggle
- ✅ Integrated search box with debouncing
- ✅ User menu with avatar and dropdown
- ✅ Active link highlighting
- ✅ Keyboard navigation support
- ✅ Light and dark theme variants
- ✅ Fully accessible (WCAG AA compliant)
- ✅ Smooth animations and transitions
- ✅ TypeScript with Angular Signals

## Installation

```typescript
import { TopNavigationComponent } from './top-navigation/top-navigation.component';

@Component({
  standalone: true,
  imports: [TopNavigationComponent],
  // ...
})
```

## Basic Usage

```html
<app-top-navigation
  [logo]="'/assets/logo.svg'"
  [links]="navigationLinks"
  [user]="currentUser"
  [config]="{showSearch: true, sticky: true}"
  (linkClick)="onNavigationClick($event)"
  (searchQuery)="onSearch($event)"
  (userMenuAction)="onUserAction($event)">
</app-top-navigation>
```

```typescript
export class AppComponent {
  navigationLinks: NavLink[] = [
    { id: 'home', label: 'Home', href: '/', active: true, icon: '🏠' },
    { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: '📊' },
    { id: 'reports', label: 'Reports', href: '/reports', icon: '📈' },
    { id: 'settings', label: 'Settings', href: '/settings', icon: '⚙️' }
  ];

  currentUser: UserData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '/assets/avatars/john.jpg',
    role: 'Administrator'
  };

  onNavigationClick(link: NavLink): void {
    console.log('Navigation clicked:', link);
    // Handle navigation
  }

  onSearch(query: string): void {
    console.log('Search query:', query);
    // Handle search
  }

  onUserAction(actionId: string): void {
    console.log('User action:', actionId);
    // Handle user menu actions (profile, settings, logout, etc.)
  }
}
```

## Advanced Usage

### Custom User Menu Actions

```html
<app-top-navigation
  [logo]="logoUrl"
  [links]="navLinks"
  [user]="user"
  [userMenuActions]="customUserActions"
  (userMenuAction)="handleUserAction($event)">
</app-top-navigation>
```

```typescript
customUserActions: UserMenuAction[] = [
  { id: 'profile', label: 'My Profile', icon: '👤' },
  { id: 'billing', label: 'Billing', icon: '💳' },
  { id: 'team', label: 'Team Settings', icon: '👥' },
  { id: 'divider', label: '', divider: true },
  { id: 'help', label: 'Help & Support', icon: '❓' },
  { id: 'divider2', label: '', divider: true },
  { id: 'logout', label: 'Sign Out', icon: '🚪' }
];
```

### Dark Theme

```html
<app-top-navigation
  [config]="{theme: 'dark', sticky: true, showSearch: true}">
</app-top-navigation>
```

### Disabled Links

```typescript
navigationLinks: NavLink[] = [
  { id: 'home', label: 'Home', href: '/', active: true },
  { id: 'admin', label: 'Admin', href: '/admin', disabled: true, icon: '🔒' }
];
```

### Without Search

```html
<app-top-navigation
  [config]="{showSearch: false}">
</app-top-navigation>
```

### Logo Click Handler

```html
<app-top-navigation
  [logo]="logoUrl"
  (logoClick)="navigateToHome()">
</app-top-navigation>
```

## API Reference

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `logo` | `string` | - | Logo image URL or text |
| `links` | `NavLink[]` | `[]` | Array of navigation links |
| `user` | `UserData` | - | User data for avatar and menu |
| `userMenuActions` | `UserMenuAction[]` | Default actions | Custom user menu actions |
| `config` | `TopNavigationConfig` | See below | Component configuration |

#### TopNavigationConfig

```typescript
interface TopNavigationConfig {
  showSearch?: boolean;    // Show search box (default: true)
  sticky?: boolean;        // Sticky positioning (default: true)
  showUserMenu?: boolean;  // Show user menu (default: true)
  theme?: 'light' | 'dark'; // Theme variant (default: 'light')
}
```

#### NavLink

```typescript
interface NavLink {
  id: string;           // Unique identifier
  label: string;        // Display text
  href?: string;        // Link URL
  icon?: string;        // Icon (emoji or icon class)
  active?: boolean;     // Active state
  disabled?: boolean;   // Disabled state
}
```

#### UserData

```typescript
interface UserData {
  name: string;      // User's full name
  email?: string;    // User's email
  avatar?: string;   // Avatar image URL
  role?: string;     // User's role/title
}
```

#### UserMenuAction

```typescript
interface UserMenuAction {
  id: string;          // Unique identifier
  label: string;       // Display text
  icon?: string;       // Icon (emoji or icon class)
  divider?: boolean;   // Show as divider
}
```

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `linkClick` | `EventEmitter<NavLink>` | Emitted when navigation link is clicked |
| `searchQuery` | `EventEmitter<string>` | Emitted when search query changes (debounced 300ms) |
| `userMenuAction` | `EventEmitter<string>` | Emitted when user menu action is clicked |
| `logoClick` | `EventEmitter<void>` | Emitted when logo is clicked |

## Examples

### E-Commerce Site

```typescript
navigationLinks: NavLink[] = [
  { id: 'products', label: 'Products', href: '/products', icon: '🛍️' },
  { id: 'categories', label: 'Categories', href: '/categories', icon: '📁' },
  { id: 'deals', label: 'Deals', href: '/deals', icon: '🏷️', active: true },
  { id: 'cart', label: 'Cart', href: '/cart', icon: '🛒' }
];
```

### Dashboard Application

```typescript
navigationLinks: NavLink[] = [
  { id: 'overview', label: 'Overview', href: '/dashboard', icon: '📊', active: true },
  { id: 'analytics', label: 'Analytics', href: '/analytics', icon: '📈' },
  { id: 'customers', label: 'Customers', href: '/customers', icon: '👥' },
  { id: 'reports', label: 'Reports', href: '/reports', icon: '📄' }
];
```

### SaaS Application

```typescript
navigationLinks: NavLink[] = [
  { id: 'projects', label: 'Projects', href: '/projects', icon: '📁', active: true },
  { id: 'tasks', label: 'Tasks', href: '/tasks', icon: '✅' },
  { id: 'team', label: 'Team', href: '/team', icon: '👥' },
  { id: 'integrations', label: 'Integrations', href: '/integrations', icon: '🔌' }
];
```

## Styling

The component uses DesignSystemA design tokens and can be customized via CSS variables:

```css
:root {
  --color-primary: #6366F1;         /* Primary brand color */
  --color-surface: #FFFFFF;         /* Navigation background */
  --color-border: #E5E7EB;          /* Border color */
  --color-text-primary: #1F2937;    /* Text color */
  --space-4: 16px;                  /* Spacing unit */
  --radius-md: 12px;                /* Border radius */
  --transition-fast: 150ms;         /* Transition speed */
}
```

## Accessibility

- ✅ **ARIA Labels**: Proper ARIA labels for all interactive elements
- ✅ **Keyboard Navigation**: Full keyboard support (Tab, Enter, Space, Escape)
- ✅ **Focus Management**: Clear focus indicators on all focusable elements
- ✅ **Screen Reader Support**: Semantic HTML with ARIA attributes
- ✅ **Color Contrast**: WCAG AA compliant color contrast ratios
- ✅ **Reduced Motion**: Respects `prefers-reduced-motion` setting

### Keyboard Shortcuts

- `Tab` - Navigate between elements
- `Enter` / `Space` - Activate link or button
- `Escape` - Close dropdown menus
- Arrow keys - Navigate within menus

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Responsive Behavior

### Desktop (>768px)
- Full horizontal navigation with all links visible
- Inline search box
- User menu with avatar

### Tablet (768px - 1024px)
- Slightly reduced search box width
- All links still visible

### Mobile (<768px)
- Hamburger menu with slide-out navigation
- Search toggle button
- Mobile-optimized user menu
- Vertical link list in mobile menu

## Notes

- Search queries are automatically debounced (300ms) to reduce API calls
- Mobile menu automatically closes after link selection
- User menu closes when clicking outside
- Logo click can be handled for custom home navigation
- Supports both image logos and text logos
- Avatar fallback shows user initials when no image provided

## Dependencies

- Angular 19+ with Signals
- No external UI libraries required
- Uses CSS variables for theming
