import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { FeatureIdeaService } from './feature-idea.service';
import { Observable, timer, Subject } from 'rxjs';
import { switchMap, map, shareReplay, merge } from 'rxjs/operators';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('featureIdeaModalTemplate') featureIdeaModalTemplate: TemplateRef<any>;
  //@ViewChild('featureIdeaModalNameField') 
  modalRef: BsModalRef;
  featureIdeas: Observable<GetLinksResponse<FeatureIdea>[]>;
  featureIdeasFiltered: Observable<GetLinksResponse<FeatureIdea>[]>[] = [];
  columns: FeatureIdeaColumn[] = ['Feature Ideas', 'Under Consideration', 'Scoping', 'In Development', 'Completed'];
  manualRefresh = new Subject();
  modalFeatureIdea: FeatureIdea;
  
  featureIdeaTrackBy(index: number, item: GetLinksResponse<FeatureIdea>) {
    return item.Hash;
  }

  constructor(private featureIdeaService: FeatureIdeaService, private modalService: BsModalService) {

  }

  ngOnInit() {
    this.featureIdeas = timer(0,5000).pipe(
      merge(this.manualRefresh),
      switchMap(() => this.featureIdeaService.featureIdeaList()),
      shareReplay()
    );

    // TODO: Seems like there should be a better way to assign them to columns rather than filter the same list over and over?
    this.columns.forEach((column) => {
      this.featureIdeasFiltered[column] = this.featureIdeas.pipe(
        map(results => results.filter(result => result.Entry.column === column))
      )
    });
  }

  openFeatureIdeaModal(featureIdea?: FeatureIdea) {
    this.modalFeatureIdea = featureIdea || <any> {};
    this.modalRef = this.modalService.show(this.featureIdeaModalTemplate);
  }

  createFeatureIdeaModal() {
    this.featureIdeaService.featureIdeaCreate(this.modalFeatureIdea);
    this.manualRefresh.next();
    this.modalRef.hide();
  }

  ngOnDestroy() {
  }
}
