import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FirstBookPage } from './first-book.page';

describe('FirstBookPage', () => {
  let component: FirstBookPage;
  let fixture: ComponentFixture<FirstBookPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstBookPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FirstBookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
