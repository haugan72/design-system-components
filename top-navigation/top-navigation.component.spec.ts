import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopNavigationComponent, NavLink, UserData } from './top-navigation.component';

describe('TopNavigationComponent', () => {
  let component: TopNavigationComponent;
  let fixture: ComponentFixture<TopNavigationComponent>;

  const mockLinks: NavLink[] = [
    { id: '1', label: 'Home', href: '/', active: true },
    { id: '2', label: 'Dashboard', href: '/dashboard' },
    { id: '3', label: 'Settings', href: '/settings' }
  ];

  const mockUser: UserData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '/assets/avatar.jpg'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopNavigationComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TopNavigationComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('links', mockLinks);
    fixture.componentRef.setInput('user', mockUser);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render navigation links', () => {
    const compiled = fixture.nativeElement;
    const links = compiled.querySelectorAll('.nav-link');
    expect(links.length).toBe(3);
    expect(links[0].textContent).toContain('Home');
  });

  it('should mark active link', () => {
    const compiled = fixture.nativeElement;
    const activeLink = compiled.querySelector('.nav-link-active');
    expect(activeLink).toBeTruthy();
    expect(activeLink.textContent).toContain('Home');
  });

  it('should emit linkClick event when link is clicked', () => {
    spyOn(component.linkClick, 'emit');
    component.onLinkClick(mockLinks[0], new Event('click'));
    expect(component.linkClick.emit).toHaveBeenCalledWith(mockLinks[0]);
  });

  it('should toggle mobile menu', () => {
    expect(component.isMobileMenuOpen()).toBe(false);
    component.toggleMobileMenu();
    expect(component.isMobileMenuOpen()).toBe(true);
    component.toggleMobileMenu();
    expect(component.isMobileMenuOpen()).toBe(false);
  });

  it('should toggle user menu', () => {
    expect(component.isUserMenuOpen()).toBe(false);
    component.toggleUserMenu();
    expect(component.isUserMenuOpen()).toBe(true);
    component.toggleUserMenu();
    expect(component.isUserMenuOpen()).toBe(false);
  });

  it('should display user avatar', () => {
    const compiled = fixture.nativeElement;
    const avatar = compiled.querySelector('.nav-user-avatar');
    expect(avatar).toBeTruthy();
    expect(avatar.src).toContain('avatar.jpg');
  });

  it('should display user initials when no avatar', () => {
    fixture.componentRef.setInput('user', { name: 'John Doe', email: 'john@example.com' });
    fixture.detectChanges();
    expect(component.userInitials()).toBe('JD');
  });

  it('should emit searchQuery after debounce', (done) => {
    spyOn(component.searchQuery, 'emit');
    const mockEvent = {
      target: { value: 'test query' }
    } as any;

    component.onSearchInput(mockEvent);

    setTimeout(() => {
      expect(component.searchQuery.emit).toHaveBeenCalledWith('test query');
      done();
    }, 350);
  });

  it('should clear search', () => {
    spyOn(component.searchQuery, 'emit');
    component['searchQueryValue'].set('test');
    component.clearSearch();
    expect(component.currentSearchQuery()).toBe('');
    expect(component.searchQuery.emit).toHaveBeenCalledWith('');
  });

  it('should emit userMenuAction when action is clicked', () => {
    spyOn(component.userMenuAction, 'emit');
    const mockAction = { id: 'profile', label: 'Profile' };
    component.onUserMenuActionClick(mockAction);
    expect(component.userMenuAction.emit).toHaveBeenCalledWith('profile');
    expect(component.isUserMenuOpen()).toBe(false);
  });

  it('should not emit event for disabled link', () => {
    spyOn(component.linkClick, 'emit');
    const disabledLink: NavLink = { id: '4', label: 'Disabled', disabled: true };
    const mockEvent = new Event('click');
    spyOn(mockEvent, 'preventDefault');

    component.onLinkClick(disabledLink, mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(component.linkClick.emit).not.toHaveBeenCalled();
  });

  it('should apply sticky class when configured', () => {
    fixture.componentRef.setInput('config', { sticky: true });
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const nav = compiled.querySelector('.top-navigation');
    expect(nav.classList.contains('nav-sticky')).toBe(true);
  });

  it('should handle keyboard navigation', () => {
    spyOn(component, 'onLinkClick');
    const mockEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    spyOn(mockEvent, 'preventDefault');

    component.onKeyDown(mockEvent, mockLinks[0]);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(component.onLinkClick).toHaveBeenCalledWith(mockLinks[0], mockEvent);
  });
});
