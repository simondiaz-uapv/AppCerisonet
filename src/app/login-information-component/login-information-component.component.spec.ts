import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginInformationComponentComponent } from './login-information-component.component';

describe('LoginInformationComponentComponent', () => {
  let component: LoginInformationComponentComponent;
  let fixture: ComponentFixture<LoginInformationComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginInformationComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginInformationComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
