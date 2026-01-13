import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpiCardComponent, type SparklineDataPoint } from './kpi-card.component';

/**
 * Example component demonstrating all features of the KPI Card component
 *
 * To use this example:
 * 1. Import this component in your app
 * 2. Add it to your routes or use it directly in a template
 * 3. Ensure Modern Business Design System CSS is loaded
 */
@Component({
  selector: 'app-kpi-card-example',
  standalone: true,
  imports: [CommonModule, KpiCardComponent],
  template: `
    <div class="example-container">
      <header class="example-header">
        <h1>KPI Card Component Gallery</h1>
        <p>Explore all features and variants of the world-class KPI Card component</p>
      </header>

      <!-- Basic Examples -->
      <section class="example-section">
        <h2>Basic KPI Cards</h2>
        <div class="kpi-grid">
          <app-kpi-card
            label="Total Revenue"
            value="$2.4M">
          </app-kpi-card>

          <app-kpi-card
            label="Active Users"
            value="12,450">
          </app-kpi-card>

          <app-kpi-card
            label="Conversion Rate"
            value="3.24%">
          </app-kpi-card>

          <app-kpi-card
            label="Average Order"
            value="$187">
          </app-kpi-card>
        </div>
      </section>

      <!-- With Icons -->
      <section class="example-section">
        <h2>KPI Cards with Icons</h2>
        <div class="kpi-grid">
          <app-kpi-card
            label="Total Revenue"
            value="$2.4M"
            icon="💰"
            [config]="{showIcon: true}">
          </app-kpi-card>

          <app-kpi-card
            label="Team Members"
            value="156"
            icon="👥"
            [config]="{showIcon: true}">
          </app-kpi-card>

          <app-kpi-card
            label="Projects"
            value="48"
            icon="📊"
            [config]="{showIcon: true}">
          </app-kpi-card>

          <app-kpi-card
            label="Satisfaction"
            value="94%"
            icon="😊"
            [config]="{showIcon: true}">
          </app-kpi-card>
        </div>
      </section>

      <!-- With Trends -->
      <section class="example-section">
        <h2>KPI Cards with Trend Indicators</h2>
        <div class="kpi-grid">
          <app-kpi-card
            label="Revenue Growth"
            value="$2.4M"
            icon="💰"
            [trend]="12.5"
            trendDirection="up"
            trendLabel="from last quarter"
            [config]="{showIcon: true, showTrend: true}">
          </app-kpi-card>

          <app-kpi-card
            label="Customer Churn"
            value="2.1%"
            icon="📉"
            [trend]="15"
            trendDirection="down"
            trendType="negative"
            trendLabel="vs last month"
            [config]="{showIcon: true, showTrend: true}">
          </app-kpi-card>

          <app-kpi-card
            label="Team Size"
            value="156"
            icon="👥"
            [trend]="0"
            trendDirection="neutral"
            trendLabel="no change"
            [config]="{showIcon: true, showTrend: true}">
          </app-kpi-card>

          <app-kpi-card
            label="System Load"
            value="45%"
            icon="⚡"
            [trend]="8"
            trendDirection="up"
            trendType="negative"
            trendLabel="increased load"
            [config]="{showIcon: true, showTrend: true}">
          </app-kpi-card>
        </div>
      </section>

      <!-- With Sparklines -->
      <section class="example-section">
        <h2>KPI Cards with Sparkline Charts</h2>
        <div class="kpi-grid">
          <app-kpi-card
            label="Monthly Sales"
            value="$48.2K"
            icon="📈"
            [trend]="8.7"
            trendDirection="up"
            trendLabel="this month"
            [sparklineData]="salesData()"
            [config]="{showIcon: true, showTrend: true, showSparkline: true}">
          </app-kpi-card>

          <app-kpi-card
            label="Daily Active Users"
            value="12,450"
            icon="👤"
            [trend]="15.3"
            trendDirection="up"
            trendLabel="this week"
            [sparklineData]="usersData()"
            [config]="{showIcon: true, showTrend: true, showSparkline: true}">
          </app-kpi-card>

          <app-kpi-card
            label="Page Load Time"
            value="1.2s"
            icon="⚡"
            [trend]="12"
            trendDirection="down"
            trendType="negative"
            trendLabel="improvement"
            [sparklineData]="performanceData()"
            [config]="{showIcon: true, showTrend: true, showSparkline: true}">
          </app-kpi-card>

          <app-kpi-card
            label="Conversion Rate"
            value="3.24%"
            icon="🎯"
            [trend]="5.1"
            trendDirection="up"
            trendLabel="this quarter"
            [sparklineData]="conversionData()"
            [config]="{showIcon: true, showTrend: true, showSparkline: true}">
          </app-kpi-card>
        </div>
      </section>

      <!-- Clickable Cards -->
      <section class="example-section">
        <h2>Clickable KPI Cards</h2>
        <p class="section-description">Click on these cards to see the interaction (check console)</p>
        <div class="kpi-grid">
          <app-kpi-card
            label="Open Tickets"
            value="23"
            icon="🎫"
            [trend]="12"
            trendDirection="down"
            trendType="negative"
            trendLabel="from yesterday"
            [config]="{showIcon: true, showTrend: true, clickable: true}"
            (cardClick)="onCardClick('tickets')">
          </app-kpi-card>

          <app-kpi-card
            label="Pending Reviews"
            value="8"
            icon="📝"
            [trend]="20"
            trendDirection="up"
            trendLabel="new today"
            [sparklineData]="reviewsData()"
            [config]="{showIcon: true, showTrend: true, showSparkline: true, clickable: true}"
            (cardClick)="onCardClick('reviews')">
          </app-kpi-card>

          <app-kpi-card
            label="Active Campaigns"
            value="12"
            icon="📢"
            [trend]="0"
            trendDirection="neutral"
            [config]="{showIcon: true, showTrend: true, clickable: true}"
            (cardClick)="onCardClick('campaigns')">
          </app-kpi-card>

          <app-kpi-card
            label="View Dashboard"
            value="→"
            icon="📊"
            [config]="{showIcon: true, clickable: true}"
            (cardClick)="onCardClick('dashboard')">
          </app-kpi-card>
        </div>
      </section>

      <!-- Theme Variants -->
      <section class="example-section">
        <h2>Theme Variants</h2>
        <div class="kpi-grid">
          <app-kpi-card
            label="Default Theme"
            value="$2.4M"
            icon="💰"
            [trend]="12.5"
            trendDirection="up"
            [config]="{showIcon: true, showTrend: true, theme: 'default'}">
          </app-kpi-card>

          <app-kpi-card
            label="Primary Theme"
            value="$2.4M"
            icon="💰"
            [trend]="12.5"
            trendDirection="up"
            [config]="{showIcon: true, showTrend: true, theme: 'primary'}">
          </app-kpi-card>

          <app-kpi-card
            label="Success Theme"
            value="94%"
            icon="✓"
            [trend]="3.2"
            trendDirection="up"
            [config]="{showIcon: true, showTrend: true, theme: 'success'}">
          </app-kpi-card>

          <app-kpi-card
            label="Warning Theme"
            value="67%"
            icon="⚠"
            [trend]="5"
            trendDirection="down"
            [config]="{showIcon: true, showTrend: true, theme: 'warning'}">
          </app-kpi-card>

          <app-kpi-card
            label="Danger Theme"
            value="23"
            icon="✕"
            [trend]="15"
            trendDirection="up"
            [config]="{showIcon: true, showTrend: true, theme: 'danger'}">
          </app-kpi-card>
        </div>
      </section>

      <!-- Loading State -->
      <section class="example-section">
        <h2>Loading State</h2>
        <div class="kpi-grid">
          <app-kpi-card
            label="Loading Data"
            value=""
            [loading]="true">
          </app-kpi-card>

          <app-kpi-card
            label="Fetching Metrics"
            value=""
            [loading]="isLoading()">
          </app-kpi-card>

          <button class="toggle-button" (click)="toggleLoading()">
            {{ isLoading() ? 'Stop Loading' : 'Start Loading' }}
          </button>
        </div>
      </section>

      <!-- Error State -->
      <section class="example-section">
        <h2>Error State</h2>
        <div class="kpi-grid">
          <app-kpi-card
            label="Failed to Load"
            value=""
            error="Failed to fetch data from API">
          </app-kpi-card>

          <app-kpi-card
            label="Network Error"
            value=""
            [error]="errorMessage()">
          </app-kpi-card>
        </div>
      </section>

      <!-- Full-Featured Example -->
      <section class="example-section">
        <h2>Full-Featured Dashboard Example</h2>
        <div class="kpi-grid">
          <app-kpi-card
            label="Total Revenue"
            value="$2.4M"
            icon="💰"
            [trend]="12.5"
            trendDirection="up"
            trendLabel="from last quarter"
            [sparklineData]="salesData()"
            [config]="{
              showIcon: true,
              showTrend: true,
              showSparkline: true,
              clickable: true
            }"
            (cardClick)="onCardClick('revenue')"
            (trendClick)="onTrendClick('revenue')">
          </app-kpi-card>

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
              showSparkline: true,
              clickable: true
            }"
            (cardClick)="onCardClick('users')"
            (trendClick)="onTrendClick('users')">
          </app-kpi-card>

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
              theme: 'success',
              clickable: true
            }"
            (cardClick)="onCardClick('satisfaction')">
          </app-kpi-card>

          <app-kpi-card
            label="Open Issues"
            value="23"
            icon="⚠️"
            [trend]="15.0"
            trendDirection="down"
            trendType="negative"
            trendLabel="from last week"
            [sparklineData]="issuesData()"
            [config]="{
              showIcon: true,
              showTrend: true,
              showSparkline: true,
              clickable: true,
              theme: 'warning'
            }"
            (cardClick)="onCardClick('issues')"
            (trendClick)="onTrendClick('issues')">
          </app-kpi-card>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .example-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 40px 24px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .example-header {
      margin-bottom: 48px;
      text-align: center;
    }

    .example-header h1 {
      font-size: 36px;
      font-weight: 700;
      color: #1F2937;
      margin-bottom: 12px;
    }

    .example-header p {
      font-size: 18px;
      color: #6B7280;
    }

    .example-section {
      margin-bottom: 56px;
    }

    .example-section h2 {
      font-size: 24px;
      font-weight: 600;
      color: #1F2937;
      margin-bottom: 24px;
      padding-bottom: 12px;
      border-bottom: 2px solid #E5E7EB;
    }

    .section-description {
      color: #6B7280;
      margin-bottom: 16px;
      font-size: 14px;
    }

    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
    }

    .toggle-button {
      padding: 12px 24px;
      background: #2563EB;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .toggle-button:hover {
      background: #1D4ED8;
      transform: translateY(-1px);
    }

    .toggle-button:active {
      transform: translateY(0);
    }

    @media (max-width: 768px) {
      .example-container {
        padding: 24px 16px;
      }

      .example-header h1 {
        font-size: 28px;
      }

      .kpi-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .example-section {
        margin-bottom: 40px;
      }
    }
  `]
})
export class KpiCardExampleComponent {
  // State management
  isLoading = signal(false);
  errorMessage = signal('Network connection failed');

  // Sparkline data
  salesData = signal<SparklineDataPoint[]>([
    { value: 32, label: 'Jan: $32K' },
    { value: 41, label: 'Feb: $41K' },
    { value: 38, label: 'Mar: $38K' },
    { value: 45, label: 'Apr: $45K' },
    { value: 48, label: 'May: $48K' },
  ]);

  usersData = signal<SparklineDataPoint[]>([
    { value: 8200, label: 'Week 1: 8,200' },
    { value: 9100, label: 'Week 2: 9,100' },
    { value: 10500, label: 'Week 3: 10,500' },
    { value: 11800, label: 'Week 4: 11,800' },
    { value: 12450, label: 'Week 5: 12,450' },
  ]);

  performanceData = signal<SparklineDataPoint[]>([
    { value: 1.8, label: 'Mon: 1.8s' },
    { value: 1.6, label: 'Tue: 1.6s' },
    { value: 1.4, label: 'Wed: 1.4s' },
    { value: 1.3, label: 'Thu: 1.3s' },
    { value: 1.2, label: 'Fri: 1.2s' },
  ]);

  conversionData = signal<SparklineDataPoint[]>([
    { value: 2.8, label: 'Q1: 2.8%' },
    { value: 2.9, label: 'Q2: 2.9%' },
    { value: 3.1, label: 'Q3: 3.1%' },
    { value: 3.2, label: 'Q4: 3.2%' },
  ]);

  reviewsData = signal<SparklineDataPoint[]>([
    { value: 3, label: 'Mon: 3' },
    { value: 5, label: 'Tue: 5' },
    { value: 4, label: 'Wed: 4' },
    { value: 7, label: 'Thu: 7' },
    { value: 8, label: 'Fri: 8' },
  ]);

  issuesData = signal<SparklineDataPoint[]>([
    { value: 45, label: 'Mon: 45' },
    { value: 38, label: 'Tue: 38' },
    { value: 32, label: 'Wed: 32' },
    { value: 28, label: 'Thu: 28' },
    { value: 23, label: 'Fri: 23' },
  ]);

  // Event handlers
  onCardClick(cardName: string): void {
    console.log(`KPI Card clicked: ${cardName}`);
    alert(`Clicked on ${cardName} card!`);
  }

  onTrendClick(cardName: string): void {
    console.log(`Trend clicked for: ${cardName}`);
    alert(`Show detailed trend analysis for ${cardName}`);
  }

  toggleLoading(): void {
    this.isLoading.update(loading => !loading);
  }
}
