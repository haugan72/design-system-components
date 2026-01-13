# Search Box Component

A specialized search input component with debounced search, clear button, and optimized styling for search use cases.

## Features

- ✅ Rounded pill-shaped design
- ✅ Debounced search (default 300ms)
- ✅ Minimum length validation
- ✅ Clear button with Escape key support
- ✅ Search icon indicator
- ✅ Two-way data binding with model()
- ✅ Autofocus option
- ✅ Disabled state
- ✅ WCAG AA accessible
- ✅ TypeScript with Angular Signals

## Installation

```typescript
import { SearchBoxComponent } from './components/search-box';

@Component({
  standalone: true,
  imports: [SearchBoxComponent],
  // ...
})
```

## Basic Usage

```html
<app-search-box
  [(value)]="searchQuery"
  (search)="onSearch($event)">
</app-search-box>
```

```typescript
export class AppComponent {
  searchQuery = '';

  onSearch(query: string): void {
    console.log('Searching for:', query);
    // Perform search...
  }
}
```

## Examples

### Product Search
```html
<app-search-box
  [(value)]="productSearch"
  placeholder="Search products..."
  (search)="searchProducts($event)">
</app-search-box>
```

```typescript
export class ProductsComponent {
  productSearch = '';

  searchProducts(query: string): void {
    if (query) {
      this.api.searchProducts(query).subscribe(results => {
        this.products = results;
      });
    } else {
      this.loadAllProducts();
    }
  }
}
```

### Custom Debounce Time
```html
<app-search-box
  [(value)]="query"
  [debounceTime]="500"
  (search)="onSearch($event)">
</app-search-box>
```

### Minimum Length Requirement
```html
<app-search-box
  [(value)]="query"
  [minLength]="3"
  placeholder="Type at least 3 characters..."
  (search)="onSearch($event)">
</app-search-box>
```

### With Clear Callback
```html
<app-search-box
  [(value)]="query"
  (search)="onSearch($event)"
  (cleared)="onCleared()">
</app-search-box>
```

```typescript
export class SearchComponent {
  query = '';

  onSearch(q: string): void {
    console.log('Search:', q);
  }

  onCleared(): void {
    console.log('Search cleared');
    this.resetResults();
  }
}
```

### Disabled State
```html
<app-search-box
  [value]="query"
  [disabled]="isLoading"
  placeholder="Loading...">
</app-search-box>
```

### Autofocus
```html
<app-search-box
  [(value)]="query"
  [autoFocus]="true"
  (search)="onSearch($event)">
</app-search-box>
```

### Without Clear Button
```html
<app-search-box
  [(value)]="query"
  [showClearButton]="false"
  (search)="onSearch($event)">
</app-search-box>
```

## API Reference

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `value` | `string` (model) | `''` | Search query (two-way binding) |
| `placeholder` | `string` | `'Search...'` | Placeholder text |
| `disabled` | `boolean` | `false` | Disabled state |
| `debounceTime` | `number` | `300` | Debounce delay in milliseconds |
| `minLength` | `number` | `0` | Minimum characters before search |
| `showClearButton` | `boolean` | `true` | Show clear button |
| `autoFocus` | `boolean` | `false` | Auto-focus on mount |
| `id` | `string` | auto-generated | Unique ID for input element |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `search` | `EventEmitter<string>` | Emitted after debounce delay (or immediately when cleared) |
| `cleared` | `EventEmitter<void>` | Emitted when clear button clicked or Escape pressed |
| `focused` | `EventEmitter<void>` | Emitted when input receives focus |
| `blurred` | `EventEmitter<void>` | Emitted when input loses focus |

## Advanced Examples

### Real-time Search with Loading State
```html
<app-search-box
  [(value)]="searchQuery"
  [disabled]="isSearching"
  [placeholder]="isSearching ? 'Searching...' : 'Search...'"
  (search)="performSearch($event)">
</app-search-box>

@if (isSearching) {
  <div class="loading">Searching...</div>
}

@if (results.length > 0) {
  <ul class="results">
    @for (result of results; track result.id) {
      <li>{{ result.name }}</li>
    }
  </ul>
}
```

```typescript
export class SearchComponent {
  searchQuery = '';
  isSearching = false;
  results: any[] = [];

  async performSearch(query: string): Promise<void> {
    if (!query) {
      this.results = [];
      return;
    }

    this.isSearching = true;
    try {
      this.results = await this.api.search(query);
    } finally {
      this.isSearching = false;
    }
  }
}
```

### Search with Filters
```html
<div class="search-filters">
  <app-search-box
    [(value)]="searchQuery"
    [minLength]="2"
    (search)="onSearchChange($event)">
  </app-search-box>

  <select [(ngModel)]="category" (change)="onSearchChange(searchQuery)">
    <option value="">All Categories</option>
    <option value="products">Products</option>
    <option value="articles">Articles</option>
    <option value="users">Users</option>
  </select>
</div>
```

```typescript
export class SearchComponent {
  searchQuery = '';
  category = '';

  onSearchChange(query: string): void {
    this.api.search({
      query,
      category: this.category
    }).subscribe(results => {
      this.results = results;
    });
  }
}
```

### Search with Suggestions
```html
<div class="search-container">
  <app-search-box
    [(value)]="searchQuery"
    [debounceTime]="200"
    (search)="loadSuggestions($event)"
    (focused)="showSuggestions = true"
    (blurred)="hideSuggestions()">
  </app-search-box>

  @if (showSuggestions && suggestions.length > 0) {
    <ul class="suggestions">
      @for (suggestion of suggestions; track suggestion) {
        <li (click)="selectSuggestion(suggestion)">
          {{ suggestion }}
        </li>
      }
    </ul>
  }
</div>
```

```typescript
export class SearchComponent {
  searchQuery = '';
  showSuggestions = false;
  suggestions: string[] = [];

  loadSuggestions(query: string): void {
    if (query.length >= 2) {
      this.api.getSuggestions(query).subscribe(data => {
        this.suggestions = data;
      });
    } else {
      this.suggestions = [];
    }
  }

  selectSuggestion(suggestion: string): void {
    this.searchQuery = suggestion;
    this.showSuggestions = false;
    this.performSearch(suggestion);
  }

  hideSuggestions(): void {
    setTimeout(() => {
      this.showSuggestions = false;
    }, 200);
  }
}
```

### Multi-field Search
```html
<div class="advanced-search">
  <app-search-box
    [(value)]="searches.name"
    placeholder="Search by name..."
    (search)="updateSearch()">
  </app-search-box>

  <app-search-box
    [(value)]="searches.email"
    placeholder="Search by email..."
    (search)="updateSearch()">
  </app-search-box>

  <app-search-box
    [(value)]="searches.company"
    placeholder="Search by company..."
    (search)="updateSearch()">
  </app-search-box>
</div>
```

```typescript
export class AdvancedSearchComponent {
  searches = {
    name: '',
    email: '',
    company: ''
  };

  updateSearch(): void {
    const filters = Object.entries(this.searches)
      .filter(([_, value]) => value)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    this.api.searchWithFilters(filters).subscribe(results => {
      this.results = results;
    });
  }
}
```

## Styling

The component uses DesignSystemA design tokens:

```css
:root {
  --color-primary: #6366F1;         /* Focus state */
  --color-border: #E5E7EB;          /* Default border */
  --color-surface: #FFFFFF;         /* Background */
  --radius-full: 9999px;            /* Pill shape */
}
```

### Custom Styling

```css
/* Full width search box */
.search-box-container {
  max-width: 100%;
}

/* Compact search box */
.search-box-compact .search-box-container {
  height: 40px;
  max-width: 400px;
}

/* Custom colors */
.search-box-container {
  border-color: #10B981;
}

.search-box-focused {
  border-color: #10B981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}
```

## Accessibility

- ✅ **Keyboard Support**: Full keyboard navigation, Escape to clear
- ✅ **ARIA Labels**: Proper aria-label for screen readers
- ✅ **Focus Management**: Clear focus indicators
- ✅ **Screen Reader**: Search icon hidden from screen readers
- ✅ **Color Contrast**: WCAG AA compliant
- ✅ **Reduced Motion**: Respects `prefers-reduced-motion`

## Best Practices

### Do's ✅
- Use debounce to avoid excessive API calls
- Set minimum length for complex searches
- Show loading state during search
- Clear results when search is cleared
- Provide helpful placeholder text
- Show clear button for easy reset

### Don'ts ❌
- Don't search on every keystroke without debounce
- Don't forget to handle empty search queries
- Don't ignore minimum length validation
- Don't make the search box too narrow
- Don't disable clear button when it's useful

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes

- Search emits after debounce delay (default 300ms)
- Empty search emits immediately without debounce
- Escape key clears search and removes focus
- Clear button only shows when search has value
- Minimum length checked before emitting search
- Two-way binding works with `[(value)]` syntax
- Native search input type for better mobile support

## Dependencies

- Angular 19+ with Signals
- No external UI libraries required
- Uses CSS variables for theming
