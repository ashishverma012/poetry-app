import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoetryContentComponent } from './poetry-content.component';

describe('PoetryContentComponent', () => {
  let component: PoetryContentComponent;
  let fixture: ComponentFixture<PoetryContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoetryContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoetryContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
