# Kanban Card Component

A draggable card component for displaying items in a Kanban board column.

## Features

- Draggable with native HTML5 drag-and-drop
- Title, subtitle, and description fields
- Badge support with multiple variants
- Progress bar with color coding
- Hover and drag visual feedback
- Fully accessible with keyboard navigation
- WCAG AA compliant

## Usage

```typescript
import { KanbanCardComponent } from './components/kanban-card';

@Component({
  imports: [KanbanCardComponent],
  template: `
    <app-kanban-card
      [title]="'John Doe'"
      [subtitle]="'john@example.com'"
      [description]="'Acme Corp'"
      [badge]="{ label: 'High', variant: 'danger' }"
      [progress]="75"
      [data]="customer"
      (cardClick)="onCardClick($event)"
      (dragStarted)="onDragStart($event)">
    </app-kanban-card>
  `
})
export class MyComponent {
  customer = { id: 1, name: 'John Doe' };

  onCardClick(data: any) {
    console.log('Card clicked:', data);
  }

  onDragStart(data: any) {
    console.log('Drag started:', data);
  }
}
```

## Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `title` | `string` | **required** | Primary text displayed on the card |
| `subtitle` | `string` | - | Secondary text (e.g., email) |
| `description` | `string` | - | Tertiary text (e.g., company name) |
| `badge` | `KanbanCardBadge` | - | Badge configuration with label and variant |
| `progress` | `number` | - | Progress value (0-100), shows progress bar if provided |
| `draggable` | `boolean` | `true` | Whether the card can be dragged |
| `data` | `any` | - | Underlying data object passed through events |

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| `cardClick` | `any` | Emitted when the card is clicked (passes data) |
| `dragStarted` | `any` | Emitted when drag starts (passes data) |
| `dragEnded` | `void` | Emitted when drag ends |

## Badge Variants

| Variant | Use Case |
|---------|----------|
| `primary` | Default/neutral emphasis |
| `success` | Positive status |
| `warning` | Warning/attention needed |
| `danger` | Critical/urgent |
| `info` | Informational |
| `neutral` | Low emphasis |

## Progress Bar Colors

- **0-33%**: Red to orange gradient
- **34-66%**: Orange to yellow gradient
- **67-99%**: Yellow to green gradient
- **100%**: Green gradient (complete)

## Accessibility

- Uses semantic HTML with `role="article"`
- Keyboard navigable with Tab and Enter/Space
- ARIA labels for screen readers
- Focus visible states
- Reduced motion support
