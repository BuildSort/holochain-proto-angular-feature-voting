import { TestBed } from '@angular/core/testing';

import { FeatureIdeaService } from './feature-idea.service';

describe('FeatureIdeaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FeatureIdeaService = TestBed.get(FeatureIdeaService);
    expect(service).toBeTruthy();
  });
});
