import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentesClientComponent } from './ventes-client.component';

describe('VentesClientComponent', () => {
  let component: VentesClientComponent;
  let fixture: ComponentFixture<VentesClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentesClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentesClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
