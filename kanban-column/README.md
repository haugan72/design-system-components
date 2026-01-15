# Kanban Column Component

A column container for a Kanban board that acts as a drop zone for draggable cards.

## Features

- Drop zone for drag-and-drop operations
- Header with icon, title, and count badge
- Scrollable body for cards
- Visual feedback when dragging over
- Content projection for custom cards
- Empty state support
- Fully accessible

## Usage

```typescript
import { KanbanColumnComponent } from './components/kanban-column';
import { KanbanCardComponent } from './components/kanban-card';

@Component({
  imports: [KanbanColumnComponent, KanbanCardComponent],
  template: `
    <app-kanban-column
      [columnId]="'lead'"
      [title]="'Leads'"
      [icon]="'🎯'"
      [count]="items.length"
      (itemDropped)="onItemDropped($event)">

      @for (item of items; track item.id) {
        <app-kanban-card
          [title]="item.name"
          [data]="item">
        </app-kanban-card>
      }

      <div empty-state>No leads yet</div>
    </app-kanban-column>
  `
})
export class MyComponent {
  items = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ];

  onItemDropped(event: KanbanDropEvent) {
    console.log('Item dropped:', event.item, 'in column:', event.columnId);
  }
}
```

## Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `columnId` | `string` | **required** | Unique identifier for drag-drop targeting |
| `title` | `string` | **required** | Column header title |
| `icon` | `string` | - | Optional icon/emoji for the header |
| `count` | `number` | `0` | Number of items in the column |
| `headerColor` | `string` | - | Optional accent color for the header |

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| `itemDropped` | `KanbanDropEvent` | Emitted when an item is dropped in this column |

### KanbanDropEvent

```typescript
interface KanbanDropEvent {
  item: any;      // The dropped item data
  columnId: string; // The column ID where it was dropped
}
```

## Content Projection

### Cards
Project your Kanban cards as direct children:

```html
<app-kanban-column [columnId]="'col1'" [title]="'Column'">
  <app-kanban-card [title]="'Card 1'"></app-kanban-card>
  <app-kanban-card [title]="'Card 2'"></app-kanban-card>
</app-kanban-column>
```

### Empty State
Use the `empty-state` attribute for custom empty state content:

```html
<app-kanban-column [columnId]="'col1'" [title]="'Column'" [count]="0">
  <div empty-state>
    <p>No items in this column</p>
    <button>Add Item</button>
  </div>
</app-kanban-column>
```

## Styling

The column uses Design System A tokens:
- Background: `--color-surface-secondary`
- Border radius: `--radius-md`
- Spacing: `--space-*` scale

## Accessibility

- Uses `role="region"` with descriptive aria-label
- Count badge has aria-label for screen readers
- Keyboard accessible when combined with KanbanCardComponent
