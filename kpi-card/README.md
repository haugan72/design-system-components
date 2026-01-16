# KPI Card Component

A world-class, professional Angular component for displaying Key Performance Indicators (KPIs) with trend analysis, sparkline charts, and interactive features.

## Features

- **Trend Indicators**: Show percentage changes with up/down/neutral arrows and customizable colors
- **Icon Support**: Display icons (emojis or icon classes) alongside KPIs
- **Sparkline Charts**: Inline mini charts showing data trends over time
- **Click Actions**: Make cards interactive for drill-down functionality
- **Loading States**: Built-in loading spinner and state management
- **Error Handling**: Display error messages with appropriate styling
- **Accessibility**: Full WCAG AA compliance with ARIA labels, keyboard navigation, and screen reader support
- **Responsive**: Works beautifully on mobile, tablet, and desktop
- **Theme Variants**: Multiple color themes (default, primary, success, warning, danger)
- **Size Variants**: Three sizes (small, medium, large) for different layout contexts
- **Modern Angular**: Uses Signals, standalone components, and input/output functions

## Size Variants

The component supports three size variants to accommodate different layout contexts:

| Size | Use Case | Card Padding | Value Font |
|------|----------|--------------|------------|
| `sm` | Compact dashboards, sidebars, dense grids | 16px | 1.5rem |
| `md` | Standard dashboards (default) | 24px | 2rem |
| `lg` | Hero KPIs, landing pages, featured metrics | 32px | 2.5rem |

### Size Examples

```html
<!-- Small: Compact for dense layouts -->
<app-kpi-card
  label="Active Users"
  value="1,234"
  size="sm">
</app-kpi-card>

<!-- Medium: Default size -->
<app-kpi-card
  label="Revenue"
  value="$45.2K"
  size="md">
</app-kpi-card>

<!-- Large: Prominent hero KPI -->
<app-kpi-card
  label="Total Sales"
  value="$2.4M"
  size="lg"
  [config]="{showSparkline: true}">
</app-kpi-card>
```

### Responsive Behavior

Size variants gracefully degrade on smaller viewports:
- **Desktop (>768px)**: Full size specifications
- **Tablet (768px)**: Sizes reduce by ~15%
- **Mobile (<480px)**: Large becomes medium, medium becomes small

## Installation

1. Copy the component files to your project:
```bash
cp -r shared/design-systems/components/kpi-card src/app/components/
```

2. Import the component in your Angular component:
```typescript
import { KpiCardComponent } from './components/kpi-card/kpi-card.component';

@Component({
  standalone: true,
  imports: [KpiCardComponent],
  // ...
})
```

3. Ensure the Modern Business Design System CSS variables are available in your app.

## Basic Usage

### Simple KPI Card
```html
<app-kpi-card
  label="Total Revenue"
  value="$2.4M">
</app-kpi-card>
```

### KPI Card with Trend
```html
<app-kpi-card
  label="Active Users"
  value="12,450"
  [trend]="15.3"
  trendDirection="up"
  trendLabel="vs last month">
</app-kpi-card>
```

### KPI Card with Icon and Trend
```html
<app-kpi-card
  label="Customer Satisfaction"
  value="94%"
  icon="😊"
  [trend]="3.2"
  trendDirection="up"
  trendType="positive"
  trendLabel="from last quarter"
  [config]="{showIcon: true, showTrend: true}">
</app-kpi-card>
```

### KPI Card with Sparkline Chart
```html
<app-kpi-card
  label="Monthly Sales"
  value="$48.2K"
  [trend]="8.7"
  trendDirection="up"
  [sparklineData]="salesData"
  [config]="{showSparkline: true, showTrend: true}">
</app-kpi-card>
```

In your component:
```typescript
export class DashboardComponent {
  salesData = signal<SparklineDataPoint[]>([
    { value: 32, label: 'Jan' },
    { value: 41, label: 'Feb' },
    { value: 38, label: 'Mar' },
    { value: 45, label: 'Apr' },
    { value: 48, label: 'May' },
  ]);
}
```

### Clickable KPI Card
```html
<app-kpi-card
  label="Open Tickets"
  value="23"
  icon="🎫"
  [trend]="12.0"
  trendDirection="down"
  trendType="negative"
  trendLabel="from yesterday"
  [config]="{clickable: true, showIcon: true, showTrend: true}"
  (cardClick)="onTicketsClick()">
</app-kpi-card>
```

In your component:
```typescript
onTicketsClick() {
  this.router.navigate(['/tickets']);
}
```

### Full-Featured Example
```html
<app-kpi-card
  label="Total Revenue"
  value="$2.4M"
  icon="💰"
  [trend]="12.5"
  trendDirection="up"
  trendType="positive"
  trendLabel="from last quarter"
  [sparklineData]="revenueData()"
  [config]="{
    showIcon: true,
    showTrend: true,
    showSparkline: true,
    clickable: true,
    theme: 'default'
  }"
  (cardClick)="onRevenueClick()"
  (trendClick)="onTrendClick()">
</app-kpi-card>
```

## API Reference

### Inputs

| Input | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `label` | `string` | Yes | - | Main label/title for the KPI |
| `value` | `string \| number` | Yes | - | The KPI value to display |
| `icon` | `string` | No | - | Icon (emoji or icon class) |
| `trend` | `number` | No | - | Trend percentage value |
| `trendDirection` | `'up' \| 'down' \| 'neutral'` | No | `'neutral'` | Direction of the trend |
| `trendType` | `'positive' \| 'negative'` | No | `'positive'` | Whether trend direction is good/bad |
| `trendLabel` | `string` | No | - | Additional label for trend |
| `sparklineData` | `SparklineDataPoint[]` | No | - | Data for sparkline chart |
| `config` | `KpiCardConfig` | No | See below | Component configuration |
| `loading` | `boolean` | No | `false` | Show loading state |
| `error` | `string` | No | - | Show error state with message |
| `size` | `'sm' \| 'md' \| 'lg'` | No | `'md'` | Card size variant |

### KpiCardConfig

```typescript
interface KpiCardConfig {
  showIcon?: boolean;      // Default: true
  showTrend?: boolean;     // Default: true
  showSparkline?: boolean; // Default: false
  clickable?: boolean;     // Default: false
  theme?: 'default' | 'primary' | 'success' | 'warning' | 'danger'; // Default: 'default'
}
```

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `cardClick` | `void` | Emitted when card is clicked (if clickable) |
| `trendClick` | `void` | Emitted when trend indicator is clicked |

### SparklineDataPoint

```typescript
interface SparklineDataPoint {
  value: number;    // The numeric value
  label?: string;   // Optional label for tooltip
}
```

### KpiCardSize

```typescript
type KpiCardSize = 'sm' | 'md' | 'lg';
```

## Theme Variants

The component supports multiple theme variants:

```html
<!-- Default theme (white background) -->
<app-kpi-card [config]="{theme: 'default'}" ...></app-kpi-card>

<!-- Primary theme (gradient blue background) -->
<app-kpi-card [config]="{theme: 'primary'}" ...></app-kpi-card>

<!-- Success theme (green accent) -->
<app-kpi-card [config]="{theme: 'success'}" ...></app-kpi-card>

<!-- Warning theme (amber accent) -->
<app-kpi-card [config]="{theme: 'warning'}" ...></app-kpi-card>

<!-- Danger theme (red accent) -->
<app-kpi-card [config]="{theme: 'danger'}" ...></app-kpi-card>
```

## Trend Colors

The component intelligently handles trend colors based on `trendDirection` and `trendType`:

### Positive Trend Type (default)
- **Up** = Green (good)
- **Down** = Red (bad)
- **Neutral** = Gray

### Negative Trend Type
- **Up** = Red (bad) - e.g., increased error rate
- **Down** = Green (good) - e.g., decreased costs
- **Neutral** = Gray

Example:
```html
<!-- For metrics where "up" is bad (costs, errors, etc.) -->
<app-kpi-card
  label="Server Errors"
  value="45"
  [trend]="20"
  trendDirection="up"
  trendType="negative">
</app-kpi-card>
```

## Complete Example Component

```typescript
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { KpiCardComponent, type SparklineDataPoint } from './components/kpi-card/kpi-card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, KpiCardComponent],
  template: `
    <div class="kpi-grid">
      <!-- Revenue Card -->
      <app-kpi-card
        label="Total Revenue"
        value="$2.4M"
        icon="💰"
        [trend]="12.5"
        trendDirection="up"
        trendLabel="from last quarter"
        [sparklineData]="revenueData()"
        [config]="{
          showIcon: true,
          showTrend: true,
          showSparkline: true,
          clickable: true
        }"
        (cardClick)="navigateToRevenue()">
      </app-kpi-card>

      <!-- Users Card -->
      <app-kpi-card
        label="Active Users"
        value="12,450"
        icon="👥"
        [trend]="8.3"
        trendDirection="up"
        trendLabel="this month"
        [sparklineData]="usersData()"
        [config]="{
          showIcon: true,
          showTrend: true,
          showSparkline: true
        }">
      </app-kpi-card>

      <!-- Satisfaction Card -->
      <app-kpi-card
        label="Customer Satisfaction"
        value="94%"
        icon="😊"
        [trend]="3.2"
        trendDirection="up"
        trendLabel="from last quarter"
        [config]="{
          showIcon: true,
          showTrend: true,
          theme: 'success'
        }">
      </app-kpi-card>

      <!-- Issues Card -->
      <app-kpi-card
        label="Open Issues"
        value="23"
        icon="⚠️"
        [trend]="15.0"
        trendDirection="down"
        trendType="negative"
        trendLabel="from last week"
        [config]="{
          showIcon: true,
          showTrend: true,
          clickable: true
        }"
        (cardClick)="navigateToIssues()">
      </app-kpi-card>
    </div>

    <style>
      .kpi-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 24px;
        padding: 24px;
      }

      @media (max-width: 768px) {
        .kpi-grid {
          grid-template-columns: 1fr;
          gap: 16px;
          padding: 16px;
        }
      }
    </style>
  `
})
export class DashboardComponent {
  constructor(private router: Router) {}

  // Sparkline data
  revenueData = signal<SparklineDataPoint[]>([
    { value: 32, label: 'Jan: $32K' },
    { value: 41, label: 'Feb: $41K' },
    { value: 38, label: 'Mar: $38K' },
    { value: 45, label: 'Apr: $45K' },
    { value: 48, label: 'May: $48K' },
  ]);

  usersData = signal<SparklineDataPoint[]>([
    { value: 8200, label: 'Week 1' },
    { value: 9100, label: 'Week 2' },
    { value: 10500, label: 'Week 3' },
    { value: 11800, label: 'Week 4' },
    { value: 12450, label: 'Week 5' },
  ]);

  navigateToRevenue() {
    this.router.navigate(['/revenue']);
  }

  navigateToIssues() {
    this.router.navigate(['/issues']);
  }
}
```

## Loading State Example

```html
<app-kpi-card
  label="Loading Data"
  value=""
  [loading]="isLoading()">
</app-kpi-card>
```

```typescript
export class DashboardComponent {
  isLoading = signal(true);

  ngOnInit() {
    this.loadKpiData().then(() => {
      this.isLoading.set(false);
    });
  }
}
```

## Error State Example

```html
<app-kpi-card
  label="Failed to Load"
  value=""
  [error]="errorMessage()">
</app-kpi-card>
```

```typescript
export class DashboardComponent {
  errorMessage = signal<string | undefined>(undefined);

  loadData() {
    this.apiService.getKpiData().subscribe({
      next: (data) => {
        // Handle success
      },
      error: (err) => {
        this.errorMessage.set('Failed to load data. Please try again.');
      }
    });
  }
}
```

## Accessibility Features

The component includes comprehensive accessibility features:

- **ARIA Labels**: Descriptive labels for screen readers
- **Keyboard Navigation**: Full keyboard support with Enter/Space key handlers
- **Focus Management**: Visible focus indicators
- **Semantic HTML**: Uses proper `<article>` element
- **Color Contrast**: WCAG AA compliant color ratios
- **Reduced Motion**: Respects `prefers-reduced-motion` setting
- **High Contrast**: Support for high contrast mode

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Design Tokens

The component uses CSS variables from the Modern Business Design System:

- `--color-primary`, `--color-success`, `--color-warning`, `--color-danger`
- `--color-text-primary`, `--color-text-secondary`, `--color-text-muted`
- `--color-border`, `--color-bg`, `--color-bg-muted`
- `--space-*` (spacing scale)
- `--radius-*` (border radius)
- `--shadow-*` (box shadows)

## Performance Tips

1. Use `trackBy` when rendering multiple KPI cards in a loop
2. Use Angular Signals for reactive data updates
3. Lazy load sparkline data if not needed immediately
4. Consider virtual scrolling for dashboards with many KPI cards

## License

Part of the Modern Business Design System.
