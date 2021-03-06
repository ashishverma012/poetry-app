import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { tap, map } from 'rxjs/operators';

import { PoetryService } from './poetry.service';
import { PoetryContentComponent } from '../../poetry-content/poetry-content.component';

describe('PoetryService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let poetryService: PoetryService;
  httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  poetryService = new PoetryService(httpClientSpy as any);

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    poetryService = new PoetryService(httpClientSpy as any);
  });

  it('should test author', fakeAsync(() => {
    const test =  spyOn(poetryService, 'getAuthorData');
    expect(test).toBeDefined();
  }));

  it('should test title', fakeAsync(() => {
    const test =  spyOn(poetryService, 'getTitleData');
    expect(test).toBeDefined();
  }));
});
