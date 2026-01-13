# Hero Component

A flexible hero section component for landing pages and featured content with multiple background options and customizable layouts.

## Features

- ✅ **Multiple backgrounds** - gradient, image, solid color, or none
- ✅ **Flexible sizing** - sm, md, lg, xl size options
- ✅ **Alignment options** - left, center, right alignment
- ✅ **Image overlay** - Optional dark overlay for background images
- ✅ **CTA buttons** - Primary and secondary action buttons
- ✅ **Content slots** - Custom content via ng-content
- ✅ **Responsive** - Mobile-optimized with centered layout
- ✅ **Accessible** - Proper semantic HTML and ARIA labels

## Installation

```typescript
import { HeroComponent } from './components/hero';

@Component({
  imports: [HeroComponent],
  // ...
})
```

## Basic Usage

```html
<app-hero
  [title]="'Welcome to Our Platform'"
  [subtitle]="'Build amazing experiences with our tools'"
  [config]="{background: 'gradient', size: 'lg', alignment: 'center'}"
  [primaryButtonLabel]="'Get Started'"
  [secondaryButtonLabel]="'Learn More'"
  (primaryAction)="onGetStarted()"
  (secondaryAction)="onLearnMore()">
</app-hero>
```

```typescript
export class MyComponent {
  onGetStarted() {
    console.log('Get started clicked');
  }

  onLearnMore() {
    console.log('Learn more clicked');
  }
}
```

## Advanced Usage

### Gradient Background (Default)

```html
<app-hero
  [title]="'Discover Our Product'"
  [subtitle]="'The best solution for your business'"
  [config]="{background: 'gradient', size: 'lg', alignment: 'center'}"
  [primaryButtonLabel]="'Try Free'"
  [secondaryButtonLabel]="'Watch Demo'"
  (primaryAction)="startTrial()"
  (secondaryAction)="watchDemo()">
</app-hero>
```

### Image Background with Overlay

```html
<app-hero
  [title]="'Transform Your Workflow'"
  [subtitle]="'Streamline operations and boost productivity'"
  [config]="{
    background: 'image',
    backgroundImage: 'https://example.com/hero-bg.jpg',
    overlay: true,
    overlayOpacity: 0.6,
    size: 'xl',
    alignment: 'center'
  }"
  [primaryButtonLabel]="'Get Started'"
  (primaryAction)="navigate('/signup')">
</app-hero>
```

### Solid Color Background

```html
<app-hero
  [title]="'Clean and Simple'"
  [subtitle]="'Minimalist design for maximum impact'"
  [config]="{
    background: 'solid',
    backgroundColor: '#FAFAFA',
    size: 'md',
    alignment: 'left'
  }"
  [primaryButtonLabel]="'Learn More'"
  (primaryAction)="showDetails()">
</app-hero>
```

### Left-Aligned with Description

```html
<app-hero
  [title]="'Enterprise Solutions'"
  [subtitle]="'Scale your business with confidence'"
  [description]="'Our platform provides the tools and infrastructure you need to grow. Trusted by 1000+ companies worldwide.'"
  [config]="{background: 'gradient', size: 'lg', alignment: 'left'}"
  [primaryButtonLabel]="'Contact Sales'"
  [secondaryButtonLabel]="'View Pricing'"
  (primaryAction)="contactSales()"
  (secondaryAction)="viewPricing()">
</app-hero>
```

### Small Hero with Custom Content

```html
<app-hero
  [title]="'Newsletter'"
  [subtitle]="'Stay updated with our latest news'"
  [config]="{background: 'solid', size: 'sm', alignment: 'center'}"
  [showPrimaryButton]="false"
  [showSecondaryButton]="false">

  <!-- Custom content slot -->
  <form class="newsletter-form">
    <input type="email" placeholder="Enter your email" />
    <button type="submit">Subscribe</button>
  </form>
</app-hero>
```

## API Reference

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `title` | `string` | Required | Main hero title |
| `subtitle` | `string` | `undefined` | Hero subtitle |
| `description` | `string` | `undefined` | Additional description text |
| `config` | `HeroConfig` | `{background: 'gradient', ...}` | Hero configuration |
| `primaryButtonLabel` | `string` | `undefined` | Primary button text |
| `secondaryButtonLabel` | `string` | `undefined` | Secondary button text |
| `showPrimaryButton` | `boolean` | `true` | Show/hide primary button |
| `showSecondaryButton` | `boolean` | `true` | Show/hide secondary button |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `primaryAction` | `void` | Emitted when primary button clicked |
| `secondaryAction` | `void` | Emitted when secondary button clicked |

### Types

```typescript
interface HeroConfig {
  background?: 'gradient' | 'image' | 'solid' | 'none';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  alignment?: 'left' | 'center' | 'right';
  backgroundImage?: string;        // URL for image background
  backgroundColor?: string;         // Color for solid background
  overlay?: boolean;                // Show overlay on image (default: true)
  overlayOpacity?: number;          // Overlay opacity 0-1 (default: 0.5)
}
```

### Sizes

- **sm**: 300px min-height, 48px padding
- **md**: 400px min-height, 64px padding
- **lg**: 500px min-height, 80px padding
- **xl**: 600px min-height, 100px padding

### Background Types

- **gradient**: Blue gradient (primary color)
- **image**: Custom background image with optional overlay
- **solid**: Solid background color
- **none**: Transparent background

## Examples

### Landing Page Hero

```typescript
export class LandingPageComponent {
  heroConfig: HeroConfig = {
    background: 'gradient',
    size: 'xl',
    alignment: 'center'
  };

  startTrial() {
    this.router.navigate(['/signup']);
  }

  watchDemo() {
    this.dialog.open(DemoVideoComponent);
  }
}
```

```html
<app-hero
  [title]="'Build Better Software Faster'"
  [subtitle]="'The complete platform for modern development teams'"
  [description]="'Ship features with confidence using our integrated CI/CD, monitoring, and collaboration tools.'"
  [config]="heroConfig"
  [primaryButtonLabel]="'Start Free Trial'"
  [secondaryButtonLabel]="'Watch Demo'"
  (primaryAction)="startTrial()"
  (secondaryAction)="watchDemo()">
</app-hero>
```

### Feature Announcement

```html
<app-hero
  [title]="'Introducing Dark Mode'"
  [subtitle]="'A beautiful new way to work at night'"
  [config]="{
    background: 'image',
    backgroundImage: '/assets/dark-mode-hero.jpg',
    overlay: true,
    size: 'lg',
    alignment: 'center'
  }"
  [primaryButtonLabel]="'Enable Now'"
  (primaryAction)="enableDarkMode()">
</app-hero>
```

### Simple Call-to-Action

```html
<app-hero
  [title]="'Ready to Get Started?'"
  [subtitle]="'Join thousands of happy customers'"
  [config]="{background: 'solid', size: 'md', alignment: 'center'}"
  [primaryButtonLabel]="'Sign Up Free'"
  [secondaryButtonLabel]="'Contact Us'"
  (primaryAction)="signup()"
  (secondaryAction)="contact()">
</app-hero>
```

## Styling

The component uses CSS variables from the Modern Business Design System:

```css
--color-primary: #2563EB
--color-primary-dark: #1E40AF
--color-bg-subtle: #FAFAFA
--color-text-primary: #1F2937
--color-border: #E5E7EB
--radius-lg: 12px
```

## Content Slot

Use `<ng-content>` to add custom content below the buttons:

```html
<app-hero [title]="'Custom Hero'" [config]="config">
  <div class="custom-content">
    <!-- Your custom HTML here -->
    <div class="stats">
      <span>1000+ Users</span>
      <span>50+ Countries</span>
      <span>99.9% Uptime</span>
    </div>
  </div>
</app-hero>
```

## Accessibility

- ✅ Semantic `<section>` with `role="banner"`
- ✅ Proper heading hierarchy (`<h1>`)
- ✅ ARIA labels on buttons
- ✅ Focus visible states
- ✅ Keyboard accessible buttons
- ✅ Reduced motion support
- ✅ High contrast mode support

## Responsive Behavior

- **Desktop (>1024px)**: Full size with specified alignment
- **Tablet (768-1024px)**: Slightly smaller text and padding
- **Mobile (<768px)**: Centered layout, stacked buttons
- **Small Mobile (<480px)**: Full-width buttons, reduced spacing

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

Part of the Modern Business Design System.
