# Component Gallery

A comprehensive, interactive showcase for all UI components in the Modern Business Design System. Built with Angular Signals and modern best practices.

## Overview

The Component Gallery provides a beautiful, searchable interface for exploring all available components in your design system. It includes live previews, documentation links, and copy-paste import code.

## Features

### 🎨 Visual Showcase
- **Live component previews** with real data
- **Interactive examples** demonstrating all features
- **Beautiful gradient header** with stats
- **Professional card-based layout**

### 🔍 Search & Filter
- **Instant search** across component names, descriptions, and tags
- **Category filtering** (Data Visualization, Forms, Layout, Navigation, Feedback)
- **Results count** with active filter display
- **Clear filters** quick action

### 📱 Responsive Design
- **Mobile-optimized** layout with adaptive grid
- **Tablet support** with optimized spacing
- **Desktop experience** with multi-column layout
- **Touch-friendly** interactions

### ♿ Accessibility
- **WCAG AA compliant** color contrast
- **Keyboard navigation** support
- **ARIA labels** for screen readers
- **Focus management** with visible indicators
- **Reduced motion** support

### 🚀 Developer Experience
- **Copy import code** with one click
- **View documentation** quick links
- **Component metadata** (version, status, tags)
- **Status badges** (stable, beta, experimental)

## Installation

1. Copy the component gallery to your project:
```bash
cp -r shared/design-systems/components/component-gallery apps/your-app/src/app/components/
```

2. Import in your Angular component:
```typescript
import { ComponentGalleryComponent } from './components/component-gallery';

@Component({
  standalone: true,
  imports: [ComponentGalleryComponent],
  // ...
})
```

3. Use in your template:
```html
<app-component-gallery></app-component-gallery>
```

## Usage

### Basic Setup

```typescript
import { Component } from '@angular/core';
import { ComponentGalleryComponent } from './components/component-gallery';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ComponentGalleryComponent],
  template: `
    <app-component-gallery></app-component-gallery>
  `
})
export class AppComponent {}
```

### Adding New Components to the Gallery

To add a new component to the gallery, update the `components` signal in `component-gallery.component.ts`:

```typescript
readonly components = signal<ComponentInfo[]>([
  {
    name: 'KPI Card',
    description: 'Professional card for displaying key performance indicators...',
    category: 'data-visualization',
    version: '1.0.0',
    tags: ['metrics', 'dashboard', 'charts', 'trends'],
    status: 'stable'
  },
  {
    name: 'Your New Component',
    description: 'Description of your new component...',
    category: 'forms', // or 'layout', 'navigation', 'feedback'
    version: '1.0.0',
    tags: ['tag1', 'tag2', 'tag3'],
    status: 'beta' // or 'stable', 'experimental'
  }
]);
```

### Adding Component Previews

Add a preview case in the template (`component-gallery.component.html`):

```html
@switch (component.name) {
  @case ('KPI Card') {
    <!-- KPI Card preview -->
  }

  @case ('Your New Component') {
    <div class="preview-grid">
      <app-your-component
        [property]="value"
        (event)="handler()">
      </app-your-component>
    </div>
  }
}
```

Don't forget to import the component in the gallery's TypeScript file:

```typescript
import { YourComponent } from '../your-component/your-component.component';

@Component({
  imports: [CommonModule, KpiCardComponent, YourComponent],
  // ...
})
```

## Component Interface

### ComponentInfo

```typescript
interface ComponentInfo {
  name: string;           // Display name (e.g., "KPI Card")
  description: string;    // Brief description
  category: 'data-visualization' | 'forms' | 'layout' | 'navigation' | 'feedback';
  version: string;        // Semantic version (e.g., "1.0.0")
  tags: string[];        // Searchable tags
  status: 'stable' | 'beta' | 'experimental';
}
```

## Categories

The gallery organizes components into 5 categories:

| Category | Icon | Description |
|----------|------|-------------|
| **Data Visualization** | 📊 | Charts, graphs, KPIs, metrics |
| **Forms & Inputs** | 📝 | Input fields, selects, checkboxes, toggles |
| **Layout** | 🔲 | Grids, containers, panels, cards |
| **Navigation** | 🧭 | Menus, tabs, breadcrumbs, pagination |
| **Feedback** | 💬 | Toasts, modals, alerts, notifications |

## Status Badges

Components can have one of three status levels:

- **Stable** (Green): Production-ready, fully tested
- **Beta** (Yellow): Feature-complete, undergoing testing
- **Experimental** (Blue): Early stage, API may change

## Features in Detail

### Search Functionality
- Real-time filtering as you type
- Searches component name, description, and tags
- Case-insensitive matching
- Results count updates instantly

### Category Filtering
- Click any category chip to filter
- Shows component count per category
- "All Components" shows everything
- Combines with search filtering

### Component Cards
Each component card displays:
- Component name and status badge
- Version number
- Full description
- Searchable tags
- Live preview (if available)
- Action buttons (docs, copy, details)

### Action Buttons
- **Documentation**: View full component docs
- **Copy Import**: Copy import code to clipboard
- **Details**: Open modal with more information

### Modal Details
Click the info button on any card to see:
- Extended documentation
- API reference
- Usage guidelines
- Accessibility notes

## Customization

### Updating the Header
Edit the header section in the template:

```html
<header class="gallery-header">
  <div class="header-content">
    <h1 class="gallery-title">Your Title</h1>
    <p class="gallery-subtitle">Your subtitle...</p>
  </div>
</header>
```

### Changing Colors
The gallery uses CSS variables from the Modern Business Design System:

```css
/* Override in your app's global styles */
:root {
  --color-primary: #2563EB;
  --color-success: #10B981;
  --color-warning: #F59E0B;
  /* etc. */
}
```

### Custom Categories
Add new categories by updating the `categories` signal:

```typescript
readonly categories = signal([
  { id: 'all', label: 'All Components', icon: '📦' },
  { id: 'custom', label: 'Custom Category', icon: '⭐' },
  // ...
]);
```

## Routing Integration

To use the gallery as a route in your app:

```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { ComponentGalleryComponent } from './components/component-gallery';

export const routes: Routes = [
  {
    path: 'components',
    component: ComponentGalleryComponent,
    title: 'Component Gallery'
  },
  // other routes...
];
```

Then navigate to `/components` to view the gallery.

## Example: Complete Setup

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ComponentGalleryComponent } from './components/component-gallery';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ComponentGalleryComponent],
  template: `
    <nav>
      <a routerLink="/">Home</a>
      <a routerLink="/components">Components</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}

// app.routes.ts
import { Routes } from '@angular/router';
import { ComponentGalleryComponent } from './components/component-gallery';

export const routes: Routes = [
  { path: '', redirectTo: '/components', pathMatch: 'full' },
  { path: 'components', component: ComponentGalleryComponent },
];
```

## Performance Tips

1. **Lazy load components**: Use dynamic imports for large component libraries
2. **Virtual scrolling**: For galleries with 100+ components
3. **Image optimization**: Compress preview screenshots
4. **Code splitting**: Load component previews on demand
5. **Memoization**: Use `computed()` for expensive filtering

## Browser Support

✅ Chrome/Edge (latest)
✅ Firefox (latest)
✅ Safari (latest)
✅ iOS Safari
✅ Chrome Mobile

## Dependencies

- Angular 19+ (Signals, standalone components)
- CommonModule
- Your component library (KpiCardComponent, etc.)
- Modern Business Design System CSS

## Roadmap

Future enhancements:
- [ ] Code snippet display with syntax highlighting
- [ ] Dark mode support
- [ ] Component comparison view
- [ ] Export gallery as static HTML
- [ ] Component usage analytics
- [ ] Version history display
- [ ] Accessibility score per component
- [ ] Performance metrics display

## Contributing

When adding a new component:

1. Create the component in `shared/design-systems/components/`
2. Add metadata to `components` signal in gallery
3. Add preview case in gallery template
4. Import component in gallery TypeScript
5. Update this README if needed
6. Test on mobile, tablet, and desktop

## License

Part of the Modern Business Design System.

---

**Built with**: Angular Signals, Standalone Components, Modern CSS
**Design System**: Modern Business Design System
**Accessibility**: WCAG AA Compliant
**Responsive**: Mobile-First Design
