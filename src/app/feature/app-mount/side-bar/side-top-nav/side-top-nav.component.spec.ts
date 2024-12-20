import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideTopNavComponent } from './side-top-nav.component';

describe('SideTopNavComponent', () => {
  let component: SideTopNavComponent;
  let fixture: ComponentFixture<SideTopNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideTopNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideTopNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
