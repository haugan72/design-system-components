# Data Table Component

A professional, feature-rich Angular data table component with sorting, pagination, row selection, and accessibility built-in.

## Features

- ✅ **Sortable columns** - Click headers to sort ascending/descending
- ✅ **Pagination** - Built-in pagination with configurable page size
- ✅ **Row selection** - Select individual rows or all rows
- ✅ **Loading states** - Built-in loading spinner
- ✅ **Error handling** - Display error messages
- ✅ **Empty states** - Customizable empty message
- ✅ **Responsive** - Mobile-friendly design
- ✅ **Accessible** - WCAG AA compliant
- ✅ **Customizable** - Striped, hoverable, bordered, compact modes
- ✅ **Sticky header** - Optional sticky header for long tables

## Installation

```typescript
import { DataTableComponent } from './components/data-table';

@Component({
  imports: [DataTableComponent],
  // ...
})
```

## Basic Usage

```html
<app-data-table
  [data]="users()"
  [columns]="columns">
</app-data-table>
```

```typescript
export class MyComponent {
  users = signal([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' }
  ]);

  columns: TableColumn[] = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role' }
  ];
}
```

## Advanced Usage

### With Sorting, Pagination, and Selection

```html
<app-data-table
  [data]="employees()"
  [columns]="columns"
  [config]="{striped: true, hoverable: true, stickyHeader: true}"
  [selectable]="true"
  [pageSize]="10"
  [currentPage]="currentPage()"
  [loading]="isLoading()"
  (rowClick)="onRowClick($event)"
  (sortChange)="onSortChange($event)"
  (selectionChange)="onSelectionChange($event)"
  (pageChange)="onPageChange($event)">
</app-data-table>
```

### Custom Formatters

```typescript
columns: TableColumn[] = [
  {
    key: 'createdAt',
    label: 'Created',
    sortable: true,
    formatter: (value) => new Date(value).toLocaleDateString()
  },
  {
    key: 'salary',
    label: 'Salary',
    align: 'right',
    formatter: (value) => `$${value.toLocaleString()}`
  }
];
```

## API Reference

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `data` | `T[]` | required | Array of data to display |
| `columns` | `TableColumn<T>[]` | required | Column definitions |
| `config` | `TableConfig` | `{striped: true, hoverable: true}` | Table configuration |
| `loading` | `boolean` | `false` | Show loading state |
| `error` | `string` | - | Error message to display |
| `selectable` | `boolean` | `false` | Enable row selection |
| `selectedRows` | `T[]` | `[]` | Pre-selected rows |
| `emptyMessage` | `string` | `'No data available'` | Empty state message |
| `pageSize` | `number` | `10` | Rows per page (0 = no pagination) |
| `currentPage` | `number` | `0` | Current page (0-indexed) |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `rowClick` | `T` | Emitted when row is clicked |
| `sortChange` | `SortState` | Emitted when sort changes |
| `selectionChange` | `T[]` | Emitted when selection changes |
| `pageChange` | `number` | Emitted when page changes |

### Types

```typescript
interface TableColumn<T> {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  formatter?: (value: any, row: T) => string;
}

interface TableConfig {
  striped?: boolean;      // Alternating row colors
  hoverable?: boolean;    // Hover effect on rows
  bordered?: boolean;     // Borders between cells
  compact?: boolean;      // Reduced padding
  stickyHeader?: boolean; // Fixed header on scroll
}

interface SortState {
  column: string;
  direction: 'asc' | 'desc' | null;
}
```

## Examples

### Employee Table

```typescript
export class EmployeeList {
  employees = signal([
    { id: 1, name: 'John Doe', department: 'Engineering', salary: 120000, startDate: '2020-01-15' },
    { id: 2, name: 'Jane Smith', department: 'Marketing', salary: 95000, startDate: '2021-03-20' },
    { id: 3, name: 'Bob Johnson', department: 'Sales', salary: 85000, startDate: '2019-11-10' }
  ]);

  columns: TableColumn[] = [
    { key: 'name', label: 'Name', sortable: true, width: '200px' },
    { key: 'department', label: 'Department', sortable: true },
    {
      key: 'salary',
      label: 'Salary',
      sortable: true,
      align: 'right',
      formatter: (value) => `$${value.toLocaleString()}`
    },
    {
      key: 'startDate',
      label: 'Start Date',
      sortable: true,
      formatter: (value) => new Date(value).toLocaleDateString()
    }
  ];

  currentPage = signal(0);
  selectedEmployees = signal<Employee[]>([]);

  onRowClick(employee: Employee) {
    console.log('Clicked:', employee);
    // Navigate to employee details
  }

  onSelectionChange(selected: Employee[]) {
    this.selectedEmployees.set(selected);
    console.log('Selected:', selected.length, 'employees');
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
  }
}
```

### With Loading and Error States

```typescript
export class DataComponent {
  data = signal<User[]>([]);
  isLoading = signal(true);
  errorMessage = signal<string | undefined>(undefined);

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.isLoading.set(true);
    this.errorMessage.set(undefined);

    try {
      const response = await this.api.getUsers();
      this.data.set(response);
    } catch (error) {
      this.errorMessage.set('Failed to load data. Please try again.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
```

## Styling

The component uses CSS variables from the Modern Business Design System:

```css
--color-primary: #2563EB
--color-bg: #FFFFFF
--color-border: #E5E7EB
--color-text-primary: #1F2937
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
```

## Accessibility

- ✅ Semantic HTML table structure
- ✅ ARIA labels for sorting and selection
- ✅ Keyboard navigation support
- ✅ Screen reader friendly
- ✅ Focus visible states
- ✅ Reduced motion support

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

Part of the Modern Business Design System.
