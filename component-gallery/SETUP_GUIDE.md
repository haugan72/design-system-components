# Component Gallery - Quick Setup Guide

## 🎯 What You Just Got

A **beautiful, professional component gallery** that automatically showcases all your UI components with:

- 🔍 **Live search** and category filtering
- 📱 **Fully responsive** design (mobile, tablet, desktop)
- 🎨 **Live component previews** with real data
- ♿ **WCAG AA accessible** with keyboard navigation
- 📊 **Stats dashboard** showing component counts
- 📝 **Copy-paste imports** with one click
- 🎯 **Status badges** (stable, beta, experimental)

## 🚀 Quick Start (3 Steps)

### Step 1: Copy to Your App

Choose an app from your monorepo and copy the gallery:

```bash
# For n8n-agent-ui
cp -r shared/design-systems/components/component-gallery apps/n8n-agent-ui/src/app/components/

# For personal-crm
cp -r shared/design-systems/components/component-gallery apps/personal-crm/src/app/components/

# For project-manager-app
cp -r shared/design-systems/components/component-gallery apps/project-manager-app/src/app/components/
```

### Step 2: Create a Route

Add to your `app.routes.ts`:

```typescript
import { Routes } from '@angular/router';
import { ComponentGalleryComponent } from './components/component-gallery';

export const routes: Routes = [
  {
    path: 'components',
    component: ComponentGalleryComponent,
    title: 'Component Gallery'
  },
  // ... other routes
];
```

### Step 3: Run Your App

```bash
cd apps/your-app
npm start
```

Navigate to: `http://localhost:4200/components`

**That's it!** 🎉

## 📸 What It Looks Like

```
┌─────────────────────────────────────────────────────────┐
│  Component Gallery                                       │
│  Explore our collection of world-class components       │
│                                                          │
│  [1 Components] [5 Categories] [100% Accessible]        │
└─────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│  [🔍 Search components...]                               │
│                                                          │
│  [📦 All] [📊 Data Viz] [📝 Forms] [🔲 Layout] ...      │
└──────────────────────────────────────────────────────────┘

Showing 1 component

┌───────────────────────────────────────────────┐
│  KPI Card                    [stable]  v1.0.0 │
│  ───────────────────────────────────────────  │
│  Professional card for displaying KPIs...     │
│  [metrics] [dashboard] [charts]               │
│                                               │
│  Live Preview:                                │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐           │
│  │ KPI │ │ KPI │ │ KPI │ │ KPI │           │
│  └─────┘ └─────┘ └─────┘ └─────┘           │
│                                               │
│  [Documentation] [Copy Import] [ℹ]           │
└───────────────────────────────────────────────┘
```

## 🎨 Visual Structure

```
component-gallery/
├── component-gallery.component.ts   (7KB)  - Component logic
├── component-gallery.component.html (10KB) - Template
├── component-gallery.component.css  (14KB) - Styles
├── README.md                        (9KB)  - Full documentation
├── SETUP_GUIDE.md                   (This) - Quick setup
└── index.ts                         (162B) - Exports
```

## ➕ Adding Your Components to the Gallery

### Example: Adding a Data Table Component

1. **Update the registry** in `component-gallery.component.ts`:

```typescript
readonly components = signal<ComponentInfo[]>([
  {
    name: 'KPI Card',
    description: '...',
    category: 'data-visualization',
    version: '1.0.0',
    tags: ['metrics', 'dashboard'],
    status: 'stable'
  },
  // Add your new component
  {
    name: 'Data Table',
    description: 'Sortable, filterable table with pagination',
    category: 'data-visualization',
    version: '1.0.0',
    tags: ['table', 'grid', 'data'],
    status: 'beta'
  }
]);
```

2. **Import the component**:

```typescript
import { DataTableComponent } from '../data-table/data-table.component';

@Component({
  imports: [CommonModule, KpiCardComponent, DataTableComponent],
  // ...
})
```

3. **Add preview** in the template:

```html
@switch (component.name) {
  @case ('KPI Card') {
    <!-- existing KPI Card preview -->
  }

  @case ('Data Table') {
    <div class="preview-grid">
      <app-data-table
        [data]="sampleTableData()"
        [columns]="tableColumns()">
      </app-data-table>
    </div>
  }
}
```

## 🎯 Component Categories

Choose the right category for your component:

| Category | Use For | Examples |
|----------|---------|----------|
| `data-visualization` | Charts, graphs, metrics | KPI Card, Line Chart, Gauge |
| `forms` | Input controls | Text Input, Select, Toggle |
| `layout` | Structure components | Grid, Container, Panel |
| `navigation` | Nav elements | Menu, Tabs, Breadcrumbs |
| `feedback` | User feedback | Toast, Modal, Alert |

## 🏷️ Status Levels

| Status | Color | Meaning | When to Use |
|--------|-------|---------|-------------|
| `stable` | Green | Production-ready | Component is fully tested |
| `beta` | Yellow | Feature complete | In testing phase |
| `experimental` | Blue | Early stage | API may change |

## 🎨 Customization Ideas

### Change the Header Gradient

In `component-gallery.component.css`:

```css
.gallery-header {
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  /* Change to your brand colors */
}
```

### Update Stats Bar

In `component-gallery.component.html`:

```html
<div class="stats-bar">
  <div class="stat-item">
    <span class="stat-value">{{ yourMetric() }}</span>
    <span class="stat-label">Your Label</span>
  </div>
</div>
```

### Add More Categories

In `component-gallery.component.ts`:

```typescript
readonly categories = signal([
  { id: 'all', label: 'All Components', icon: '📦' },
  { id: 'animations', label: 'Animations', icon: '✨' },
  { id: 'utilities', label: 'Utilities', icon: '🔧' },
  // ...
]);
```

## 📱 Responsive Breakpoints

The gallery adapts to all screen sizes:

- **Desktop** (>1024px): 2-3 column grid
- **Tablet** (768-1024px): 2 column grid
- **Mobile** (<768px): Single column

## 🔧 Troubleshooting

### Components not showing?
- Check that you've imported the component in the gallery's TypeScript file
- Verify the component is added to the `imports` array
- Make sure the component name matches exactly in the `@switch` statement

### Styles not applied?
- Ensure Modern Business Design System CSS is loaded
- Check that CSS variables are defined in your app
- Verify the gallery CSS file is being loaded

### Search not working?
- Check browser console for errors
- Verify the `searchQuery` signal is updating
- Test with simple search terms first

## 🎓 Learn More

- **Full Documentation**: See [README.md](./README.md)
- **Modern Business DS**: See `shared/design-systems/designSystems/modernBusinessDS/`
- **Example Components**: See `shared/design-systems/components/`

## 💡 Pro Tips

1. **Use the gallery during development** to test components in isolation
2. **Share the gallery URL** with designers and stakeholders
3. **Add component counts** to track your library growth
4. **Update versions** when you make breaking changes
5. **Use status badges** to communicate component maturity

## 🚢 Production Deployment

Before deploying:

1. ✅ Test all component previews
2. ✅ Verify search and filtering
3. ✅ Check mobile responsiveness
4. ✅ Test keyboard navigation
5. ✅ Validate accessibility with screen reader
6. ✅ Update component versions
7. ✅ Review and update descriptions

## 🎉 Next Steps

1. **Add more components** as you build them
2. **Customize the styling** to match your brand
3. **Add code snippets** for common use cases
4. **Create a demo mode** with sample data
5. **Build a static export** for documentation sites

## 📞 Need Help?

- Check [README.md](./README.md) for detailed API documentation
- Review the KPI Card component as an example
- Look at the inline comments in the code

---

**Congratulations!** You now have a professional component gallery! 🎊

Start adding your components and watch your design system come to life.
