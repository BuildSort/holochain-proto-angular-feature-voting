import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, ElementRef, ContentChild } from '@angular/core';
import { FeatureIdeaService } from './feature-idea.service';
import { Observable, timer, Subject, onErrorResumeNext } from 'rxjs';
import { switchMap, map, shareReplay, merge, throttleTime, delay, tap } from 'rxjs/operators';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('featureIdeaModalTemplate') featureIdeaModalTemplate: TemplateRef<any>;
  modalRef: BsModalRef;
  featureIdeasFiltered: Observable<GetLinksResponse<FeatureIdea>[]>[] = [];
  columns: FeatureIdeaColumn[] = ['Feature Ideas', 'Under Consideration', 'Scoping', 'In Development', 'Completed'];
  modalFeatureIdea: FeatureIdea;
  voteClick = new Subject<MouseEvent>();
  modalFeatureIdeaEntry: GetLinksResponse<FeatureIdea>;
  
  featureIdeaTrackBy(index: number, item: GetLinksResponse<FeatureIdea>) {
    return item.Hash;
  }

  constructor(private featureIdeaService: FeatureIdeaService, private modalService: BsModalService) {
    this.voteClick.asObservable().pipe(
      throttleTime(1000),
      tap((e) => {
        const icon = (<HTMLElement>(<HTMLElement>e.target).querySelector('.vote-button-icon'));
        if (icon) {
          icon.classList.add('bounce');
          setTimeout(() => icon.classList.remove('bounce'), 1000);
        }
      })
    ).subscribe(() => {
      this.featureIdeaService.votingCreate({feature: this.modalFeatureIdeaEntry.Hash});
    });
  }

  ngOnInit() {
    // TODO: Seems like there should be a better way to assign them to columns rather than filter the same list over and over?
    this.columns.forEach((column) => {
      this.featureIdeasFiltered[column] = this.featureIdeaService.featureIdeas.pipe(
        map(results => results.filter(result => result.Entry.column === column))
      )
    });
  }

  openFeatureIdeaModal(featureIdea?: GetLinksResponse<FeatureIdea>) {
    this.modalFeatureIdeaEntry = featureIdea || <any> {};
    this.modalFeatureIdea = (featureIdea && featureIdea.Entry) || <any> {};
    this.modalRef = this.modalService.show(this.featureIdeaModalTemplate);
  }

  createFeatureIdeaModal() {
    this.featureIdeaService.featureIdeaCreate(this.modalFeatureIdea);
    this.modalRef.hide();
  }

  ngOnDestroy() {
  }
}
