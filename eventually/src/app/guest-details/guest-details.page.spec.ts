import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GuestDetailsPage } from './guest-details.page';

describe('GuestDetailsPage', () => {
  let component: GuestDetailsPage;
  let fixture: ComponentFixture<GuestDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GuestDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
