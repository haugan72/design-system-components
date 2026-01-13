import { Component, signal, input, output, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Notification types
 */
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

/**
 * Notification position
 */
export type NotificationPosition = 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';

/**
 * Notification configuration
 */
export interface NotificationConfig {
  duration?: number; // Duration in ms (0 = no auto-dismiss)
  position?: NotificationPosition;
  showCloseButton?: boolean;
  showIcon?: boolean;
}

/**
 * Notification data
 */
export interface Notification {
  id: string;
  type: NotificationType;
  title?: string;
  message: string;
  config?: NotificationConfig;
}

/**
 * Notification Component (Toast/Alert)
 *
 * A flexible notification/toast component for displaying temporary messages to users.
 * Supports multiple types, positions, and auto-dismiss functionality.
 *
 * Features:
 * - Multiple types (success, error, warning, info)
 * - Auto-dismiss with configurable duration
 * - Multiple positions on screen
 * - Smooth slide-in/fade-out animations
 * - Stacking notifications
 * - Progress bar for auto-dismiss
 * - Accessible with ARIA labels
 * - Pause on hover
 *
 * @example
 * ```html
 * <app-notification
 *   [notifications]="notifications()"
 *   (dismiss)="onDismiss($event)">
 * </app-notification>
 * ```
 */
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  // ========================================
  // Inputs
  // ========================================

  /** Array of notifications to display */
  notifications = input<Notification[]>([]);

  /** Default configuration for all notifications */
  defaultConfig = input<NotificationConfig>({
    duration: 5000,
    position: 'top-right',
    showCloseButton: true,
    showIcon: true
  });

  // ========================================
  // Outputs
  // ========================================

  /** Emitted when a notification is dismissed */
  dismiss = output<string>(); // notification id

  // ========================================
  // Internal State
  // ========================================

  /** Map of notification timers */
  private timers = new Map<string, any>();

  /** Map of paused notifications */
  private pausedNotifications = new Set<string>();

  // ========================================
  // Lifecycle
  // ========================================

  constructor() {
    // Set up auto-dismiss timers
    effect(() => {
      const notifications = this.notifications();

      // Clear old timers
      this.timers.forEach((timer, id) => {
        if (!notifications.find(n => n.id === id)) {
          clearTimeout(timer);
          this.timers.delete(id);
        }
      });

      // Set up new timers
      notifications.forEach(notification => {
        if (!this.timers.has(notification.id)) {
          this.setupAutoDismiss(notification);
        }
      });
    });
  }

  ngOnDestroy(): void {
    // Clear all timers
    this.timers.forEach(timer => clearTimeout(timer));
    this.timers.clear();
  }

  // ========================================
  // Methods
  // ========================================

  /**
   * Set up auto-dismiss timer for notification
   */
  private setupAutoDismiss(notification: Notification): void {
    const config = { ...this.defaultConfig(), ...notification.config };

    if (config.duration && config.duration > 0) {
      const timer = setTimeout(() => {
        if (!this.pausedNotifications.has(notification.id)) {
          this.onDismiss(notification.id);
        }
      }, config.duration);

      this.timers.set(notification.id, timer);
    }
  }

  /**
   * Handle notification dismiss
   */
  onDismiss(id: string): void {
    const timer = this.timers.get(id);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(id);
    }
    this.pausedNotifications.delete(id);
    this.dismiss.emit(id);
  }

  /**
   * Pause auto-dismiss on hover
   */
  onMouseEnter(id: string): void {
    this.pausedNotifications.add(id);
  }

  /**
   * Resume auto-dismiss on mouse leave
   */
  onMouseLeave(id: string): void {
    this.pausedNotifications.delete(id);
  }

  /**
   * Get notification icon
   */
  getIcon(type: NotificationType): string {
    switch (type) {
      case 'success': return '✓';
      case 'error': return '✕';
      case 'warning': return '⚠';
      case 'info': return 'ℹ';
      default: return '';
    }
  }

  /**
   * Get merged configuration
   */
  getConfig(notification: Notification): NotificationConfig {
    return { ...this.defaultConfig(), ...notification.config };
  }

  /**
   * Get position class
   */
  getPositionClass(position: NotificationPosition): string {
    return `notification-${position}`;
  }

  /**
   * Group notifications by position
   */
  getNotificationsByPosition(position: NotificationPosition): Notification[] {
    return this.notifications().filter(n => {
      const config = this.getConfig(n);
      return config.position === position;
    });
  }

  /**
   * Get all unique positions
   */
  getAllPositions(): NotificationPosition[] {
    const positions = new Set<NotificationPosition>();
    this.notifications().forEach(n => {
      const config = this.getConfig(n);
      if (config.position) {
        positions.add(config.position);
      }
    });
    return Array.from(positions);
  }
}
