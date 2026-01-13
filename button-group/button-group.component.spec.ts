import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonGroupComponent } from './button-group.component';

describe('ButtonGroupComponent', () => {
  let component: ButtonGroupComponent;
  let fixture: ComponentFixture<ButtonGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonGroupComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render with default orientation (horizontal)', () => {
    const compiled = fixture.nativeElement;
    const container = compiled.querySelector('.btn-group');
    expect(container.classList.contains('btn-group-horizontal')).toBe(true);
  });

  it('should apply vertical orientation', () => {
    fixture.componentRef.setInput('orientation', 'vertical');
    fixture.detectChanges();
    const container = fixture.nativeElement.querySelector('.btn-group');
    expect(container.classList.contains('btn-group-vertical')).toBe(true);
  });

  it('should apply custom gap', () => {
    fixture.componentRef.setInput('gap', 16);
    fixture.detectChanges();
    const container = fixture.nativeElement.querySelector('.btn-group');
    const styles = container.getAttribute('style');
    expect(styles).toContain('gap: 16px');
  });

  it('should apply default gap (8px)', () => {
    const container = fixture.nativeElement.querySelector('.btn-group');
    const styles = container.getAttribute('style');
    expect(styles).toContain('gap: 8px');
  });

  it('should show divided class when divided is true', () => {
    fixture.componentRef.setInput('divided', true);
    fixture.detectChanges();
    const container = fixture.nativeElement.querySelector('.btn-group');
    expect(container.classList.contains('btn-group-divided')).toBe(true);
  });

  it('should show full-width class when fullWidth is true', () => {
    fixture.componentRef.setInput('fullWidth', true);
    fixture.detectChanges();
    const container = fixture.nativeElement.querySelector('.btn-group');
    expect(container.classList.contains('btn-group-full-width')).toBe(true);
  });

  it('should show attached class when attached is true', () => {
    fixture.componentRef.setInput('attached', true);
    fixture.detectChanges();
    const container = fixture.nativeElement.querySelector('.btn-group');
    expect(container.classList.contains('btn-group-attached')).toBe(true);
  });

  it('should not apply gap when attached is true', () => {
    fixture.componentRef.setInput('attached', true);
    fixture.detectChanges();
    const styles = component.containerStyles();
    expect(Object.keys(styles).length).toBe(0);
  });

  it('should apply responsive wrap class', () => {
    fixture.componentRef.setInput('responsive', 'wrap');
    fixture.detectChanges();
    const container = fixture.nativeElement.querySelector('.btn-group');
    expect(container.classList.contains('btn-group-responsive-wrap')).toBe(true);
  });

  it('should apply responsive scroll class', () => {
    fixture.componentRef.setInput('responsive', 'scroll');
    fixture.detectChanges();
    const container = fixture.nativeElement.querySelector('.btn-group');
    expect(container.classList.contains('btn-group-responsive-scroll')).toBe(true);
  });

  it('should apply responsive stack class', () => {
    fixture.componentRef.setInput('responsive', 'stack');
    fixture.detectChanges();
    const container = fixture.nativeElement.querySelector('.btn-group');
    expect(container.classList.contains('btn-group-responsive-stack')).toBe(true);
  });

  it('should have role="group" attribute', () => {
    const container = fixture.nativeElement.querySelector('.btn-group');
    expect(container.getAttribute('role')).toBe('group');
  });

  it('should have aria-orientation attribute', () => {
    const container = fixture.nativeElement.querySelector('.btn-group');
    expect(container.getAttribute('aria-orientation')).toBe('horizontal');
  });

  it('should update aria-orientation when orientation changes', () => {
    fixture.componentRef.setInput('orientation', 'vertical');
    fixture.detectChanges();
    const container = fixture.nativeElement.querySelector('.btn-group');
    expect(container.getAttribute('aria-orientation')).toBe('vertical');
  });

  it('should compute container classes correctly', () => {
    fixture.componentRef.setInput('orientation', 'vertical');
    fixture.componentRef.setInput('divided', true);
    fixture.componentRef.setInput('fullWidth', true);
    fixture.componentRef.setInput('responsive', 'stack');
    fixture.detectChanges();

    const classes = component.containerClasses();
    expect(classes).toContain('btn-group');
    expect(classes).toContain('btn-group-vertical');
    expect(classes).toContain('btn-group-divided');
    expect(classes).toContain('btn-group-full-width');
    expect(classes).toContain('btn-group-responsive-stack');
  });

  it('should render ng-content for button projection', () => {
    const container = fixture.nativeElement.querySelector('.btn-group');
    expect(container).toBeTruthy();
  });

  it('should apply all classes when fully configured', () => {
    fixture.componentRef.setInput('orientation', 'horizontal');
    fixture.componentRef.setInput('divided', true);
    fixture.componentRef.setInput('fullWidth', true);
    fixture.componentRef.setInput('attached', true);
    fixture.componentRef.setInput('responsive', 'scroll');
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('.btn-group');
    expect(container.classList.contains('btn-group')).toBe(true);
    expect(container.classList.contains('btn-group-horizontal')).toBe(true);
    expect(container.classList.contains('btn-group-divided')).toBe(true);
    expect(container.classList.contains('btn-group-full-width')).toBe(true);
    expect(container.classList.contains('btn-group-attached')).toBe(true);
    expect(container.classList.contains('btn-group-responsive-scroll')).toBe(true);
  });
});
