# Kanban Board Component

A complete Kanban board with horizontal scrolling columns and drag-and-drop support.

## Features

- Horizontal scrolling board layout
- Automatic item grouping by field
- Drag-and-drop between columns
- Configurable card display
- Custom card template support
- Empty state handling
- Fully accessible

## Usage

### Basic Usage

```typescript
import { KanbanBoardComponent } from './components/kanban-board';

@Component({
  imports: [KanbanBoardComponent],
  template: `
    <app-kanban-board
      [columns]="columns"
      [items]="customers"
      [groupByField]="'status'"
      [cardConfig]="cardConfig"
      (itemMoved)="onItemMoved($event)"
      (itemClicked)="onItemClicked($event)">
    </app-kanban-board>
  `
})
export class MyComponent {
  columns: KanbanColumn[] = [
    { id: 'lead', title: 'Leads', icon: '🎯' },
    { id: 'contact', title: 'Contacted', icon: '📞' },
    { id: 'meeting', title: 'Meeting', icon: '📅' },
    { id: 'won', title: 'Won', icon: '✅', color: '#10B981' }
  ];

  customers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'lead', progress: 25 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'contact', progress: 50 }
  ];

  cardConfig: KanbanCardConfig = {
    titleField: 'name',
    subtitleField: 'email',
    progressField: 'progress'
  };

  onItemMoved(event: KanbanItemMoveEvent) {
    console.log(`Moved ${event.item.name} from ${event.fromColumn} to ${event.toColumn}`);
    // Update your data here
  }

  onItemClicked(item: any) {
    console.log('Clicked:', item);
  }
}
```

### With Badge Support

```typescript
cardConfig: KanbanCardConfig = {
  titleField: 'name',
  subtitleField: 'email',
  badgeField: 'priority',
  badgeVariantMap: {
    'LOW': 'neutral',
    'MEDIUM': 'info',
    'HIGH': 'warning',
    'URGENT': 'danger'
  }
};
```

### With Custom Card Template

```html
<app-kanban-board
  [columns]="columns"
  [items]="items"
  [groupByField]="'status'"
  [cardConfig]="cardConfig">

  <ng-template #cardTemplate let-item let-column="column">
    <div class="custom-card">
      <h4>{{ item.name }}</h4>
      <p>{{ item.description }}</p>
      <span>Column: {{ column.title }}</span>
    </div>
  </ng-template>
</app-kanban-board>
```

## Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `columns` | `KanbanColumn[]` | **required** | Column configurations |
| `items` | `any[]` | **required** | Array of items to display |
| `groupByField` | `string` | **required** | Field name to group items by |
| `cardConfig` | `KanbanCardConfig` | **required** | Card display configuration |
| `emptyMessage` | `string` | `'No items'` | Message shown in empty columns |

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| `itemMoved` | `KanbanItemMoveEvent` | Emitted when item is moved between columns |
| `itemClicked` | `any` | Emitted when a card is clicked |

## Types

### KanbanColumn

```typescript
interface KanbanColumn {
  id: string;        // Must match values in groupByField
  title: string;     // Column header text
  icon?: string;     // Optional emoji/icon
  color?: string;    // Optional header accent color
}
```

### KanbanCardConfig

```typescript
interface KanbanCardConfig {
  titleField: string;           // Required - field for card title
  subtitleField?: string;       // Optional - field for subtitle
  descriptionField?: string;    // Optional - field for description
  progressField?: string;       // Optional - field for progress (0-100)
  badgeField?: string;          // Optional - field for badge label
  badgeVariantMap?: Record<string, BadgeVariant>;  // Map field values to badge variants
}
```

### KanbanItemMoveEvent

```typescript
interface KanbanItemMoveEvent {
  item: any;          // The moved item
  fromColumn: string; // Source column ID
  toColumn: string;   // Target column ID
}
```

## Handling Item Moves

When an item is moved, you need to update your data source:

```typescript
onItemMoved(event: KanbanItemMoveEvent) {
  // Update the item's status/stage field
  const item = this.customers.find(c => c.id === event.item.id);
  if (item) {
    item.status = event.toColumn;
  }

  // Or call an API
  this.customerService.updateStatus(event.item.id, event.toColumn).subscribe();
}
```

## Styling

The board uses Design System A tokens and is fully responsive:
- Horizontal scroll on overflow
- Custom scrollbar styling
- Columns maintain fixed width (280px)
- Reduced padding on mobile

## Accessibility

- Board has `role="region"` with aria-label
- Columns are accessible regions
- Cards are keyboard navigable
- Screen reader friendly
