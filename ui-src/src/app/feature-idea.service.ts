import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, timer, Subject } from 'rxjs';
import { switchMap, shareReplay, merge } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeatureIdeaService {

  public featureIdeas: Observable<GetLinksResponse<FeatureIdea>[]>;
  public votes: Observable<GetLinksResponse<Voting>[]>;
  manualRefresh = new Subject();

  constructor(private http: HttpClient) {
    
    this.featureIdeas = timer(0,5000).pipe(
      merge(this.manualRefresh),
      switchMap(() => this.featureIdeaList()),
      shareReplay()
    );

    this.featureIdeas.subscribe(); // keep it alive

    this.votes = timer(0,5000).pipe(
      merge(this.manualRefresh),
      switchMap(() => this.votingList()),
      shareReplay()
    );

    this.votes.subscribe(); // keep it alive


  }

  refresh() {
    setTimeout(() => this.manualRefresh.next(), 100);
  }

  featureIdeaCreate(featureIdea: FeatureIdea) {
    return this.http.post('/fn/featureIdeas/featureIdeaCreate', featureIdea).subscribe((result) => {
      this.refresh();
    }, error => {
      console.log(error);
    });
  }

  featureIdeaList(): Observable<GetLinksResponse<FeatureIdea>[]> {
    return <Observable<GetLinksResponse<FeatureIdea>[]>> this.http.get('/fn/featureIdeas/featureIdeaList');
  }

  votingCreate(voting: Voting) {
    return this.http.post('/fn/voting/votingCreate', voting).subscribe((result) => {
      this.refresh();
    }, error => {
      console.log(error);
    });
  }

  votingList(): Observable<GetLinksResponse<Voting>[]> {
    return <Observable<GetLinksResponse<Voting>[]>> this.http.get('/fn/voting/votingList');
  }
}
