# KPI Card Component - Visual Guide

## Component Structure

```
┌─────────────────────────────────────────┐
│ [Icon] Label              [Sparkline]   │  ← Header
│                                         │
│ $2.4M                                   │  ← Value (Large)
│                                         │
│ ↑ +12.5% from last quarter             │  ← Trend Indicator
│                                         │
│ ════════════════════════════            │  ← Sparkline Chart (Optional)
│                                         │
└─────────────────────────────────────────┘
```

## File Structure

```
kpi-card/
├── index.ts                      # Public API exports
├── kpi-card.component.ts         # Component logic (Signals, inputs, outputs)
├── kpi-card.component.html       # Template (semantic, accessible HTML)
├── kpi-card.component.css        # Styles (Modern Business Design System)
├── kpi-card.example.ts           # Live examples and demos
├── README.md                     # Full documentation
└── COMPONENT_GUIDE.md            # This file
```

## Features Overview

### ✅ Core Features
- **Display KPI metrics** with large, readable values
- **Flexible value types**: Currency, percentages, numbers, text
- **Responsive design**: Mobile, tablet, desktop optimized

### 📊 Trend Analysis
- **Up/Down/Neutral indicators** with colored arrows
- **Configurable trend types**: Positive/negative interpretation
- **Percentage display**: Automatic formatting
- **Custom labels**: Add context like "from last quarter"

### 📈 Sparkline Charts
- **Inline mini charts** for quick visual trends
- **Full sparkline charts** with data points
- **Smooth SVG rendering**: Scalable and crisp
- **Tooltips on hover**: Show individual data point values

### 🎨 Design System Integration
- **Modern Business DS tokens**: Uses CSS variables
- **Multiple themes**: Default, Primary, Success, Warning, Danger
- **Smooth animations**: Professional transitions
- **Hover effects**: Subtle elevation and highlights

### 🖱️ Interactivity
- **Clickable cards**: For drill-down navigation
- **Trend click actions**: Separate event for trend analysis
- **Keyboard navigation**: Full keyboard support
- **Focus indicators**: Clear visual feedback

### ♿ Accessibility
- **ARIA labels**: Comprehensive screen reader support
- **Semantic HTML**: Proper `<article>` structure
- **Keyboard accessible**: Enter/Space key handlers
- **Focus management**: Visible focus states
- **Color contrast**: WCAG AA compliant
- **Reduced motion**: Respects user preferences

### 🔄 States
- **Loading state**: Spinner with loading message
- **Error state**: Red error display with icon
- **Normal state**: Full-featured display

## Quick Start Examples

### 1. Simple KPI
```html
<app-kpi-card label="Revenue" value="$2.4M"></app-kpi-card>
```

### 2. With Trend
```html
<app-kpi-card
  label="Users"
  value="12,450"
  [trend]="15.3"
  trendDirection="up"
  trendLabel="vs last month">
</app-kpi-card>
```

### 3. Full Featured
```html
<app-kpi-card
  label="Revenue"
  value="$2.4M"
  icon="💰"
  [trend]="12.5"
  trendDirection="up"
  trendLabel="from Q3"
  [sparklineData]="data"
  [config]="{
    showIcon: true,
    showTrend: true,
    showSparkline: true,
    clickable: true
  }"
  (cardClick)="navigate()">
</app-kpi-card>
```

## Component Inputs

| Input | Type | Description | Example |
|-------|------|-------------|---------|
| `label` | `string` | KPI label | `"Total Revenue"` |
| `value` | `string \| number` | KPI value | `"$2.4M"` or `2400000` |
| `icon` | `string` | Icon emoji/class | `"💰"` |
| `trend` | `number` | Trend % | `12.5` |
| `trendDirection` | `'up' \| 'down' \| 'neutral'` | Trend direction | `"up"` |
| `trendType` | `'positive' \| 'negative'` | Good/bad interpretation | `"positive"` |
| `trendLabel` | `string` | Context label | `"from last quarter"` |
| `sparklineData` | `SparklineDataPoint[]` | Chart data | `[{value: 32}, ...]` |
| `config` | `KpiCardConfig` | Component config | See below |
| `loading` | `boolean` | Loading state | `true` |
| `error` | `string` | Error message | `"Failed to load"` |

## Component Outputs

| Output | Type | Description |
|--------|------|-------------|
| `cardClick` | `void` | Card clicked (if clickable) |
| `trendClick` | `void` | Trend indicator clicked |

## Configuration Object

```typescript
interface KpiCardConfig {
  showIcon?: boolean;      // Show icon (default: true)
  showTrend?: boolean;     // Show trend (default: true)
  showSparkline?: boolean; // Show chart (default: false)
  clickable?: boolean;     // Make clickable (default: false)
  theme?: 'default' | 'primary' | 'success' | 'warning' | 'danger'; // (default: 'default')
}
```

## Theme Variants

### Default Theme
White background, subtle border, hover effects

### Primary Theme
Blue gradient background, white text, premium look

### Success Theme
Green accent color for positive metrics

### Warning Theme
Amber accent color for metrics needing attention

### Danger Theme
Red accent color for critical metrics

## Trend Color Logic

### Positive Trend Type (default)
Good when up, bad when down
- Revenue ↑ = Green ✓
- Costs ↓ = Red

### Negative Trend Type
Good when down, bad when up
- Errors ↑ = Red
- Costs ↓ = Green ✓

## Sparkline Data Format

```typescript
interface SparklineDataPoint {
  value: number;    // Required: numeric value
  label?: string;   // Optional: tooltip label
}

// Example
const data: SparklineDataPoint[] = [
  { value: 32, label: 'Jan: $32K' },
  { value: 41, label: 'Feb: $41K' },
  { value: 38, label: 'Mar: $38K' },
  { value: 45, label: 'Apr: $45K' },
  { value: 48, label: 'May: $48K' },
];
```

## Grid Layout Recommendations

### Responsive Grid
```css
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}
```

### Fixed Columns
```css
/* 4 columns on desktop */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

/* 2 columns on tablet */
@media (max-width: 1024px) {
  .kpi-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 1 column on mobile */
@media (max-width: 768px) {
  .kpi-grid {
    grid-template-columns: 1fr;
  }
}
```

## Performance Tips

1. **Use trackBy** when rendering multiple cards in `*ngFor`
2. **Lazy load** sparkline data if not immediately needed
3. **Memoize** expensive calculations with `computed()`
4. **Use Signals** for reactive updates (already built-in)
5. **Virtual scrolling** for dashboards with 50+ cards

## Testing Tips

### Unit Testing
```typescript
it('should display the correct value', () => {
  const fixture = TestBed.createComponent(KpiCardComponent);
  fixture.componentRef.setInput('label', 'Test KPI');
  fixture.componentRef.setInput('value', '$100');
  fixture.detectChanges();

  const valueElement = fixture.nativeElement.querySelector('.kpi-value');
  expect(valueElement.textContent).toContain('$100');
});
```

### Integration Testing
```typescript
it('should emit cardClick when clicked', () => {
  const fixture = TestBed.createComponent(KpiCardComponent);
  fixture.componentRef.setInput('config', { clickable: true });

  let clicked = false;
  fixture.componentInstance.cardClick.subscribe(() => {
    clicked = true;
  });

  const card = fixture.nativeElement.querySelector('.kpi-card');
  card.click();

  expect(clicked).toBe(true);
});
```

## Common Use Cases

### 1. Executive Dashboard
Show high-level business metrics with trends
```html
<div class="dashboard-grid">
  <app-kpi-card label="Revenue" value="$2.4M" [trend]="12.5" ...></app-kpi-card>
  <app-kpi-card label="Profit" value="$890K" [trend]="8.2" ...></app-kpi-card>
  <app-kpi-card label="Customers" value="12.4K" [trend]="15.3" ...></app-kpi-card>
  <app-kpi-card label="Satisfaction" value="94%" [trend]="3.2" ...></app-kpi-card>
</div>
```

### 2. Analytics Dashboard
Detailed metrics with sparklines
```html
<app-kpi-card
  label="Daily Active Users"
  [value]="dau()"
  [sparklineData]="dauHistory()"
  [config]="{showSparkline: true, clickable: true}"
  (cardClick)="showDetailedAnalytics()">
</app-kpi-card>
```

### 3. System Monitoring
Real-time metrics with status indicators
```html
<app-kpi-card
  label="System Load"
  [value]="load() + '%'"
  [trend]="loadChange()"
  trendDirection="up"
  trendType="negative"
  [config]="{theme: load() > 80 ? 'danger' : 'default'}">
</app-kpi-card>
```

### 4. E-commerce Dashboard
Sales and conversion metrics
```html
<app-kpi-card
  label="Conversion Rate"
  value="3.24%"
  icon="🎯"
  [trend]="5.1"
  trendDirection="up"
  [sparklineData]="conversionHistory()"
  [config]="{showIcon: true, showSparkline: true}">
</app-kpi-card>
```

## Browser Support

✅ Chrome/Edge (latest)
✅ Firefox (latest)
✅ Safari (latest)
✅ iOS Safari
✅ Chrome Mobile

## Dependencies

- Angular 19+ (uses new Signal APIs)
- CommonModule (for NgClass, NgFor, etc.)
- Modern Business Design System CSS variables

## License

Part of the Modern Business Design System component library.

---

**Created with**: Angular Signals, Standalone Components, Modern CSS
**Design System**: Modern Business Design System
**Accessibility**: WCAG AA Compliant
**Performance**: Optimized with OnPush strategy ready
