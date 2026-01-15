export {
  KanbanBoardComponent,
  type KanbanColumn,
  type KanbanItemMoveEvent,
  type KanbanCardConfig
} from './kanban-board.component';

// Re-export child components for convenience
export { KanbanColumnComponent, type KanbanDropEvent } from '../kanban-column';
export { KanbanCardComponent, type KanbanCardBadge } from '../kanban-card';
