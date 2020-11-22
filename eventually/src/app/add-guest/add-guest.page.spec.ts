import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddGuestPage } from './add-guest.page';

describe('AddGuestPage', () => {
  let component: AddGuestPage;
  let fixture: ComponentFixture<AddGuestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGuestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddGuestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
