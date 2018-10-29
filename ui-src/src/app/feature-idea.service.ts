import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeatureIdeaService {

  constructor(private http: HttpClient) {

  }

  featureIdeaCreate(featureIdea: FeatureIdea) {
    return this.http.post('/fn/featureIdeas/featureIdeaCreate', featureIdea).subscribe((result) => {
    }, error => {
      console.log(error);
    });
  }

  featureIdeaList(): Observable<GetLinksResponse<FeatureIdea>[]> {
    return <Observable<GetLinksResponse<FeatureIdea>[]>> this.http.get('/fn/featureIdeas/featureIdeaList');
  }

  votingCreate(voting: Voting) {
    return this.http.post('/fn/voting/votingCreate', voting).subscribe((result) => {
    }, error => {
      console.log(error);
    });
  }

  votingList(): Observable<GetLinksResponse<Voting>[]> {
    return <Observable<GetLinksResponse<Voting>[]>> this.http.get('/fn/voting/votingList');
  }
}
