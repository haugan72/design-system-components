import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Hero background types
 */
export type HeroBackground = 'gradient' | 'image' | 'solid' | 'none';

/**
 * Hero size variants
 */
export type HeroSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Hero alignment options
 */
export type HeroAlignment = 'left' | 'center' | 'right';

/**
 * Hero configuration
 */
export interface HeroConfig {
  background?: HeroBackground;
  size?: HeroSize;
  alignment?: HeroAlignment;
  backgroundImage?: string;
  backgroundColor?: string;
  overlay?: boolean;
  overlayOpacity?: number;
}

/**
 * Hero Component
 *
 * A flexible hero section component for landing pages and featured content.
 * Supports multiple background types, sizes, and alignment options with
 * customizable call-to-action buttons.
 *
 * Features:
 * - Multiple background options (gradient, image, solid color)
 * - Configurable sizes (sm, md, lg, xl)
 * - Flexible alignment (left, center, right)
 * - Optional overlay for background images
 * - Primary and secondary CTA buttons
 * - Fully responsive design
 * - Accessible with proper ARIA labels
 *
 * @example
 * ```html
 * <app-hero
 *   [title]="'Welcome to Our Platform'"
 *   [subtitle]="'Build amazing experiences with our tools'"
 *   [config]="{background: 'gradient', size: 'lg', alignment: 'center'}"
 *   [primaryButtonLabel]="'Get Started'"
 *   [secondaryButtonLabel]="'Learn More'"
 *   (primaryAction)="onGetStarted()"
 *   (secondaryAction)="onLearnMore()">
 * </app-hero>
 * ```
 */
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  // ========================================
  // Inputs
  // ========================================

  /** Hero title */
  title = input.required<string>();

  /** Hero subtitle */
  subtitle = input<string>();

  /** Additional description text */
  description = input<string>();

  /** Hero configuration */
  config = input<HeroConfig>({
    background: 'gradient',
    size: 'lg',
    alignment: 'center',
    overlay: true,
    overlayOpacity: 0.5
  });

  /** Primary button label */
  primaryButtonLabel = input<string>();

  /** Secondary button label */
  secondaryButtonLabel = input<string>();

  /** Show primary button */
  showPrimaryButton = input<boolean>(true);

  /** Show secondary button */
  showSecondaryButton = input<boolean>(true);

  // ========================================
  // Outputs
  // ========================================

  /** Emitted when primary button is clicked */
  primaryAction = output<void>();

  /** Emitted when secondary button is clicked */
  secondaryAction = output<void>();

  // ========================================
  // Computed Properties
  // ========================================

  /**
   * Get hero container classes
   */
  getHeroClasses(): string {
    const cfg = this.config();
    const classes = ['hero'];

    // Background type
    classes.push(`hero-bg-${cfg.background || 'gradient'}`);

    // Size
    classes.push(`hero-size-${cfg.size || 'lg'}`);

    // Alignment
    classes.push(`hero-align-${cfg.alignment || 'center'}`);

    // Overlay
    if (cfg.overlay && cfg.background === 'image') {
      classes.push('hero-overlay');
    }

    return classes.join(' ');
  }

  /**
   * Get hero background style
   */
  getHeroStyle(): Record<string, string> {
    const cfg = this.config();
    const style: Record<string, string> = {};

    if (cfg.background === 'image' && cfg.backgroundImage) {
      style['background-image'] = `url(${cfg.backgroundImage})`;
    }

    if (cfg.background === 'solid' && cfg.backgroundColor) {
      style['background-color'] = cfg.backgroundColor;
    }

    return style;
  }

  /**
   * Get overlay style
   */
  getOverlayStyle(): Record<string, string> {
    const cfg = this.config();
    const style: Record<string, string> = {};

    if (cfg.overlay && cfg.overlayOpacity !== undefined) {
      style['opacity'] = cfg.overlayOpacity.toString();
    }

    return style;
  }

  // ========================================
  // Methods
  // ========================================

  /**
   * Handle primary button click
   */
  onPrimaryClick(): void {
    this.primaryAction.emit();
  }

  /**
   * Handle secondary button click
   */
  onSecondaryClick(): void {
    this.secondaryAction.emit();
  }
}
