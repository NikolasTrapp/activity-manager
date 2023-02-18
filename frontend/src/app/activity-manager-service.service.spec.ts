import { TestBed } from '@angular/core/testing';

import { ActivityManagerServiceService } from './activity-manager-service.service';

describe('ActivityManagerServiceService', () => {
  let service: ActivityManagerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivityManagerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
