import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MurComponent } from './mur.component';

describe('MurComponent', () => {
  let component: MurComponent;
  let fixture: ComponentFixture<MurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
