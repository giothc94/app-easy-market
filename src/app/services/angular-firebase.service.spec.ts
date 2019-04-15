import { TestBed } from '@angular/core/testing';

import { AngularFirebaseServiceService } from './angular-firebase.service';

describe('AngularFirebaseServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AngularFirebaseServiceService = TestBed.get(AngularFirebaseServiceService);
    expect(service).toBeTruthy();
  });
});
