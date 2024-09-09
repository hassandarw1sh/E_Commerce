import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlsitComponent } from './wishlsit.component';

describe('WishlsitComponent', () => {
  let component: WishlsitComponent;
  let fixture: ComponentFixture<WishlsitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WishlsitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WishlsitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
