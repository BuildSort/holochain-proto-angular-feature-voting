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

  state: {
    featureIdeas: GetLinksResponse<FeatureIdea>[];
    votes: GetLinksResponse<Voting>[];
    myHash: string;
    votesForFeatureIdeas: {
      [featureIdeaHash: string]: GetLinksResponse<Voting>[]
    };
    myVotes: {
      [voteHash: string]: GetLinksResponse<Voting>[]
    };
    myFeatureIdeas: {
      [featureIdeaHash: string]: GetLinksResponse<FeatureIdea>
    };
    myVotesForFeatureIdeas: {
      [featureIdeaHash: string]: GetLinksResponse<Voting>[]
    };

  } = <any>{};

  constructor(private http: HttpClient) {

    this.rebuildState();
    
    this.http.get('/fn/featureIdeas/myHash').subscribe((result) => {
      this.state.myHash = result+'';
      console.log("Agent Hash: " + this.state.myHash);
    }, error => {
      console.log(error);
    });


    this.featureIdeas = timer(0,5000).pipe(
      merge(this.manualRefresh),
      switchMap(() => this.featureIdeaList()),
      shareReplay()
    );

    this.featureIdeas.subscribe(results => {
      this.state.featureIdeas = results;
      this.rebuildState();
    });

    this.votes = timer(0,5000).pipe(
      merge(this.manualRefresh),
      switchMap(() => this.votingList()),
      shareReplay()
    );

    this.votes.subscribe(results => {
      this.state.votes = results;
      this.rebuildState();
    });

  }

  rebuildState() {
    this.state.votesForFeatureIdeas = {};
    this.state.myFeatureIdeas = {};
    this.state.myVotesForFeatureIdeas = {};

    if (this.state.votes && this.state.featureIdeas && this.state.myHash) {
      
      this.state.featureIdeas.forEach(f => {

        this.state.votesForFeatureIdeas[f.Hash] = [];
        this.state.myVotesForFeatureIdeas[f.Hash] = [];

        if (f.Entry.creator === this.state.myHash) {
          this.state.myFeatureIdeas[f.Hash] = f;
        }

      });

      this.state.votes.forEach(vote => {
        this.state.votesForFeatureIdeas[vote.Entry.feature].push(vote);

        if (vote.Entry.voter === this.state.myHash) {
          this.state.myVotesForFeatureIdeas[vote.Entry.feature].push(vote);
        }

      });
    }
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
