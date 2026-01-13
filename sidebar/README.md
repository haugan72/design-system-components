# Sidebar Navigation Component

A professional, accessible, and feature-rich sidebar navigation component with collapsible sub-items, badges, nested navigation, and responsive behavior.

## Features

- ✅ Collapsible sidebar (260px → 60px)
- ✅ Nested navigation with expandable sub-items
- ✅ Badge support with color variants
- ✅ Active item highlighting
- ✅ Icon support for all items
- ✅ Keyboard navigation (arrows, Enter, Space)
- ✅ Light and dark theme variants
- ✅ Tooltip on hover when collapsed
- ✅ Fully accessible (WCAG AA compliant)
- ✅ Smooth animations
- ✅ TypeScript with Angular Signals

## Installation

```typescript
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  standalone: true,
  imports: [SidebarComponent],
  // ...
})
```

## Basic Usage

```html
<app-sidebar
  [items]="sidebarItems"
  [header]="'My App'"
  [footer]="'© 2024 Company'"
  [config]="{collapsible: true, collapsed: false}"
  (itemClick)="onSidebarItemClick($event)"
  (collapseToggle)="onCollapseToggle($event)">
</app-sidebar>
```

```typescript
export class AppComponent {
  sidebarItems: SidebarItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      href: '/dashboard',
      icon: '📊',
      active: true
    },
    {
      id: 'projects',
      label: 'Projects',
      href: '/projects',
      icon: '📁',
      badge: '12',
      badgeType: 'primary',
      children: [
        {
          id: 'active-projects',
          label: 'Active Projects',
          href: '/projects/active',
          icon: '✅',
          badge: '8',
          badgeType: 'success'
        },
        {
          id: 'archived-projects',
          label: 'Archived',
          href: '/projects/archived',
          icon: '📦',
          badge: '4',
          badgeType: 'info'
        }
      ]
    },
    {
      id: 'team',
      label: 'Team',
      href: '/team',
      icon: '👥',
      badge: 'New',
      badgeType: 'warning'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      href: '/analytics',
      icon: '📈'
    },
    {
      id: 'settings',
      label: 'Settings',
      href: '/settings',
      icon: '⚙️'
    }
  ];

  onSidebarItemClick(item: SidebarItem): void {
    console.log('Sidebar item clicked:', item);
    // Handle navigation
  }

  onCollapseToggle(collapsed: boolean): void {
    console.log('Sidebar collapsed:', collapsed);
    // Handle collapse state
  }
}
```

## Advanced Usage

### Dark Theme

```html
<app-sidebar
  [items]="sidebarItems"
  [config]="{theme: 'dark', collapsible: true}">
</app-sidebar>
```

### Custom Width

```html
<app-sidebar
  [items]="sidebarItems"
  [config]="{width: 300, collapsedWidth: 80}">
</app-sidebar>
```

### Start Collapsed

```html
<app-sidebar
  [items]="sidebarItems"
  [config]="{collapsed: true, collapsible: true}">
</app-sidebar>
```

### Without Footer

```html
<app-sidebar
  [items]="sidebarItems"
  [config]="{showFooter: false}">
</app-sidebar>
```

### With Disabled Items

```typescript
sidebarItems: SidebarItem[] = [
  {
    id: 'admin',
    label: 'Admin Panel',
    href: '/admin',
    icon: '🔒',
    disabled: true
  }
];
```

## API Reference

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `items` | `SidebarItem[]` | `[]` | Array of navigation items |
| `header` | `string` | - | Header content (logo/title) |
| `footer` | `string` | - | Footer content |
| `config` | `SidebarConfig` | See below | Component configuration |

#### SidebarConfig

```typescript
interface SidebarConfig {
  collapsed?: boolean;        // Start collapsed (default: false)
  collapsible?: boolean;      // Allow collapsing (default: true)
  width?: number;             // Width when expanded in px (default: 260)
  collapsedWidth?: number;    // Width when collapsed in px (default: 60)
  showFooter?: boolean;       // Show footer (default: true)
  theme?: 'light' | 'dark';   // Theme variant (default: 'light')
}
```

#### SidebarItem

```typescript
interface SidebarItem {
  id: string;                        // Unique identifier
  label: string;                     // Display text
  href?: string;                     // Link URL
  icon?: string;                     // Icon (emoji or icon class)
  active?: boolean;                  // Active state
  disabled?: boolean;                // Disabled state
  badge?: string | number;           // Badge text/number
  badgeType?: 'primary' | 'success' | 'warning' | 'danger' | 'info'; // Badge color
  children?: SidebarItem[];          // Sub-items
  expanded?: boolean;                // Expanded state (for parent items)
}
```

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `itemClick` | `EventEmitter<SidebarItem>` | Emitted when navigation item is clicked |
| `collapseToggle` | `EventEmitter<boolean>` | Emitted when sidebar collapse state changes |

## Examples

### Dashboard Application

```typescript
sidebarItems: SidebarItem[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
    icon: '🏠',
    active: true
  },
  {
    id: 'analytics',
    label: 'Analytics',
    href: '/analytics',
    icon: '📊',
    children: [
      { id: 'overview', label: 'Overview', href: '/analytics/overview' },
      { id: 'reports', label: 'Reports', href: '/analytics/reports', badge: '3', badgeType: 'danger' },
      { id: 'insights', label: 'Insights', href: '/analytics/insights' }
    ]
  },
  {
    id: 'customers',
    label: 'Customers',
    href: '/customers',
    icon: '👥',
    badge: '142',
    badgeType: 'info'
  },
  {
    id: 'products',
    label: 'Products',
    href: '/products',
    icon: '📦'
  }
];
```

### E-Commerce Admin

```typescript
sidebarItems: SidebarItem[] = [
  {
    id: 'orders',
    label: 'Orders',
    href: '/orders',
    icon: '🛒',
    badge: '28',
    badgeType: 'warning',
    active: true
  },
  {
    id: 'products',
    label: 'Products',
    href: '/products',
    icon: '📦',
    children: [
      { id: 'all-products', label: 'All Products', href: '/products/all' },
      { id: 'categories', label: 'Categories', href: '/products/categories' },
      { id: 'inventory', label: 'Inventory', href: '/products/inventory', badge: 'Low', badgeType: 'danger' }
    ]
  },
  {
    id: 'customers',
    label: 'Customers',
    href: '/customers',
    icon: '👥',
    badge: '1.2k',
    badgeType: 'info'
  },
  {
    id: 'marketing',
    label: 'Marketing',
    href: '/marketing',
    icon: '📢',
    children: [
      { id: 'campaigns', label: 'Campaigns', href: '/marketing/campaigns' },
      { id: 'promotions', label: 'Promotions', href: '/marketing/promotions', badge: '2', badgeType: 'success' },
      { id: 'discounts', label: 'Discounts', href: '/marketing/discounts' }
    ]
  }
];
```

### Project Management Tool

```typescript
sidebarItems: SidebarItem[] = [
  {
    id: 'workspaces',
    label: 'Workspaces',
    href: '/workspaces',
    icon: '💼',
    children: [
      { id: 'workspace-1', label: 'Marketing', href: '/workspaces/marketing', badge: '5', badgeType: 'primary' },
      { id: 'workspace-2', label: 'Development', href: '/workspaces/dev', badge: '12', badgeType: 'warning' },
      { id: 'workspace-3', label: 'Design', href: '/workspaces/design', badge: '3', badgeType: 'success' }
    ]
  },
  {
    id: 'tasks',
    label: 'My Tasks',
    href: '/tasks',
    icon: '✅',
    badge: '7',
    badgeType: 'danger',
    active: true
  },
  {
    id: 'calendar',
    label: 'Calendar',
    href: '/calendar',
    icon: '📅'
  },
  {
    id: 'documents',
    label: 'Documents',
    href: '/documents',
    icon: '📄'
  }
];
```

## Styling

The component uses DesignSystemA design tokens:

```css
:root {
  --color-primary: #6366F1;         /* Active item color */
  --color-surface: #FFFFFF;         /* Sidebar background */
  --color-border: #E5E7EB;          /* Border color */
  --color-text-primary: #1F2937;    /* Text color */
  --space-4: 16px;                  /* Spacing unit */
  --radius-md: 12px;                /* Border radius */
}
```

## Accessibility

- ✅ **ARIA Labels**: Proper ARIA attributes for navigation
- ✅ **Keyboard Navigation**: Full keyboard support
  - `Tab` - Navigate between items
  - `Enter` / `Space` - Activate item
  - `ArrowRight` - Expand item with children
  - `ArrowLeft` - Collapse item with children
- ✅ **Focus Management**: Clear focus indicators
- ✅ **Screen Reader Support**: Semantic HTML with proper roles
- ✅ **Tooltips**: Hover tooltips show full labels when collapsed
- ✅ **Color Contrast**: WCAG AA compliant

## Responsive Behavior

### Desktop (>768px)
- Full sidebar with expand/collapse functionality
- All labels and badges visible
- Smooth width transitions

### Mobile (<768px)
- Fixed position sidebar
- Slides in/out from left
- Overlay backdrop when open
- Collapses to hide when not needed

## Badge Types

The sidebar supports 5 badge color variants:
- **Primary** (Indigo) - General notifications
- **Success** (Green) - Completed items
- **Warning** (Orange) - Attention needed
- **Danger** (Red) - Urgent items
- **Info** (Blue) - Informational

## Notes

- Parent items with children automatically become expandable
- Clicking a parent item toggles its expansion
- Active item highlighting persists across navigation
- Collapsed state shows tooltips on hover
- Sub-items are indented for visual hierarchy
- Badge counts update dynamically with inputs
- Smooth animations respect `prefers-reduced-motion`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Dependencies

- Angular 19+ with Signals
- No external UI libraries required
- Uses CSS variables for theming
