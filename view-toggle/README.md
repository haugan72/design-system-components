# View Toggle Component

A button group for switching between different view modes.

## Features

- Icon-based toggle buttons
- SVG and emoji icon support
- Two-way binding with `[(value)]`
- Keyboard navigation (Arrow keys, Home, End)
- Tooltips on hover
- Full accessibility support

## Usage

### Basic Usage

```typescript
import { ViewToggleComponent, ViewToggleOption } from './components/view-toggle';

@Component({
  imports: [ViewToggleComponent],
  template: `
    <app-view-toggle
      [options]="viewOptions"
      [(value)]="currentView">
    </app-view-toggle>
  `
})
export class MyComponent {
  currentView = 'table';

  viewOptions: ViewToggleOption[] = [
    {
      id: 'table',
      icon: '<svg viewBox="0 0 16 16" fill="none"><path d="M2 4H14M2 8H14M2 12H14" stroke="currentColor" stroke-width="1.5"/></svg>',
      label: 'Table View'
    },
    {
      id: 'kanban',
      icon: '<svg viewBox="0 0 16 16" fill="none"><rect x="1" y="2" width="4" height="12" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="6" y="2" width="4" height="8" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="11" y="2" width="4" height="10" rx="1" stroke="currentColor" stroke-width="1.5"/></svg>',
      label: 'Kanban View'
    }
  ];
}
```

### With Emoji Icons

```typescript
viewOptions: ViewToggleOption[] = [
  { id: 'list', icon: '📋', label: 'List View' },
  { id: 'grid', icon: '🔲', label: 'Grid View' },
  { id: 'calendar', icon: '📅', label: 'Calendar View' }
];
```

### One-way Binding

```html
<app-view-toggle
  [options]="viewOptions"
  [value]="currentView"
  (valueChange)="onViewChange($event)">
</app-view-toggle>
```

## Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `options` | `ViewToggleOption[]` | **required** | Available toggle options |
| `value` | `string` | `''` | Currently selected option ID (two-way bindable) |

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| `valueChange` | `string` | Emitted when selection changes (for two-way binding) |

## Types

### ViewToggleOption

```typescript
interface ViewToggleOption {
  id: string;     // Unique identifier
  icon: string;   // SVG string or emoji
  label: string;  // Accessible label (tooltip and screen reader)
}
```

## Icon Format

Icons can be provided in two formats:

### SVG String
```typescript
{
  id: 'table',
  icon: '<svg viewBox="0 0 16 16" fill="none"><path d="M2 4H14" stroke="currentColor"/></svg>',
  label: 'Table'
}
```

### Emoji
```typescript
{
  id: 'calendar',
  icon: '📅',
  label: 'Calendar'
}
```

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `Arrow Right/Down` | Select next option |
| `Arrow Left/Up` | Select previous option |
| `Home` | Select first option |
| `End` | Select last option |
| `Tab` | Move focus to/from toggle group |

## Accessibility

- Uses `role="group"` with aria-label
- Each button has `aria-label` and `aria-pressed`
- Roving tabindex for keyboard navigation
- Focus visible states
- Title tooltips on hover
