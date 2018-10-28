import { Component, OnInit, OnDestroy } from '@angular/core';
import { FeatureIdeaService } from './feature-idea.service';
import { Observable, interval } from 'rxjs';
import { switchMap, map, retry } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  featureIdeas: Observable<GetLinksResponse<FeatureIdea>>;

  featureIdeaTrackBy(index: number, item: GetLinksResponse<FeatureIdea>) {
    return item.Hash;
  }

  constructor(private featureIdeaService: FeatureIdeaService) {

  }

  ngOnInit() {
    this.featureIdeas = interval(500).pipe(
      retry(10),
      switchMap(() => this.featureIdeaService.featureIdeaList())
    );
  }

  refreshData() {

  }

  createFeatureIdea(featureName: string) {
    const featureIdea: FeatureIdea = {
      title: featureName,
      description: 'TODO'
    };

    this.featureIdeaService.featureIdeaCreate(featureIdea);
  }

  ngOnDestroy() {
  }
}
