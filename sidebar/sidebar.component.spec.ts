import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent, SidebarItem } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  const mockItems: SidebarItem[] = [
    {
      id: '1',
      label: 'Dashboard',
      href: '/dashboard',
      icon: '📊',
      active: true
    },
    {
      id: '2',
      label: 'Projects',
      href: '/projects',
      icon: '📁',
      badge: '3',
      badgeType: 'primary',
      children: [
        { id: '2-1', label: 'Active', href: '/projects/active' },
        { id: '2-2', label: 'Archived', href: '/projects/archived' }
      ]
    },
    {
      id: '3',
      label: 'Settings',
      href: '/settings',
      icon: '⚙️',
      disabled: true
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', mockItems);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render navigation items', () => {
    const compiled = fixture.nativeElement;
    const items = compiled.querySelectorAll('.sidebar-item');
    expect(items.length).toBeGreaterThanOrEqual(3);
  });

  it('should mark active item', () => {
    const compiled = fixture.nativeElement;
    const activeItem = compiled.querySelector('.sidebar-item-active');
    expect(activeItem).toBeTruthy();
    expect(activeItem.textContent).toContain('Dashboard');
  });

  it('should toggle collapse state', () => {
    expect(component.isCollapsed()).toBe(false);
    component.toggleCollapse();
    expect(component.isCollapsed()).toBe(true);
    component.toggleCollapse();
    expect(component.isCollapsed()).toBe(false);
  });

  it('should emit collapseToggle event', () => {
    spyOn(component.collapseToggle, 'emit');
    component.toggleCollapse();
    expect(component.collapseToggle.emit).toHaveBeenCalledWith(true);
  });

  it('should toggle item expansion', () => {
    const itemWithChildren = mockItems[1];
    expect(component.isItemExpanded(itemWithChildren.id)).toBe(false);

    component.toggleExpand(itemWithChildren, new Event('click'));
    expect(component.isItemExpanded(itemWithChildren.id)).toBe(true);

    component.toggleExpand(itemWithChildren, new Event('click'));
    expect(component.isItemExpanded(itemWithChildren.id)).toBe(false);
  });

  it('should emit itemClick event when item is clicked', () => {
    spyOn(component.itemClick, 'emit');
    component.onItemClick(mockItems[0], new Event('click'));
    expect(component.itemClick.emit).toHaveBeenCalledWith(mockItems[0]);
  });

  it('should not emit event for disabled item', () => {
    spyOn(component.itemClick, 'emit');
    const disabledItem = mockItems[2];
    const mockEvent = new Event('click');
    spyOn(mockEvent, 'preventDefault');

    component.onItemClick(disabledItem, mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(component.itemClick.emit).not.toHaveBeenCalled();
  });

  it('should display item icons', () => {
    const compiled = fixture.nativeElement;
    const icons = compiled.querySelectorAll('.sidebar-item-icon');
    expect(icons.length).toBeGreaterThan(0);
    expect(icons[0].textContent).toContain('📊');
  });

  it('should display badges', () => {
    const compiled = fixture.nativeElement;
    const badges = compiled.querySelectorAll('.sidebar-badge');
    expect(badges.length).toBeGreaterThan(0);
    expect(badges[0].textContent).toContain('3');
  });

  it('should check if item has children', () => {
    expect(component.hasChildren(mockItems[0])).toBe(false);
    expect(component.hasChildren(mockItems[1])).toBe(true);
  });

  it('should get badge class based on type', () => {
    expect(component.getBadgeClass('primary')).toBe('sidebar-badge-primary');
    expect(component.getBadgeClass('success')).toBe('sidebar-badge-success');
    expect(component.getBadgeClass()).toBe('sidebar-badge-primary');
  });

  it('should calculate item level indentation', () => {
    expect(component.getItemLevel(0)).toBe('0px');
    expect(component.getItemLevel(1)).toBe('16px');
    expect(component.getItemLevel(2)).toBe('32px');
  });

  it('should return 0px indentation when collapsed', () => {
    component['collapsed'].set(true);
    expect(component.getItemLevel(1)).toBe('0px');
  });

  it('should handle keyboard navigation - Enter key', () => {
    spyOn(component, 'onItemClick');
    const mockEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    spyOn(mockEvent, 'preventDefault');

    component.onKeyDown(mockEvent, mockItems[0]);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(component.onItemClick).toHaveBeenCalledWith(mockItems[0], mockEvent);
  });

  it('should handle keyboard navigation - ArrowRight expands item', () => {
    const itemWithChildren = mockItems[1];
    const mockEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    spyOn(mockEvent, 'preventDefault');
    spyOn(component, 'toggleExpand');

    component.onKeyDown(mockEvent, itemWithChildren);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(component.toggleExpand).toHaveBeenCalled();
  });

  it('should handle keyboard navigation - ArrowLeft collapses item', () => {
    const itemWithChildren = mockItems[1];
    component['expandedItems'].update(set => {
      set.add(itemWithChildren.id);
      return new Set(set);
    });

    const mockEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    spyOn(mockEvent, 'preventDefault');
    spyOn(component, 'toggleExpand');

    component.onKeyDown(mockEvent, itemWithChildren);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(component.toggleExpand).toHaveBeenCalled();
  });

  it('should apply theme class', () => {
    fixture.componentRef.setInput('config', { theme: 'dark' });
    fixture.detectChanges();
    expect(component.themeClass()).toBe('sidebar-theme-dark');
  });

  it('should calculate sidebar width', () => {
    expect(component.sidebarWidth()).toBe('260px');
    component['collapsed'].set(true);
    expect(component.sidebarWidth()).toBe('60px');
  });

  it('should set active item on click', () => {
    const item = mockItems[1];
    component.onItemClick(item, new Event('click'));
    expect(component.isItemActive(item.id)).toBe(true);
  });
});
