import { Component, signal, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Navigation link interface
 */
export interface NavLink {
  id: string;
  label: string;
  href?: string;
  icon?: string;
  active?: boolean;
  disabled?: boolean;
}

/**
 * User data interface
 */
export interface UserData {
  name: string;
  email?: string;
  avatar?: string;
  role?: string;
}

/**
 * User menu action interface
 */
export interface UserMenuAction {
  id: string;
  label: string;
  icon?: string;
  divider?: boolean;
}

/**
 * Configuration for the top navigation
 */
export interface TopNavigationConfig {
  /** Show search box */
  showSearch?: boolean;
  /** Sticky positioning */
  sticky?: boolean;
  /** Show user menu */
  showUserMenu?: boolean;
  /** Theme variant */
  theme?: 'light' | 'dark';
}

/**
 * World-class Top Navigation Component
 *
 * A professional, accessible, and feature-rich top navigation bar with
 * sticky positioning, search functionality, and user menu.
 *
 * @example
 * ```html
 * <app-top-navigation
 *   [logo]="'/assets/logo.svg'"
 *   [links]="navLinks"
 *   [user]="currentUser"
 *   [config]="{showSearch: true, sticky: true}"
 *   (linkClick)="onNavLinkClick($event)"
 *   (searchQuery)="onSearch($event)"
 *   (userMenuAction)="onUserAction($event)">
 * </app-top-navigation>
 * ```
 */
@Component({
  selector: 'app-top-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-navigation.component.html',
  styleUrl: './top-navigation.component.css'
})
export class TopNavigationComponent {
  // ========================================
  // Inputs
  // ========================================

  /** Logo image URL or text */
  logo = input<string>();

  /** Navigation links */
  links = input<NavLink[]>([]);

  /** User data for avatar and menu */
  user = input<UserData>();

  /** User menu actions */
  userMenuActions = input<UserMenuAction[]>([
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'divider', label: '', divider: true },
    { id: 'logout', label: 'Logout', icon: '🚪' }
  ]);

  /** Component configuration */
  config = input<TopNavigationConfig>({
    showSearch: true,
    sticky: true,
    showUserMenu: true,
    theme: 'light'
  });

  // ========================================
  // Outputs
  // ========================================

  /** Emitted when a navigation link is clicked */
  linkClick = output<NavLink>();

  /** Emitted when search query changes (debounced) */
  searchQuery = output<string>();

  /** Emitted when user menu action is clicked */
  userMenuAction = output<string>();

  /** Emitted when logo is clicked */
  logoClick = output<void>();

  // ========================================
  // Signals
  // ========================================

  /** Mobile menu open state */
  private mobileMenuOpen = signal<boolean>(false);

  /** User menu open state */
  private userMenuOpen = signal<boolean>(false);

  /** Search expanded state (mobile) */
  private searchExpanded = signal<boolean>(false);

  /** Search query value */
  private searchQueryValue = signal<string>('');

  /** Search debounce timer */
  private searchDebounceTimer: any = null;

  // ========================================
  // Computed Properties
  // ========================================

  /** Check if mobile menu is open */
  readonly isMobileMenuOpen = computed(() => this.mobileMenuOpen());

  /** Check if user menu is open */
  readonly isUserMenuOpen = computed(() => this.userMenuOpen());

  /** Check if search is expanded */
  readonly isSearchExpanded = computed(() => this.searchExpanded());

  /** Get current search query */
  readonly currentSearchQuery = computed(() => this.searchQueryValue());

  /** Get user initials for avatar fallback */
  readonly userInitials = computed(() => {
    const userData = this.user();
    if (!userData) return '';
    const names = userData.name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return userData.name.substring(0, 2).toUpperCase();
  });

  /** Check if navigation is sticky */
  readonly isSticky = computed(() => this.config().sticky);

  /** Get theme class */
  readonly themeClass = computed(() => `nav-theme-${this.config().theme || 'light'}`);

  // ========================================
  // Methods
  // ========================================

  /**
   * Handle logo click
   */
  onLogoClick(): void {
    this.logoClick.emit();
  }

  /**
   * Handle navigation link click
   */
  onLinkClick(link: NavLink, event: Event): void {
    if (link.disabled) {
      event.preventDefault();
      return;
    }

    this.linkClick.emit(link);

    // Close mobile menu after selection
    if (this.mobileMenuOpen()) {
      this.mobileMenuOpen.set(false);
    }
  }

  /**
   * Toggle mobile menu
   */
  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(open => !open);

    // Close user menu if open
    if (this.userMenuOpen()) {
      this.userMenuOpen.set(false);
    }
  }

  /**
   * Toggle user menu
   */
  toggleUserMenu(): void {
    this.userMenuOpen.update(open => !open);
  }

  /**
   * Toggle search expansion (mobile)
   */
  toggleSearch(): void {
    this.searchExpanded.update(expanded => !expanded);

    // Focus input when expanded
    if (this.searchExpanded()) {
      setTimeout(() => {
        const input = document.querySelector('.nav-search-input') as HTMLInputElement;
        if (input) input.focus();
      }, 100);
    }
  }

  /**
   * Handle search input
   */
  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const query = input.value;

    this.searchQueryValue.set(query);

    // Debounce search query emission
    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer);
    }

    this.searchDebounceTimer = setTimeout(() => {
      this.searchQuery.emit(query);
    }, 300);
  }

  /**
   * Clear search
   */
  clearSearch(): void {
    this.searchQueryValue.set('');
    this.searchQuery.emit('');
  }

  /**
   * Handle user menu action click
   */
  onUserMenuActionClick(action: UserMenuAction): void {
    if (action.divider) return;

    this.userMenuAction.emit(action.id);
    this.userMenuOpen.set(false);
  }

  /**
   * Close menus when clicking outside
   */
  closeMenus(): void {
    this.userMenuOpen.set(false);
  }

  /**
   * Handle keyboard navigation for accessibility
   */
  onKeyDown(event: KeyboardEvent, link: NavLink): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onLinkClick(link, event);
    }
  }
}
