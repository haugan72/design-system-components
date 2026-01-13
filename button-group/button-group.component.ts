import { Component, input, computed } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

export type ButtonGroupOrientation = 'horizontal' | 'vertical';
export type ButtonGroupResponsive = 'wrap' | 'scroll' | 'stack';

@Component({
  selector: 'app-button-group',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './button-group.component.html',
  styleUrl: './button-group.component.css'
})
export class ButtonGroupComponent {
  // Inputs
  orientation = input<ButtonGroupOrientation>('horizontal');
  gap = input<number>(8); // Gap between buttons in pixels
  responsive = input<ButtonGroupResponsive>('wrap'); // How to handle overflow on mobile
  divided = input<boolean>(false); // Show dividers between buttons
  fullWidth = input<boolean>(false); // Make buttons fill container width
  attached = input<boolean>(false); // Remove gap and attach buttons together

  // Computed Properties
  readonly containerClasses = computed(() => {
    const classes: string[] = ['btn-group'];
    classes.push(`btn-group-${this.orientation()}`);

    if (this.divided()) {
      classes.push('btn-group-divided');
    }

    if (this.fullWidth()) {
      classes.push('btn-group-full-width');
    }

    if (this.attached()) {
      classes.push('btn-group-attached');
    }

    classes.push(`btn-group-responsive-${this.responsive()}`);

    return classes.join(' ');
  });

  readonly containerStyles = computed(() => {
    if (this.attached()) {
      return {}; // No gap when attached
    }

    return {
      gap: `${this.gap()}px`
    };
  });
}
