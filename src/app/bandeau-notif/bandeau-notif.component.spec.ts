import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandeauNotifComponent } from './bandeau-notif.component';

describe('BandeauNotifComponent', () => {
  let component: BandeauNotifComponent;
  let fixture: ComponentFixture<BandeauNotifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BandeauNotifComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BandeauNotifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
