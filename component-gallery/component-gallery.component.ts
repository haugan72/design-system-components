import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpiCardComponent, type SparklineDataPoint } from '../kpi-card/kpi-card.component';
import { DataTableComponent, type TableColumn } from '../data-table/data-table.component';
import { FormComponent, type FormField } from '../form/form.component';
import { ModalComponent } from '../modal/modal.component';
import { NotificationComponent, type Notification } from '../notification/notification.component';
import { HeroComponent } from '../hero/hero.component';
import { ListComponent, type ListItem } from '../list/list.component';
import { AccordionComponent, type AccordionItem } from '../accordion/accordion.component';
import { CurrencyInputComponent } from '../currency-input/currency-input.component';
import { RepeaterFieldComponent, type RepeaterConfig, type RepeaterItem } from '../repeater-field/repeater-field.component';
import { KanbanBoardComponent, type KanbanColumn, type KanbanCardConfig } from '../kanban-board/kanban-board.component';
import { KanbanColumnComponent } from '../kanban-column/kanban-column.component';
import { KanbanCardComponent } from '../kanban-card/kanban-card.component';
import { ViewToggleComponent, type ViewToggleOption } from '../view-toggle/view-toggle.component';

/**
 * Component metadata for gallery display
 */
interface ComponentInfo {
  name: string;
  description: string;
  category: 'data-visualization' | 'forms' | 'layout' | 'navigation' | 'feedback';
  version: string;
  tags: string[];
  status: 'stable' | 'beta' | 'experimental';
}

/**
 * Component Gallery
 *
 * A comprehensive showcase of all available UI components in the design system.
 * Automatically displays components with interactive examples, documentation links,
 * and live demos.
 *
 * Features:
 * - Live component previews
 * - Category filtering
 * - Search functionality
 * - Responsive grid layout
 * - Component metadata display
 * - Direct links to documentation
 *
 * @example
 * ```html
 * <app-component-gallery></app-component-gallery>
 * ```
 */
@Component({
  selector: 'app-component-gallery',
  standalone: true,
  imports: [CommonModule, KpiCardComponent, DataTableComponent, FormComponent, ModalComponent, NotificationComponent, HeroComponent, ListComponent, AccordionComponent, CurrencyInputComponent, RepeaterFieldComponent, KanbanBoardComponent, KanbanColumnComponent, KanbanCardComponent, ViewToggleComponent],
  templateUrl: './component-gallery.component.html',
  styleUrl: './component-gallery.component.css'
})
export class ComponentGalleryComponent {
  // ========================================
  // State Management
  // ========================================

  /** Search query for filtering components */
  searchQuery = signal('');

  /** Selected category filter */
  selectedCategory = signal<string>('all');

  /** Active component for detailed view */
  activeComponent = signal<string | null>(null);

  // ========================================
  // Component Registry
  // ========================================

  /** Registry of all available components */
  readonly components = signal<ComponentInfo[]>([
    {
      name: 'KPI Card',
      description: 'Professional card for displaying key performance indicators with trends, sparklines, and interactive features.',
      category: 'data-visualization',
      version: '1.0.0',
      tags: ['metrics', 'dashboard', 'charts', 'trends'],
      status: 'stable'
    },
    {
      name: 'Data Table',
      description: 'Feature-rich table component with sorting, pagination, row selection, and accessibility built-in.',
      category: 'data-visualization',
      version: '1.0.0',
      tags: ['table', 'data', 'sorting', 'pagination', 'selection'],
      status: 'stable'
    },
    {
      name: 'Form',
      description: 'Flexible form component with built-in validation, multiple field types, and customizable layouts.',
      category: 'forms',
      version: '1.0.0',
      tags: ['form', 'validation', 'input', 'fields', 'submit'],
      status: 'stable'
    },
    {
      name: 'Modal',
      description: 'Accessible modal dialog component with smooth animations, keyboard support, and focus management.',
      category: 'feedback',
      version: '1.0.0',
      tags: ['modal', 'dialog', 'overlay', 'popup', 'animations'],
      status: 'stable'
    },
    {
      name: 'Notification',
      description: 'Toast/alert notification component with auto-dismiss, multiple types, positions, and animations.',
      category: 'feedback',
      version: '1.0.0',
      tags: ['notification', 'toast', 'alert', 'message', 'snackbar'],
      status: 'stable'
    },
    {
      name: 'Hero',
      description: 'Flexible hero section component for landing pages with multiple background options and CTA buttons.',
      category: 'layout',
      version: '1.0.0',
      tags: ['hero', 'landing', 'banner', 'cta', 'background'],
      status: 'stable'
    },
    {
      name: 'List',
      description: 'Flexible list component for displaying collections with search, filter, and selection support.',
      category: 'data-visualization',
      version: '1.0.0',
      tags: ['list', 'search', 'filter', 'selection', 'collection'],
      status: 'stable'
    },
    {
      name: 'Accordion',
      description: 'Collapsible content sections component with expand/collapse functionality and smooth animations.',
      category: 'layout',
      version: '1.0.0',
      tags: ['accordion', 'collapse', 'expand', 'sections', 'faq'],
      status: 'stable'
    },
    {
      name: 'Currency Input',
      description: 'Specialized input field for currency values with Norwegian formatting (1 234 567 kr) and configurable currency symbols.',
      category: 'forms',
      version: '1.0.0',
      tags: ['currency', 'money', 'input', 'number', 'norwegian', 'formatting'],
      status: 'stable'
    },
    {
      name: 'Repeater Field',
      description: 'Dynamic form component for adding/removing multiple items of the same type with built-in field types and validation.',
      category: 'forms',
      version: '1.0.0',
      tags: ['repeater', 'dynamic', 'array', 'multiple', 'form', 'collection'],
      status: 'stable'
    },
    {
      name: 'Kanban Board',
      description: 'Complete Kanban board with horizontal scrolling columns and drag-and-drop support for organizing items by status.',
      category: 'data-visualization',
      version: '1.0.0',
      tags: ['kanban', 'board', 'drag-drop', 'columns', 'workflow', 'status'],
      status: 'stable'
    },
    {
      name: 'Kanban Column',
      description: 'Column container for Kanban board with drop zone functionality, header with icon and count badge.',
      category: 'layout',
      version: '1.0.0',
      tags: ['kanban', 'column', 'drop-zone', 'container'],
      status: 'stable'
    },
    {
      name: 'Kanban Card',
      description: 'Draggable card for Kanban boards with title, subtitle, badge, and progress bar support.',
      category: 'data-visualization',
      version: '1.0.0',
      tags: ['kanban', 'card', 'draggable', 'item'],
      status: 'stable'
    },
    {
      name: 'View Toggle',
      description: 'Button group for switching between view modes (e.g., table vs kanban) with icon support and keyboard navigation.',
      category: 'navigation',
      version: '1.0.0',
      tags: ['toggle', 'view', 'switch', 'buttons', 'group'],
      status: 'stable'
    },
    // Add more components as they are created
  ]);

  /** Available categories */
  readonly categories = signal([
    { id: 'all', label: 'All Components', icon: '📦' },
    { id: 'data-visualization', label: 'Data Visualization', icon: '📊' },
    { id: 'forms', label: 'Forms & Inputs', icon: '📝' },
    { id: 'layout', label: 'Layout', icon: '🔲' },
    { id: 'navigation', label: 'Navigation', icon: '🧭' },
    { id: 'feedback', label: 'Feedback', icon: '💬' },
  ]);

  // ========================================
  // Computed Properties
  // ========================================

  /** Filtered components based on search and category */
  readonly filteredComponents = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const category = this.selectedCategory();
    let filtered = this.components();

    // Filter by category
    if (category !== 'all') {
      filtered = filtered.filter(c => c.category === category);
    }

    // Filter by search query
    if (query) {
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query) ||
        c.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  });

  /** Component count by category */
  readonly componentCountByCategory = computed(() => {
    const components = this.components();
    return {
      all: components.length,
      'data-visualization': components.filter(c => c.category === 'data-visualization').length,
      'forms': components.filter(c => c.category === 'forms').length,
      'layout': components.filter(c => c.category === 'layout').length,
      'navigation': components.filter(c => c.category === 'navigation').length,
      'feedback': components.filter(c => c.category === 'feedback').length,
    };
  });

  // ========================================
  // Sample Data for Component Demos
  // ========================================

  readonly sampleSparklineData = signal<SparklineDataPoint[]>([
    { value: 32, label: 'Jan: $32K' },
    { value: 41, label: 'Feb: $41K' },
    { value: 38, label: 'Mar: $38K' },
    { value: 45, label: 'Apr: $45K' },
    { value: 48, label: 'May: $48K' },
  ]);

  readonly kpiExamples = signal([
    {
      label: 'Total Revenue',
      value: '$2.4M',
      icon: '💰',
      trend: 12.5,
      direction: 'up' as const,
      trendLabel: 'from last quarter',
      showSparkline: true
    },
    {
      label: 'Active Users',
      value: '12,450',
      icon: '👥',
      trend: 8.3,
      direction: 'up' as const,
      trendLabel: 'this month',
      showSparkline: false
    },
    {
      label: 'Satisfaction',
      value: '94%',
      icon: '😊',
      trend: 3.2,
      direction: 'up' as const,
      trendLabel: 'from last quarter',
      showSparkline: false
    },
    {
      label: 'Open Issues',
      value: '23',
      icon: '⚠️',
      trend: 15.0,
      direction: 'down' as const,
      trendLabel: 'from last week',
      showSparkline: false
    }
  ]);

  readonly tableData = signal([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
    { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'Editor', status: 'Active' },
    { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'Active' }
  ]);

  readonly tableColumns = signal<TableColumn[]>([
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'status', label: 'Status', sortable: true }
  ]);

  readonly sampleFormFields = signal<FormField[]>([
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'Enter your name',
      required: true
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'your@email.com',
      required: true,
      validation: { email: true }
    },
    {
      name: 'message',
      label: 'Message',
      type: 'textarea',
      placeholder: 'Your message here...',
      rows: 3,
      validation: { minLength: 10 }
    }
  ]);

  readonly showDemoModal = signal(false);

  readonly demoNotifications = signal<Notification[]>([]);

  readonly sampleListItems = signal<ListItem[]>([
    {
      id: 1,
      title: 'Project Planning',
      subtitle: 'Due: Today',
      description: 'Review and finalize Q1 project roadmap',
      icon: '📋',
      badge: 'High Priority',
      badgeType: 'danger'
    },
    {
      id: 2,
      title: 'Design Review',
      subtitle: 'Due: Tomorrow',
      description: 'Evaluate new UI mockups for dashboard',
      icon: '🎨',
      badge: 'In Progress',
      badgeType: 'info'
    },
    {
      id: 3,
      title: 'Code Review',
      subtitle: 'Due: Friday',
      description: 'Review authentication module pull request',
      icon: '💻',
      badge: 'Ready',
      badgeType: 'success'
    }
  ]);

  readonly sampleAccordionItems = signal<AccordionItem[]>([
    {
      id: 1,
      title: 'What is this component gallery?',
      content: 'This is a showcase of all available UI components in the Modern Business Design System. Each component is built with Angular Signals and standalone architecture.',
      icon: '📦',
      expanded: true
    },
    {
      id: 2,
      title: 'How do I use these components?',
      content: 'Import the component you need into your Angular application, pass the required inputs, and handle any outputs. Check the documentation for each component for detailed usage instructions.',
      icon: '🔧'
    },
    {
      id: 3,
      title: 'Are these components accessible?',
      content: 'Yes! All components are built with accessibility in mind, including ARIA labels, keyboard navigation, and screen reader support.',
      icon: '♿'
    }
  ]);

  readonly sampleCurrencyValue = signal<number | null>(2500000);

  readonly sampleRepeaterConfig = signal<RepeaterConfig>({
    itemLabel: 'Loan',
    addButtonLabel: 'Add Loan',
    removeButtonLabel: 'Remove',
    minItems: 0,
    maxItems: 3,
    itemFields: [
      {
        fieldName: 'lender',
        label: 'Lender',
        type: 'text',
        required: false,
        placeholder: 'e.g. DNB'
      },
      {
        fieldName: 'amount',
        label: 'Amount',
        type: 'currency',
        required: true,
        currency: 'kr',
        currencyPosition: 'suffix',
        decimals: 0
      }
    ]
  });

  readonly sampleRepeaterItems = signal<RepeaterItem[]>([]);

  // Kanban Board Sample Data
  readonly sampleKanbanColumns = signal<KanbanColumn[]>([
    { id: 'todo', title: 'To Do', icon: '📋' },
    { id: 'in-progress', title: 'In Progress', icon: '🔄' },
    { id: 'done', title: 'Done', icon: '✅', color: '#10B981' }
  ]);

  readonly sampleKanbanItems = signal([
    { id: 1, title: 'Design homepage', email: 'design@example.com', status: 'todo', priority: 'HIGH', progress: 0 },
    { id: 2, title: 'Build API', email: 'api@example.com', status: 'in-progress', priority: 'MEDIUM', progress: 45 },
    { id: 3, title: 'Write tests', email: 'test@example.com', status: 'in-progress', priority: 'LOW', progress: 70 },
    { id: 4, title: 'Deploy app', email: 'deploy@example.com', status: 'done', priority: 'HIGH', progress: 100 }
  ]);

  readonly sampleKanbanCardConfig = signal<KanbanCardConfig>({
    titleField: 'title',
    subtitleField: 'email',
    progressField: 'progress',
    badgeField: 'priority',
    badgeVariantMap: {
      'LOW': 'neutral',
      'MEDIUM': 'info',
      'HIGH': 'danger'
    }
  });

  // View Toggle Sample Data
  readonly sampleViewOptions = signal<ViewToggleOption[]>([
    {
      id: 'table',
      icon: '<svg viewBox="0 0 16 16" fill="none"><path d="M2 4H14M2 8H14M2 12H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
      label: 'Table View'
    },
    {
      id: 'kanban',
      icon: '<svg viewBox="0 0 16 16" fill="none"><rect x="1" y="2" width="4" height="12" rx="1" stroke="currentColor" stroke-width="1.5" fill="none"/><rect x="6" y="2" width="4" height="8" rx="1" stroke="currentColor" stroke-width="1.5" fill="none"/><rect x="11" y="2" width="4" height="10" rx="1" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>',
      label: 'Kanban View'
    }
  ]);

  readonly sampleCurrentView = signal('table');

  // ========================================
  // Methods
  // ========================================

  /**
   * Show demo notification
   */
  showNotification(type: 'success' | 'error' | 'warning' | 'info'): void {
    const messages = {
      success: 'Operation completed successfully!',
      error: 'An error occurred. Please try again.',
      warning: 'Please review your input.',
      info: 'Here is some useful information.'
    };

    const notification: Notification = {
      id: crypto.randomUUID(),
      type,
      message: messages[type],
      config: { duration: 5000, position: 'top-right' }
    };

    this.demoNotifications.update(notifs => [...notifs, notification]);
  }

  /**
   * Dismiss notification
   */
  dismissNotification(id: string): void {
    this.demoNotifications.update(notifs => notifs.filter(n => n.id !== id));
  }

  /**
   * Update search query
   */
  onSearch(query: string): void {
    this.searchQuery.set(query);
  }

  /**
   * Select category filter
   */
  selectCategory(categoryId: string): void {
    this.selectedCategory.set(categoryId);
  }

  /**
   * Show component details
   */
  showComponentDetails(componentName: string): void {
    this.activeComponent.set(componentName);
  }

  /**
   * Close component details
   */
  closeComponentDetails(): void {
    this.activeComponent.set(null);
  }

  /**
   * Get status badge color
   */
  getStatusColor(status: string): string {
    switch (status) {
      case 'stable': return 'success';
      case 'beta': return 'warning';
      case 'experimental': return 'info';
      default: return 'neutral';
    }
  }

  /**
   * Navigate to component documentation
   */
  viewDocumentation(componentName: string): void {
    console.log(`Viewing documentation for: ${componentName}`);
    // In a real app, this would navigate to the docs
    alert(`Opening documentation for ${componentName}...`);
  }

  /**
   * Copy component import code
   */
  copyImportCode(componentName: string): void {
    const importCode = this.getComponentImportCode(componentName);
    navigator.clipboard.writeText(importCode).then(() => {
      alert('Import code copied to clipboard!');
    });
  }

  /**
   * Get import code for a component
   */
  private getComponentImportCode(componentName: string): string {
    const componentMap: Record<string, string> = {
      'KPI Card': `import { KpiCardComponent } from './components/kpi-card';

@Component({
  imports: [KpiCardComponent],
  // ...
})`,
      'Data Table': `import { DataTableComponent } from './components/data-table';

@Component({
  imports: [DataTableComponent],
  // ...
})`,
      'Form': `import { FormComponent } from './components/form';

@Component({
  imports: [FormComponent],
  // ...
})`,
      'Modal': `import { ModalComponent } from './components/modal';

@Component({
  imports: [ModalComponent],
  // ...
})`,
      'Notification': `import { NotificationComponent } from './components/notification';

@Component({
  imports: [NotificationComponent],
  // ...
})`,
      'Hero': `import { HeroComponent } from './components/hero';

@Component({
  imports: [HeroComponent],
  // ...
})`,
      'List': `import { ListComponent } from './components/list';

@Component({
  imports: [ListComponent],
  // ...
})`,
      'Accordion': `import { AccordionComponent } from './components/accordion';

@Component({
  imports: [AccordionComponent],
  // ...
})`,
      'Currency Input': `import { CurrencyInputComponent } from './components/currency-input';

@Component({
  imports: [CurrencyInputComponent],
  // ...
})`,
      'Repeater Field': `import { RepeaterFieldComponent } from './components/repeater-field';

@Component({
  imports: [RepeaterFieldComponent],
  // ...
})`,
      'Kanban Board': `import { KanbanBoardComponent } from './components/kanban-board';

@Component({
  imports: [KanbanBoardComponent],
  // ...
})`,
      'Kanban Column': `import { KanbanColumnComponent } from './components/kanban-column';

@Component({
  imports: [KanbanColumnComponent],
  // ...
})`,
      'Kanban Card': `import { KanbanCardComponent } from './components/kanban-card';

@Component({
  imports: [KanbanCardComponent],
  // ...
})`,
      'View Toggle': `import { ViewToggleComponent } from './components/view-toggle';

@Component({
  imports: [ViewToggleComponent],
  // ...
})`,
      // Add more components as they are created
    };

    return componentMap[componentName] || `// Import code for ${componentName}`;
  }
}
