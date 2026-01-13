import { Component, input, output, model, computed, signal, effect } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {
  // Inputs
  value = model<string>(''); // Two-way binding
  placeholder = input<string>('Search...');
  disabled = input<boolean>(false);
  debounceTime = input<number>(300); // Debounce delay in ms
  minLength = input<number>(0); // Minimum characters before search
  showClearButton = input<boolean>(true);
  autoFocus = input<boolean>(false);
  id = input<string>(`search-box-${Math.random().toString(36).substr(2, 9)}`);

  // Outputs
  search = output<string>(); // Debounced search query
  cleared = output<void>();
  focused = output<void>();
  blurred = output<void>();

  // Internal Signals
  private isFocused = signal<boolean>(false);
  private debounceTimer: any = null;

  // Computed Properties
  readonly containerClasses = computed(() => {
    const classes: string[] = ['search-box-container'];
    if (this.isFocused()) classes.push('search-box-focused');
    if (this.disabled()) classes.push('search-box-disabled');
    return classes.join(' ');
  });

  readonly showClear = computed(() => {
    return this.showClearButton() && this.value().length > 0 && !this.disabled();
  });

  // Effect for debounced search
  constructor() {
    effect(() => {
      const query = this.value();
      const minLen = this.minLength();

      // Clear existing timer
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }

      // Only trigger search if meets minimum length
      if (query.length >= minLen) {
        this.debounceTimer = setTimeout(() => {
          this.search.emit(query);
        }, this.debounceTime());
      } else if (query.length === 0) {
        // Emit empty search immediately when cleared
        this.search.emit('');
      }
    });
  }

  // Methods
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value.set(input.value);
  }

  onFocus(): void {
    this.isFocused.set(true);
    this.focused.emit();
  }

  onBlur(): void {
    this.isFocused.set(false);
    this.blurred.emit();
  }

  onClear(): void {
    this.value.set('');
    this.cleared.emit();
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.onClear();
      (event.target as HTMLInputElement).blur();
    }
  }
}
