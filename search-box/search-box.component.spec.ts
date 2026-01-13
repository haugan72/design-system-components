import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SearchBoxComponent } from './search-box.component';

describe('SearchBoxComponent', () => {
  let component: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBoxComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render search icon', () => {
    const icon = fixture.nativeElement.querySelector('.search-icon');
    expect(icon).toBeTruthy();
    expect(icon.textContent.trim()).toBe('🔍');
  });

  it('should bind value with two-way binding', () => {
    expect(component.value()).toBe('');
    component.value.set('test search');
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('.search-input') as HTMLInputElement;
    expect(input.value).toBe('test search');
  });

  it('should emit debounced search after delay', fakeAsync(() => {
    spyOn(component.search, 'emit');
    const input = fixture.nativeElement.querySelector('.search-input') as HTMLInputElement;

    input.value = 'test query';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.search.emit).not.toHaveBeenCalled();

    tick(300); // Default debounce time

    expect(component.search.emit).toHaveBeenCalledWith('test query');
  }));

  it('should respect custom debounce time', fakeAsync(() => {
    fixture.componentRef.setInput('debounceTime', 500);
    fixture.detectChanges();

    spyOn(component.search, 'emit');
    const input = fixture.nativeElement.querySelector('.search-input') as HTMLInputElement;

    input.value = 'test';
    input.dispatchEvent(new Event('input'));

    tick(300);
    expect(component.search.emit).not.toHaveBeenCalled();

    tick(200);
    expect(component.search.emit).toHaveBeenCalledWith('test');
  }));

  it('should respect minimum length before searching', fakeAsync(() => {
    fixture.componentRef.setInput('minLength', 3);
    fixture.detectChanges();

    spyOn(component.search, 'emit');
    const input = fixture.nativeElement.querySelector('.search-input') as HTMLInputElement;

    input.value = 'ab';
    input.dispatchEvent(new Event('input'));
    tick(300);

    expect(component.search.emit).not.toHaveBeenCalled();

    input.value = 'abc';
    input.dispatchEvent(new Event('input'));
    tick(300);

    expect(component.search.emit).toHaveBeenCalledWith('abc');
  }));

  it('should show clear button when has value', () => {
    component.value.set('test');
    fixture.detectChanges();

    const clearBtn = fixture.nativeElement.querySelector('.search-clear-btn');
    expect(clearBtn).toBeTruthy();
  });

  it('should hide clear button when value is empty', () => {
    fixture.detectChanges();
    const clearBtn = fixture.nativeElement.querySelector('.search-clear-btn');
    expect(clearBtn).toBeFalsy();
  });

  it('should clear value when clear button clicked', fakeAsync(() => {
    spyOn(component.cleared, 'emit');
    spyOn(component.search, 'emit');

    component.value.set('test value');
    fixture.detectChanges();

    const clearBtn = fixture.nativeElement.querySelector('.search-clear-btn');
    clearBtn.click();
    fixture.detectChanges();

    expect(component.value()).toBe('');
    expect(component.cleared.emit).toHaveBeenCalled();

    tick(300);
    expect(component.search.emit).toHaveBeenCalledWith('');
  }));

  it('should clear on Escape key', () => {
    component.value.set('test');
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('.search-input');
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    input.dispatchEvent(event);

    expect(component.value()).toBe('');
  });

  it('should set placeholder', () => {
    fixture.componentRef.setInput('placeholder', 'Search products...');
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('.search-input') as HTMLInputElement;
    expect(input.placeholder).toBe('Search products...');
  });

  it('should disable input when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('.search-input') as HTMLInputElement;
    expect(input.disabled).toBe(true);

    const container = fixture.nativeElement.querySelector('.search-box-container');
    expect(container.classList.contains('search-box-disabled')).toBe(true);
  });

  it('should emit focused event on focus', () => {
    spyOn(component.focused, 'emit');
    const input = fixture.nativeElement.querySelector('.search-input');

    input.dispatchEvent(new FocusEvent('focus'));

    expect(component.focused.emit).toHaveBeenCalled();
  });

  it('should emit blurred event on blur', () => {
    spyOn(component.blurred, 'emit');
    const input = fixture.nativeElement.querySelector('.search-input');

    input.dispatchEvent(new FocusEvent('blur'));

    expect(component.blurred.emit).toHaveBeenCalled();
  });

  it('should apply focused class when focused', () => {
    const input = fixture.nativeElement.querySelector('.search-input');
    input.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('.search-box-container');
    expect(container.classList.contains('search-box-focused')).toBe(true);
  });

  it('should hide clear button when showClearButton is false', () => {
    fixture.componentRef.setInput('showClearButton', false);
    component.value.set('test');
    fixture.detectChanges();

    const clearBtn = fixture.nativeElement.querySelector('.search-clear-btn');
    expect(clearBtn).toBeFalsy();
  });

  it('should generate unique id by default', () => {
    const id1 = component.id();
    const fixture2 = TestBed.createComponent(SearchBoxComponent);
    const component2 = fixture2.componentInstance;
    const id2 = component2.id();

    expect(id1).toBeTruthy();
    expect(id2).toBeTruthy();
    expect(id1).not.toBe(id2);
  });

  it('should emit empty search immediately when cleared', fakeAsync(() => {
    spyOn(component.search, 'emit');

    component.value.set('test');
    tick(300);

    (component.search.emit as jasmine.Spy).calls.reset();

    component.value.set('');
    fixture.detectChanges();

    // Should emit immediately without debounce
    expect(component.search.emit).toHaveBeenCalledWith('');
  }));
});
