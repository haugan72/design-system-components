# Button Group Component

A flexible container component for grouping related buttons together with consistent spacing, dividers, and responsive behavior.

## Features

- ✅ Horizontal and vertical orientations
- ✅ Customizable gap between buttons
- ✅ Optional dividers between buttons
- ✅ Attached mode (buttons connected with no gap)
- ✅ Full-width option
- ✅ Responsive modes (wrap, scroll, stack)
- ✅ Works with Button and Icon Button components
- ✅ WCAG AA accessible
- ✅ TypeScript with Angular Signals

## Installation

```typescript
import { ButtonGroupComponent } from './button-group/button-group.component';
import { ButtonComponent } from './button/button.component';

@Component({
  standalone: true,
  imports: [ButtonGroupComponent, ButtonComponent],
  // ...
})
```

## Basic Usage

```html
<app-button-group>
  <app-button variant="outline">Cancel</app-button>
  <app-button variant="secondary">Save Draft</app-button>
  <app-button variant="primary">Publish</app-button>
</app-button-group>
```

## Orientation

### Horizontal (Default)
Buttons arranged in a row.

```html
<app-button-group orientation="horizontal">
  <app-button variant="ghost" icon="←">Back</app-button>
  <app-button variant="outline">Save</app-button>
  <app-button variant="primary">Next</app-button>
</app-button-group>
```

### Vertical
Buttons stacked vertically.

```html
<app-button-group orientation="vertical">
  <app-button variant="primary" fullWidth>New Document</app-button>
  <app-button variant="outline" fullWidth>Open Existing</app-button>
  <app-button variant="outline" fullWidth>Import</app-button>
</app-button-group>
```

## Gap Control

### Default Gap (8px)
```html
<app-button-group>
  <app-button>One</app-button>
  <app-button>Two</app-button>
  <app-button>Three</app-button>
</app-button-group>
```

### Custom Gap
```html
<app-button-group [gap]="16">
  <app-button>Wider</app-button>
  <app-button>Spacing</app-button>
</app-button-group>
```

### No Gap (Attached)
```html
<app-button-group [gap]="0">
  <app-button>Tight</app-button>
  <app-button>Together</app-button>
</app-button-group>
```

## Attached Mode

Removes gap and connects buttons together (like segmented control).

```html
<app-button-group [attached]="true">
  <app-button variant="outline">Day</app-button>
  <app-button variant="outline">Week</app-button>
  <app-button variant="primary">Month</app-button>
  <app-button variant="outline">Year</app-button>
</app-button-group>
```

## Dividers

Add visual separators between buttons.

```html
<app-button-group [divided]="true">
  <app-button variant="ghost" icon="📋">Copy</app-button>
  <app-button variant="ghost" icon="✂">Cut</app-button>
  <app-button variant="ghost" icon="📄">Paste</app-button>
</app-button-group>
```

## Full Width

Make buttons expand to fill container width equally.

```html
<app-button-group [fullWidth]="true">
  <app-button variant="outline">Reject</app-button>
  <app-button variant="primary">Approve</app-button>
</app-button-group>
```

## Responsive Modes

### Wrap (Default)
Buttons wrap to next line on overflow.

```html
<app-button-group responsive="wrap">
  <app-button>Button 1</app-button>
  <app-button>Button 2</app-button>
  <app-button>Button 3</app-button>
  <app-button>Button 4</app-button>
  <app-button>Button 5</app-button>
</app-button-group>
```

### Scroll
Horizontal scroll on overflow.

```html
<app-button-group responsive="scroll">
  <app-button>Jan</app-button>
  <app-button>Feb</app-button>
  <app-button>Mar</app-button>
  <!-- More buttons... -->
</app-button-group>
```

### Stack
Convert to vertical on mobile (<768px).

```html
<app-button-group responsive="stack">
  <app-button variant="outline" icon="⬇">Download</app-button>
  <app-button variant="primary" icon="↗">Share</app-button>
</app-button-group>
```

## API Reference

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Button layout direction |
| `gap` | `number` | `8` | Gap between buttons in pixels |
| `responsive` | `'wrap' \| 'scroll' \| 'stack'` | `'wrap'` | Responsive behavior on overflow |
| `divided` | `boolean` | `false` | Show dividers between buttons |
| `fullWidth` | `boolean` | `false` | Make buttons fill container width |
| `attached` | `boolean` | `false` | Remove gap and connect buttons |

### Outputs

None - this is a layout container component.

## Examples

### Wizard Navigation

```html
<app-button-group [fullWidth]="true" responsive="stack">
  <app-button
    variant="ghost"
    icon="←"
    [disabled]="currentStep === 0"
    (clicked)="previousStep()">
    Previous
  </app-button>

  <app-button
    variant="primary"
    icon="→"
    iconPosition="right"
    (clicked)="nextStep()">
    Next
  </app-button>
</app-button-group>
```

### Toolbar Actions

```html
<app-button-group [divided]="true">
  <app-icon-button variant="ghost" icon="📁" ariaLabel="Open"></app-icon-button>
  <app-icon-button variant="ghost" icon="💾" ariaLabel="Save"></app-icon-button>
  <app-icon-button variant="ghost" icon="🖨" ariaLabel="Print"></app-icon-button>
</app-button-group>
```

### Segmented Control (Tab-like)

```html
<app-button-group [attached]="true">
  <app-button
    [variant]="view === 'grid' ? 'primary' : 'outline'"
    icon="⊞"
    (clicked)="view = 'grid'">
    Grid
  </app-button>

  <app-button
    [variant]="view === 'list' ? 'primary' : 'outline'"
    icon="☰"
    (clicked)="view = 'list'">
    List
  </app-button>

  <app-button
    [variant]="view === 'table' ? 'primary' : 'outline'"
    icon="▦"
    (clicked)="view = 'table'">
    Table
  </app-button>
</app-button-group>
```

### Modal Actions

```html
<div class="modal-footer">
  <app-button-group>
    <app-button variant="ghost" (clicked)="cancel()">
      Cancel
    </app-button>

    <app-button
      variant="primary"
      [loading]="isSaving"
      (clicked)="save()">
      Save Changes
    </app-button>
  </app-button-group>
</div>
```

### Filter Bar

```html
<app-button-group [attached]="true" responsive="scroll">
  <app-button
    [variant]="filter === 'all' ? 'primary' : 'outline'"
    (clicked)="setFilter('all')">
    All ({{ counts.all }})
  </app-button>

  <app-button
    [variant]="filter === 'active' ? 'primary' : 'outline'"
    (clicked)="setFilter('active')">
    Active ({{ counts.active }})
  </app-button>

  <app-button
    [variant]="filter === 'completed' ? 'primary' : 'outline'"
    (clicked)="setFilter('completed')">
    Completed ({{ counts.completed }})
  </app-button>

  <app-button
    [variant]="filter === 'archived' ? 'primary' : 'outline'"
    (clicked)="setFilter('archived')">
    Archived ({{ counts.archived }})
  </app-button>
</app-button-group>
```

### Card Actions

```html
<div class="card">
  <div class="card-body">
    <h3>Confirm Action</h3>
    <p>Are you sure you want to proceed?</p>
  </div>

  <div class="card-footer">
    <app-button-group [fullWidth]="true">
      <app-button variant="outline" (clicked)="cancel()">
        No, Cancel
      </app-button>
      <app-button variant="danger" (clicked)="confirm()">
        Yes, Delete
      </app-button>
    </app-button-group>
  </div>
</div>
```

### Pagination Controls

```html
<app-button-group [attached]="true">
  <app-icon-button
    variant="outline"
    icon="⟨"
    ariaLabel="Previous page"
    [disabled]="page === 1"
    (clicked)="prevPage()">
  </app-icon-button>

  @for (pageNum of visiblePages; track pageNum) {
    <app-button
      [variant]="pageNum === page ? 'primary' : 'outline'"
      (clicked)="goToPage(pageNum)">
      {{ pageNum }}
    </app-button>
  }

  <app-icon-button
    variant="outline"
    icon="⟩"
    ariaLabel="Next page"
    [disabled]="page === totalPages"
    (clicked)="nextPage()">
  </app-icon-button>
</app-button-group>
```

### Text Formatting Toolbar

```html
<app-button-group [attached]="true" [divided]="false">
  <app-icon-button
    variant="outline"
    icon="B"
    ariaLabel="Bold"
    [disabled]="!canFormat"
    (clicked)="format('bold')">
  </app-icon-button>

  <app-icon-button
    variant="outline"
    icon="I"
    ariaLabel="Italic"
    [disabled]="!canFormat"
    (clicked)="format('italic')">
  </app-icon-button>

  <app-icon-button
    variant="outline"
    icon="U"
    ariaLabel="Underline"
    [disabled]="!canFormat"
    (clicked)="format('underline')">
  </app-icon-button>
</app-button-group>
```

### Social Sharing

```html
<app-button-group [gap]="12" responsive="wrap">
  <app-button variant="outline" icon="📘" (clicked)="shareOn('facebook')">
    Facebook
  </app-button>

  <app-button variant="outline" icon="🐦" (clicked)="shareOn('twitter')">
    Twitter
  </app-button>

  <app-button variant="outline" icon="💼" (clicked)="shareOn('linkedin')">
    LinkedIn
  </app-button>

  <app-button variant="outline" icon="✉" (clicked)="shareOn('email')">
    Email
  </app-button>
</app-button-group>
```

### Vertical Menu

```html
<app-button-group orientation="vertical">
  <app-button variant="ghost" icon="👤" iconPosition="left">
    Profile
  </app-button>

  <app-button variant="ghost" icon="⚙" iconPosition="left">
    Settings
  </app-button>

  <app-button variant="ghost" icon="❓" iconPosition="left">
    Help
  </app-button>

  <app-button variant="danger" icon="→" iconPosition="left">
    Sign Out
  </app-button>
</app-button-group>
```

### Responsive Form Actions

```html
<form (submit)="handleSubmit()">
  <!-- Form fields -->

  <app-button-group
    [fullWidth]="true"
    responsive="stack"
    [gap]="12">
    <app-button
      type="reset"
      variant="ghost"
      (clicked)="resetForm()">
      Reset
    </app-button>

    <app-button
      type="button"
      variant="outline"
      (clicked)="saveDraft()">
      Save Draft
    </app-button>

    <app-button
      type="submit"
      variant="primary"
      [loading]="isSubmitting"
      icon="✓">
      Submit
    </app-button>
  </app-button-group>
</form>
```

## Styling

The component uses DesignSystemA design tokens:

```css
:root {
  --color-border: #E5E7EB;     /* Divider color */
  --color-primary: #6366F1;     /* Active button */
  --radius-md: 12px;            /* Border radius */
}
```

### Custom Styling

```css
/* Custom gap for specific group */
.btn-group-tight {
  gap: 4px !important;
}

/* Custom divider color */
.btn-group-custom-divider .btn:not(:last-child)::after {
  background: #6366F1;
  opacity: 0.3;
}
```

## Accessibility

- ✅ **Semantic HTML**: Uses `role="group"` for screen readers
- ✅ **ARIA Attributes**: `aria-orientation` indicates layout direction
- ✅ **Keyboard Navigation**: All buttons remain keyboard accessible
- ✅ **Focus Management**: Standard tab order maintained
- ✅ **Reduced Motion**: Respects `prefers-reduced-motion` for scroll behavior

## Best Practices

### Do's ✅
- Group related actions together (e.g., Save/Cancel, Previous/Next)
- Use consistent button variants within a group
- Provide adequate spacing between groups
- Use attached mode for toggle-like selections
- Consider mobile responsiveness (use `responsive="stack"`)
- Use dividers to separate distinct action categories

### Don'ts ❌
- Don't mix too many button variants in one group
- Don't create excessively long button groups (consider splitting)
- Don't forget to handle overflow with responsive modes
- Don't use button groups for navigation (use navigation components)
- Don't stack multiple button groups without spacing

## Responsive Behavior

### Desktop
- Horizontal layout with consistent spacing
- Hover effects on individual buttons
- Dividers visible between buttons

### Tablet (768px-1024px)
- Wrap mode allows buttons to flow to next line
- Scroll mode provides horizontal scrolling
- Stack mode maintains horizontal layout

### Mobile (<768px)
- Wrap mode: Buttons wrap naturally
- Scroll mode: Horizontal scroll with touch support
- Stack mode: Converts to vertical layout (full width buttons)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes

- Works seamlessly with Button and Icon Button components
- Gap is ignored when `attached` is true
- Attached mode removes internal borders to prevent doubling
- Dividers are semi-transparent and adapt to dark mode
- Responsive modes only affect overflow behavior
- Component uses `ng-content` for flexible button projection

## Dependencies

- Angular 19+ with Signals
- Works with Button and Icon Button components
- Uses CSS variables for theming
- No external UI libraries required
