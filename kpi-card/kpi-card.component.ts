import { Component, signal, input, output, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Trend direction for the KPI indicator
 */
export type TrendDirection = 'up' | 'down' | 'neutral';

/**
 * Trend type affects the color interpretation
 */
export type TrendType = 'positive' | 'negative';

/**
 * Data point for sparkline chart
 */
export interface SparklineDataPoint {
  value: number;
  label?: string;
}

/**
 * Configuration for the KPI card
 */
export interface KpiCardConfig {
  /** Show icon on the card */
  showIcon?: boolean;
  /** Show trend indicator */
  showTrend?: boolean;
  /** Show sparkline chart */
  showSparkline?: boolean;
  /** Enable click action */
  clickable?: boolean;
  /** Color theme for the card */
  theme?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
}

/**
 * World-class KPI Card Component
 *
 * A professional, accessible, and feature-rich KPI card for displaying
 * key performance indicators with trend analysis and visual sparklines.
 *
 * @example
 * ```html
 * <app-kpi-card
 *   label="Total Revenue"
 *   value="$2.4M"
 *   [trend]="12.5"
 *   trendDirection="up"
 *   trendLabel="from last quarter"
 *   icon="💰"
 *   [sparklineData]="revenueData"
 *   [config]="{showIcon: true, showTrend: true, showSparkline: true, clickable: true}"
 *   (cardClick)="onCardClick()">
 * </app-kpi-card>
 * ```
 */
@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kpi-card.component.html',
  styleUrl: './kpi-card.component.css'
})
export class KpiCardComponent {
  // ========================================
  // Inputs
  // ========================================

  /** Main label/title for the KPI */
  label = input.required<string>();

  /** The KPI value to display (can be number, currency, percentage, etc.) */
  value = input.required<string | number>();

  /** Optional icon (emoji or icon class) */
  icon = input<string>();

  /** Trend percentage or value */
  trend = input<number>();

  /** Direction of the trend */
  trendDirection = input<TrendDirection>('neutral');

  /** Whether the trend direction is positive or negative for this metric */
  trendType = input<TrendType>('positive');

  /** Additional label for the trend (e.g., "vs last month") */
  trendLabel = input<string>();

  /** Data for sparkline chart */
  sparklineData = input<SparklineDataPoint[]>();

  /** Component configuration */
  config = input<KpiCardConfig>({
    showIcon: true,
    showTrend: true,
    showSparkline: false,
    clickable: false,
    theme: 'default'
  });

  /** Loading state */
  loading = input<boolean>(false);

  /** Error state */
  error = input<string>();

  // ========================================
  // Outputs
  // ========================================

  /** Emitted when card is clicked (if clickable) */
  cardClick = output<void>();

  /** Emitted when trend indicator is clicked */
  trendClick = output<void>();

  // ========================================
  // Computed Properties
  // ========================================

  /** Determine if the card should be interactive */
  readonly isClickable = computed(() => this.config().clickable);

  /** Get the trend color class based on direction and type */
  readonly trendColorClass = computed(() => {
    const direction = this.trendDirection();
    const type = this.trendType();

    if (direction === 'neutral') return 'neutral';

    // For positive trend type: up is good (green), down is bad (red)
    // For negative trend type: up is bad (red), down is good (green)
    if (type === 'positive') {
      return direction === 'up' ? 'positive' : 'negative';
    } else {
      return direction === 'up' ? 'negative' : 'positive';
    }
  });

  /** Get the trend arrow icon */
  readonly trendArrow = computed(() => {
    const direction = this.trendDirection();
    if (direction === 'up') return '↑';
    if (direction === 'down') return '↓';
    return '→';
  });

  /** Format the trend value for display */
  readonly trendDisplay = computed(() => {
    const trendValue = this.trend();
    if (trendValue === undefined) return '';

    const absValue = Math.abs(trendValue);
    const sign = trendValue >= 0 ? '+' : '-';
    return `${sign}${absValue}%`;
  });

  /** Generate SVG path for sparkline */
  readonly sparklinePath = computed(() => {
    const data = this.sparklineData();
    if (!data || data.length < 2) return '';

    const width = 100;
    const height = 40;
    const padding = 2;

    const values = data.map(d => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;

    const points = data.map((point, index) => {
      const x = (index / (data.length - 1)) * (width - padding * 2) + padding;
      const y = height - padding - ((point.value - min) / range) * (height - padding * 2);
      return `${x},${y}`;
    });

    return `M ${points.join(' L ')}`;
  });

  /** Check if sparkline should be shown */
  readonly showSparkline = computed(() => {
    return this.config().showSparkline &&
           this.sparklineData() &&
           this.sparklineData()!.length >= 2;
  });

  /** Get theme class */
  readonly themeClass = computed(() => `theme-${this.config().theme || 'default'}`);

  // ========================================
  // Methods
  // ========================================

  /**
   * Handle card click
   */
  onCardClick(): void {
    if (this.isClickable() && !this.loading() && !this.error()) {
      this.cardClick.emit();
    }
  }

  /**
   * Handle trend click
   */
  onTrendClick(event: Event): void {
    event.stopPropagation();
    this.trendClick.emit();
  }

  /**
   * Handle keyboard interaction for accessibility
   */
  onKeyDown(event: KeyboardEvent): void {
    if (this.isClickable() && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      this.onCardClick();
    }
  }
}
