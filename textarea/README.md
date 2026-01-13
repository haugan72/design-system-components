# Textarea Component

A customizable multi-line text input component with character counting, validation states, and full accessibility support.

## Features

- ✅ Multi-line text input with customizable rows
- ✅ Character counter with maxLength validation
- ✅ Label support with required indicator
- ✅ Validation states (error, success)
- ✅ Help text and error messages
- ✅ Two-way data binding with model()
- ✅ Resizable option (vertical)
- ✅ Disabled and readonly states
- ✅ WCAG AA accessible
- ✅ TypeScript with Angular Signals

## Installation

```typescript
import { TextareaComponent } from './components/textarea';

@Component({
  standalone: true,
  imports: [TextareaComponent],
  // ...
})
```

## Basic Usage

```html
<app-textarea
  [(value)]="description"
  label="Description"
  placeholder="Enter your description...">
</app-textarea>
```

## With Character Limit

```html
<app-textarea
  [(value)]="bio"
  label="Bio"
  [maxLength]="500"
  [showCharacterCount]="true"
  [rows]="6"
  placeholder="Tell us about yourself...">
</app-textarea>
```

## With Validation

```html
<app-textarea
  [(value)]="feedback"
  label="Feedback"
  [required]="true"
  [error]="feedbackError"
  helpText="Please provide detailed feedback">
</app-textarea>
```

## Non-Resizable

```html
<app-textarea
  [(value)]="notes"
  label="Notes"
  [resizable]="false"
  [rows]="8">
</app-textarea>
```

## API Reference

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `value` | `string` (model) | `''` | Current value (two-way binding) |
| `label` | `string` | - | Label text |
| `placeholder` | `string` | - | Placeholder text |
| `rows` | `number` | `4` | Number of visible rows |
| `error` | `string` | - | Error message |
| `helpText` | `string` | - | Help text below textarea |
| `disabled` | `boolean` | `false` | Disabled state |
| `readonly` | `boolean` | `false` | Readonly state |
| `required` | `boolean` | `false` | Show required indicator |
| `maxLength` | `number` | - | Maximum character length |
| `showCharacterCount` | `boolean` | `true` | Show character counter |
| `resizable` | `boolean` | `true` | Allow vertical resizing |
| `id` | `string` | auto-generated | Unique ID |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `valueChange` | `EventEmitter<string>` | Emitted when value changes |
| `focused` | `EventEmitter<void>` | Emitted when textarea gains focus |
| `blurred` | `EventEmitter<void>` | Emitted when textarea loses focus |

### Computed Properties

| Property | Type | Description |
|----------|------|-------------|
| `state` | `'default' \| 'error' \| 'success'` | Current validation state |
| `characterCount` | `string` | Current character count display |

## Examples

### Feedback Form

```typescript
@Component({
  template: `
    <app-textarea
      [(value)]="feedback"
      label="What can we improve?"
      [required]="true"
      [maxLength]="1000"
      [rows]="8"
      [error]="feedbackError"
      helpText="Your feedback helps us improve our service"
      (blurred)="validateFeedback()">
    </app-textarea>
  `
})
export class FeedbackFormComponent {
  feedback = signal('');
  feedbackError = signal('');

  validateFeedback(): void {
    if (this.feedback().length < 10) {
      this.feedbackError.set('Please provide more detailed feedback (min 10 characters)');
    } else {
      this.feedbackError.set('');
    }
  }
}
```

### Comment Box

```typescript
@Component({
  template: `
    <app-textarea
      [(value)]="comment"
      label="Add a comment"
      placeholder="Share your thoughts..."
      [rows]="3"
      [maxLength]="500"
      [showCharacterCount]="true">
    </app-textarea>

    <button
      [disabled]="comment().length === 0"
      (click)="postComment()">
      Post Comment
    </button>
  `
})
export class CommentBoxComponent {
  comment = signal('');

  postComment(): void {
    console.log('Posting:', this.comment());
    this.comment.set('');
  }
}
```

### Notes Editor

```typescript
@Component({
  template: `
    <app-textarea
      [(value)]="notes"
      label="Meeting Notes"
      [rows]="12"
      [resizable]="true"
      [showCharacterCount]="false"
      helpText="All notes are auto-saved"
      (valueChange)="autoSave()">
    </app-textarea>
  `
})
export class NotesEditorComponent {
  notes = signal('');
  private saveTimeout?: number;

  autoSave(): void {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }
    this.saveTimeout = setTimeout(() => {
      console.log('Auto-saving notes...');
      // Save logic here
    }, 1000);
  }
}
```

## Styling

Uses DesignSystemA tokens:

```css
--color-primary: #6366F1 (Indigo)
--color-border: #E5E7EB
--color-text-primary: #1F2937
--color-text-muted: #6B7280
--color-danger: #EF4444
--color-success: #10B981
--radius-md: 12px
--space-2: 8px
--space-3: 12px
```

### Custom Styling

Override CSS variables or add custom classes:

```css
app-textarea {
  --textarea-min-height: 150px;
}

.custom-textarea .textarea-container {
  border-radius: 8px;
}
```

## Accessibility

- Full ARIA support with `aria-invalid`, `aria-describedby`
- Proper label association with `for` attribute
- Focus management with visible focus states
- Error announcements for screen readers
- Keyboard navigation support
- High contrast mode support

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android 90+)

## Dependencies

- Angular 19+ with Signals
- No external UI libraries required
- Uses CSS variables for theming
