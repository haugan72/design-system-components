# Accordion Component

A flexible accordion component for collapsible content sections with expand/collapse functionality and customizable styling.

## Features

- ✅ **Single or multiple open** - Allow one or many items expanded
- ✅ **Smooth animations** - Configurable expand/collapse animations
- ✅ **Icons & badges** - Visual indicators and status badges
- ✅ **Multiple variants** - Bordered or separated styles
- ✅ **Disabled items** - Prevent interaction on specific items
- ✅ **Responsive** - Mobile-optimized layout
- ✅ **Accessible** - ARIA attributes, keyboard navigation

## Installation

```typescript
import { AccordionComponent } from './components/accordion';

@Component({
  imports: [AccordionComponent],
  // ...
})
```

## Basic Usage

```html
<app-accordion
  [items]="faqItems()"
  [config]="{allowMultiple: false, animated: true}"
  (itemToggle)="onToggle($event)">
</app-accordion>
```

```typescript
export class MyComponent {
  faqItems = signal<AccordionItem[]>([
    {
      id: 1,
      title: 'What is Angular?',
      content: 'Angular is a platform for building web applications with TypeScript and HTML.'
    },
    {
      id: 2,
      title: 'What are Signals?',
      content: 'Signals are a reactive primitive for managing state in Angular applications.'
    },
    {
      id: 3,
      title: 'What is standalone?',
      content: 'Standalone components can be used without NgModule declarations.'
    }
  ]);

  onToggle(item: AccordionItem) {
    console.log('Toggled:', item.title);
  }
}
```

## Advanced Usage

### FAQ Accordion

```html
<app-accordion
  [items]="faq()"
  [config]="{
    allowMultiple: false,
    bordered: true,
    animated: true
  }"
  (itemToggle)="onFaqToggle($event)">
</app-accordion>
```

```typescript
faq = signal<AccordionItem[]>([
  {
    id: 1,
    title: 'How do I get started?',
    content: 'To get started, install the package and import the component into your Angular application.',
    icon: '🚀',
    expanded: true
  },
  {
    id: 2,
    title: 'Is there a free trial?',
    content: 'Yes! We offer a 14-day free trial with full access to all features.',
    icon: '💎'
  },
  {
    id: 3,
    title: 'How do I cancel my subscription?',
    content: 'You can cancel anytime from your account settings. No questions asked.',
    icon: '✖️'
  }
]);
```

### Multiple Open Items

```html
<app-accordion
  [items]="features()"
  [config]="{allowMultiple: true, separated: true}">
</app-accordion>
```

```typescript
features = signal<AccordionItem[]>([
  {
    id: 1,
    title: 'Performance',
    content: 'Built with performance in mind. Fast load times and optimized rendering.',
    icon: '⚡',
    badge: 'New',
    badgeType: 'success'
  },
  {
    id: 2,
    title: 'Security',
    content: 'Enterprise-grade security with encryption and compliance certifications.',
    icon: '🔒',
    badge: 'Updated',
    badgeType: 'info'
  },
  {
    id: 3,
    title: 'Support',
    content: '24/7 customer support via email, chat, and phone.',
    icon: '💬'
  }
]);
```

### Separated Variant with Status Badges

```html
<app-accordion
  [items]="tasks()"
  [config]="{separated: true, allowMultiple: true}"
  (expandedChange)="onExpandedChange($event)">
</app-accordion>
```

```typescript
tasks = signal<AccordionItem[]>([
  {
    id: 1,
    title: 'Project Setup',
    content: 'Initialize project repository, install dependencies, and configure development environment.',
    badge: 'Completed',
    badgeType: 'success'
  },
  {
    id: 2,
    title: 'Design Phase',
    content: 'Create wireframes, mockups, and design system documentation.',
    badge: 'In Progress',
    badgeType: 'info',
    expanded: true
  },
  {
    id: 3,
    title: 'Development',
    content: 'Implement features according to specifications and design guidelines.',
    badge: 'Pending',
    badgeType: 'neutral'
  },
  {
    id: 4,
    title: 'Testing',
    content: 'Write unit tests, integration tests, and perform QA testing.',
    badge: 'Blocked',
    badgeType: 'danger',
    disabled: true
  }
]);

onExpandedChange(items: AccordionItem[]) {
  console.log(`${items.length} items expanded`);
}
```

### Bordered Variant (Default)

```html
<app-accordion
  [items]="documentation()"
  [config]="{bordered: true, allowMultiple: false}">
</app-accordion>
```

```typescript
documentation = signal<AccordionItem[]>([
  {
    id: 1,
    title: 'Getting Started',
    content: 'Learn the basics of our platform and how to get up and running quickly.',
    icon: '📚'
  },
  {
    id: 2,
    title: 'API Reference',
    content: 'Complete API documentation with code examples and best practices.',
    icon: '📖'
  },
  {
    id: 3,
    title: 'Tutorials',
    content: 'Step-by-step guides for common use cases and advanced features.',
    icon: '🎓'
  }
]);
```

## API Reference

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `items` | `AccordionItem[]` | Required | Array of accordion items |
| `config` | `AccordionConfig` | `{allowMultiple: false, ...}` | Accordion configuration |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `itemToggle` | `AccordionItem` | Emitted when item is toggled |
| `expandedChange` | `AccordionItem[]` | Emitted when expanded items change |

### Types

```typescript
interface AccordionItem {
  id: string | number;
  title: string;
  content: string;
  icon?: string;
  badge?: string;
  badgeType?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  disabled?: boolean;
  expanded?: boolean;  // Initial expanded state
}

interface AccordionConfig {
  allowMultiple?: boolean;  // Allow multiple items open (default: false)
  bordered?: boolean;       // Show border around accordion (default: true)
  separated?: boolean;      // Separate items with spacing (default: false)
  animated?: boolean;       // Enable animations (default: true)
}
```

## Examples

### Settings Accordion

```typescript
export class SettingsComponent {
  settings = signal<AccordionItem[]>([
    {
      id: 'profile',
      title: 'Profile Settings',
      content: 'Update your name, email, and profile picture.',
      icon: '👤',
      expanded: true
    },
    {
      id: 'notifications',
      title: 'Notification Preferences',
      content: 'Manage how and when you receive notifications.',
      icon: '🔔'
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      content: 'Control your privacy settings and security options.',
      icon: '🔒'
    },
    {
      id: 'billing',
      title: 'Billing Information',
      content: 'View invoices and update payment methods.',
      icon: '💳'
    }
  ]);

  config: AccordionConfig = {
    allowMultiple: true,
    separated: true,
    animated: true
  };
}
```

```html
<app-accordion
  [items]="settings()"
  [config]="config"
  (itemToggle)="onSettingToggle($event)">
</app-accordion>
```

### Help Center

```typescript
export class HelpCenterComponent {
  helpTopics = signal<AccordionItem[]>([
    {
      id: 1,
      title: 'Account & Billing',
      content: 'Manage your account settings, subscriptions, and payment information.',
      icon: '💰'
    },
    {
      id: 2,
      title: 'Technical Support',
      content: 'Get help with technical issues, bugs, and system requirements.',
      icon: '🔧'
    },
    {
      id: 3,
      title: 'Product Features',
      content: 'Learn about all the features and how to use them effectively.',
      icon: '✨'
    }
  ]);
}
```

```html
<h2>Help Center</h2>
<app-accordion
  [items]="helpTopics()"
  [config]="{allowMultiple: false, bordered: true}">
</app-accordion>
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

- ✅ ARIA `aria-expanded` attribute on headers
- ✅ ARIA `aria-controls` linking header to content
- ✅ ARIA `aria-disabled` for disabled items
- ✅ Keyboard navigation (Enter/Space to toggle)
- ✅ Focus visible states
- ✅ Screen reader support
- ✅ Reduced motion support

## Keyboard Shortcuts

- **Enter** / **Space**: Toggle accordion item
- **Tab**: Navigate between accordion items

## Best Practices

1. **Use clear titles**: Keep accordion titles concise and descriptive
2. **Limit nesting**: Avoid nesting accordions for better UX
3. **Single mode for FAQs**: Use `allowMultiple: false` for FAQ sections
4. **Multiple mode for forms**: Use `allowMultiple: true` for settings/forms
5. **Initial state**: Set `expanded: true` on important items

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

Part of the Modern Business Design System.
