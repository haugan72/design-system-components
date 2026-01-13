# List Component

A flexible list component for displaying collections of items with search/filter functionality, multiple variants, and item selection support.

## Features

- ✅ **Multiple variants** - simple, detailed, card, compact
- ✅ **Search & filter** - Real-time search with result count
- ✅ **Selectable items** - Checkbox selection with multi-select
- ✅ **Visual elements** - Icons, avatars, and badges
- ✅ **Hover states** - Interactive feedback
- ✅ **Empty states** - Customizable empty message
- ✅ **Responsive** - Mobile-optimized layout
- ✅ **Accessible** - ARIA labels, keyboard navigation

## Installation

```typescript
import { ListComponent } from './components/list';

@Component({
  imports: [ListComponent],
  // ...
})
```

## Basic Usage

```html
<app-list
  [items]="users()"
  [config]="{variant: 'simple', hoverable: true}"
  (itemClick)="onUserClick($event)">
</app-list>
```

```typescript
export class MyComponent {
  users = signal<ListItem[]>([
    {
      id: 1,
      title: 'John Doe',
      subtitle: 'john@example.com',
      icon: '👤'
    },
    {
      id: 2,
      title: 'Jane Smith',
      subtitle: 'jane@example.com',
      icon: '👤'
    }
  ]);

  onUserClick(user: ListItem) {
    console.log('User clicked:', user);
  }
}
```

## Advanced Usage

### Detailed Variant with Search

```html
<app-list
  [items]="products()"
  [config]="{
    variant: 'detailed',
    showSearch: true,
    searchPlaceholder: 'Search products...',
    hoverable: true,
    dividers: true
  }"
  (itemClick)="onProductClick($event)">
</app-list>
```

```typescript
products = signal<ListItem[]>([
  {
    id: 1,
    title: 'Wireless Headphones',
    subtitle: '$199.99',
    description: 'Premium noise-cancelling headphones with 30-hour battery life',
    icon: '🎧',
    badge: 'New',
    badgeType: 'success'
  },
  {
    id: 2,
    title: 'Smart Watch',
    subtitle: '$349.99',
    description: 'Fitness tracker with heart rate monitor and GPS',
    icon: '⌚',
    badge: 'Sale',
    badgeType: 'warning'
  }
]);
```

### Selectable List with Avatars

```html
<app-list
  [items]="teamMembers()"
  [config]="{
    variant: 'detailed',
    selectable: true,
    hoverable: true
  }"
  (itemsSelected)="onMembersSelected($event)">
</app-list>
```

```typescript
teamMembers = signal<ListItem[]>([
  {
    id: 1,
    title: 'Sarah Johnson',
    subtitle: 'Product Manager',
    description: 'Leading product strategy and roadmap',
    avatar: 'https://example.com/avatars/sarah.jpg',
    badge: 'Admin',
    badgeType: 'info'
  },
  {
    id: 2,
    title: 'Mike Chen',
    subtitle: 'Senior Developer',
    description: 'Full-stack development and architecture',
    avatar: 'https://example.com/avatars/mike.jpg'
  }
]);

onMembersSelected(members: ListItem[]) {
  console.log('Selected members:', members);
}
```

### Card Variant

```html
<app-list
  [items]="notifications()"
  [config]="{
    variant: 'card',
    hoverable: true,
    dividers: false
  }"
  (itemClick)="onNotificationClick($event)">
</app-list>
```

```typescript
notifications = signal<ListItem[]>([
  {
    id: 1,
    title: 'New message received',
    subtitle: '2 minutes ago',
    description: 'You have a new message from John Doe',
    icon: '📧',
    badge: 'Unread',
    badgeType: 'info'
  },
  {
    id: 2,
    title: 'Payment successful',
    subtitle: '1 hour ago',
    description: 'Your payment of $99.00 was processed',
    icon: '✅',
    badge: 'Completed',
    badgeType: 'success'
  }
]);
```

### Compact Variant

```html
<app-list
  [items]="recentFiles()"
  [config]="{
    variant: 'compact',
    hoverable: true,
    showSearch: true
  }"
  (itemClick)="openFile($event)">
</app-list>
```

```typescript
recentFiles = signal<ListItem[]>([
  { id: 1, title: 'Project Plan.pdf', subtitle: 'Modified 2h ago', icon: '📄' },
  { id: 2, title: 'Budget 2024.xlsx', subtitle: 'Modified 5h ago', icon: '📊' },
  { id: 3, title: 'Meeting Notes.doc', subtitle: 'Modified 1d ago', icon: '📝' }
]);
```

### Disabled Items

```typescript
items = signal<ListItem[]>([
  {
    id: 1,
    title: 'Available Item',
    subtitle: 'This item is clickable',
    icon: '✓'
  },
  {
    id: 2,
    title: 'Disabled Item',
    subtitle: 'This item is disabled',
    icon: '✗',
    disabled: true
  }
]);
```

## API Reference

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `items` | `ListItem[]` | Required | Array of list items |
| `config` | `ListConfig` | `{variant: 'simple', ...}` | List configuration |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `itemClick` | `ListItem` | Emitted when item is clicked |
| `itemsSelected` | `ListItem[]` | Emitted when selection changes (selectable mode) |

### Types

```typescript
interface ListItem {
  id: string | number;
  title: string;
  subtitle?: string;
  description?: string;
  icon?: string;
  avatar?: string;
  badge?: string;
  badgeType?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  metadata?: Record<string, any>;
  disabled?: boolean;
}

interface ListConfig {
  variant?: 'simple' | 'detailed' | 'card' | 'compact';
  selectable?: boolean;
  hoverable?: boolean;
  dividers?: boolean;
  showSearch?: boolean;
  searchPlaceholder?: string;
  emptyMessage?: string;
}
```

### Variants

- **simple**: Basic list with title and subtitle
- **detailed**: Full list with title, subtitle, and description
- **card**: Card-style items with spacing and shadows
- **compact**: Minimal spacing for dense lists

## Examples

### Task List with Status Badges

```typescript
export class TaskListComponent {
  tasks = signal<ListItem[]>([
    {
      id: 1,
      title: 'Design landing page',
      subtitle: 'Due: Today',
      description: 'Create mockups for the new landing page',
      icon: '🎨',
      badge: 'In Progress',
      badgeType: 'info'
    },
    {
      id: 2,
      title: 'Review pull request',
      subtitle: 'Due: Tomorrow',
      description: 'Code review for authentication module',
      icon: '👁️',
      badge: 'Pending',
      badgeType: 'warning'
    },
    {
      id: 3,
      title: 'Deploy to production',
      subtitle: 'Due: Friday',
      description: 'Deploy version 2.0 to production servers',
      icon: '🚀',
      badge: 'Ready',
      badgeType: 'success'
    }
  ]);

  onTaskClick(task: ListItem) {
    this.router.navigate(['/tasks', task.id]);
  }
}
```

```html
<app-list
  [items]="tasks()"
  [config]="{
    variant: 'detailed',
    hoverable: true,
    showSearch: true,
    searchPlaceholder: 'Search tasks...'
  }"
  (itemClick)="onTaskClick($event)">
</app-list>
```

### Contact List with Selection

```typescript
export class ContactListComponent {
  contacts = signal<ListItem[]>([
    {
      id: 1,
      title: 'Alice Anderson',
      subtitle: 'alice@company.com',
      avatar: '/avatars/alice.jpg',
      badge: 'Team Lead',
      badgeType: 'info'
    },
    {
      id: 2,
      title: 'Bob Builder',
      subtitle: 'bob@company.com',
      avatar: '/avatars/bob.jpg'
    }
  ]);

  selectedContacts: ListItem[] = [];

  onContactsSelected(contacts: ListItem[]) {
    this.selectedContacts = contacts;
    console.log(`${contacts.length} contacts selected`);
  }
}
```

```html
<app-list
  [items]="contacts()"
  [config]="{
    variant: 'detailed',
    selectable: true,
    showSearch: true
  }"
  (itemsSelected)="onContactsSelected($event)">
</app-list>

<div class="selection-summary">
  {{ selectedContacts.length }} contacts selected
</div>
```

## Styling

The component uses CSS variables from the Modern Business Design System:

```css
--color-primary: #2563EB
--color-bg: #FFFFFF
--color-bg-subtle: #FAFAFA
--color-border: #E5E7EB
--color-text-primary: #1F2937
--color-text-secondary: #6B7280
--color-text-muted: #9CA3AF
--radius-lg: 12px
--radius-md: 6px
```

## Accessibility

- ✅ Semantic `<ul>` and `<li>` elements
- ✅ ARIA `role="list"` and `role="listitem"`
- ✅ `aria-selected` for selected items
- ✅ `aria-disabled` for disabled items
- ✅ Keyboard navigation (Enter/Space to select)
- ✅ Focus visible states
- ✅ Screen reader support
- ✅ Reduced motion support

## Keyboard Shortcuts

- **Enter** / **Space**: Select/activate item
- **Tab**: Navigate between list items
- **Arrow Keys**: Navigate in screen readers

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

Part of the Modern Business Design System.
