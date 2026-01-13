# Component Creation Checklist

Use this checklist when creating new components to ensure nothing is missed.

## ✅ Before You Start

- [ ] Read the Modern Business Design System files
- [ ] Understand the component requirements
- [ ] Identify the target app (or create as shared)
- [ ] Choose appropriate component category

## ✅ During Development

### Component Files
- [ ] Create `.component.ts` with TypeScript interfaces
- [ ] Create `.component.html` with semantic HTML
- [ ] Create `.component.css` with design system tokens
- [ ] Create `README.md` with documentation
- [ ] Create `index.ts` for public API exports

### Code Quality
- [ ] Use Angular Signals for state
- [ ] Use `input()` for component inputs
- [ ] Use `output()` for events
- [ ] Use `computed()` for derived state
- [ ] Strict TypeScript (no `any` types)
- [ ] Standalone component architecture

### Design & Styling
- [ ] Use Modern Business Design System CSS variables
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Smooth animations and transitions
- [ ] Proper spacing and typography
- [ ] Theme support (if applicable)

### Accessibility
- [ ] Semantic HTML elements
- [ ] ARIA labels where needed
- [ ] Keyboard navigation support
- [ ] Focus visible states
- [ ] Screen reader tested
- [ ] Color contrast (WCAG AA)
- [ ] Reduced motion support

### States & Edge Cases
- [ ] Loading state
- [ ] Error state
- [ ] Empty state
- [ ] Disabled state (if applicable)
- [ ] Handle null/undefined data gracefully

## ✅ After Development

### Documentation
- [ ] JSDoc comments on public APIs
- [ ] Usage examples in README
- [ ] Document all inputs
- [ ] Document all outputs
- [ ] Document configuration options
- [ ] Add visual examples or screenshots

### Testing
- [ ] Manual testing on desktop
- [ ] Manual testing on mobile
- [ ] Manual testing on tablet
- [ ] Keyboard navigation tested
- [ ] Screen reader tested (optional but recommended)

### Component Gallery Integration ⚠️ CRITICAL

- [ ] **Add component metadata** to `component-gallery.component.ts`:
  ```typescript
  {
    name: 'Component Name',
    description: 'Brief description',
    category: 'data-visualization', // or forms, layout, navigation, feedback
    version: '1.0.0',
    tags: ['tag1', 'tag2'],
    status: 'stable' // or beta, experimental
  }
  ```

- [ ] **Import component** in gallery TypeScript file

- [ ] **Add live preview** in gallery template:
  ```html
  @case ('Component Name') {
    <div class="preview-grid">
      <app-your-component></app-your-component>
    </div>
  }
  ```

- [ ] **Test gallery display** - verify component shows correctly

## ✅ Final Review

- [ ] Component works in isolation
- [ ] Component works in gallery
- [ ] Documentation is complete
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Follows design system guidelines
- [ ] Accessibility checklist passed
- [ ] Responsive design verified

## Component Categories

Choose the right category for the gallery:

| Category | Use For | Examples |
|----------|---------|----------|
| `data-visualization` | Charts, metrics, KPIs | KPI Card, Line Chart, Gauge |
| `forms` | Input controls | Text Input, Select, Checkbox |
| `layout` | Structure | Grid, Container, Card |
| `navigation` | Navigation | Menu, Tabs, Breadcrumbs |
| `feedback` | User feedback | Toast, Modal, Alert |

## Status Levels

| Status | When to Use | Meaning |
|--------|------------|---------|
| `stable` | Production ready | Fully tested, API stable |
| `beta` | Feature complete | Undergoing final testing |
| `experimental` | Early stage | API may change |

## Common Mistakes to Avoid

❌ Forgetting to add component to gallery
❌ Using `any` type instead of proper interfaces
❌ Missing accessibility features
❌ Not testing on mobile devices
❌ Skipping documentation
❌ Not using design system tokens
❌ Hard-coding colors instead of CSS variables
❌ Missing loading/error states
❌ Not handling empty data
❌ Poor keyboard navigation

## File Structure

```
your-component/
├── your-component.component.ts      (Component logic)
├── your-component.component.html    (Template)
├── your-component.component.css     (Styles)
├── your-component.example.ts        (Optional: Examples)
├── README.md                        (Documentation)
└── index.ts                         (Public API)
```

## Need Help?

- **Design System**: See `shared/design-systems/designSystems/modernBusinessDS/`
- **Example Component**: See `shared/design-systems/components/kpi-card/`
- **Gallery Setup**: See `shared/design-systems/components/component-gallery/README.md`

## Quick Links

- [Modern Business Design System](../designSystems/modernBusinessDS/)
- [Component Gallery](./component-gallery/)
- [KPI Card Example](./kpi-card/)
- [Angular UI Components Skill](../../.claude/skills/angular-ui-components.md)

---

**Remember**: The Component Gallery registration (Step 6) is CRITICAL. Every component must be visible in the gallery!
