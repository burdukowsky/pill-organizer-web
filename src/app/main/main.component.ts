import {Component, OnInit, TemplateRef} from '@angular/core';
import {faTrash, faPlus, faTimes, faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import {BsModalRef, BsModalService, TypeaheadMatch} from 'ngx-bootstrap';
import {forkJoin, Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';

import {PillService} from './pill.service';
import {PlaceService} from './place.service';
import {Pill, createEmptyPill} from './pill';
import {Place, createEmptyPlace} from './place';
import {PillPlace, createEmptyPillPlace} from './pill-place';
import {RequestFailedModalComponent} from '../shared/request-failed-modal/request-failed-modal.component';
import {ConfirmModalComponent} from '../shared/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  pills: Array<Pill> = [];
  places: Array<Place> = [];
  pillsPlaces: Array<PillPlace> = [];
  pillPlaceFilter: PillPlace = createEmptyPillPlace();
  loadErrorMessage: boolean;
  faTrash = faTrash;
  faPlus = faPlus;
  faTimes = faTimes;
  faPaperPlane = faPaperPlane;
  confirmDeletePillPlaceModalRef: BsModalRef;
  addPillPlaceModalRef: BsModalRef;
  requestFailedModalRef: BsModalRef;

  newPill: Pill = null;
  newPlace: Place = null;
  newPillInputValue = '';
  newPlaceInputValue = '';

  get needCreateNewPill(): boolean {
    return this.newPill == null || (this.newPill && this.newPillInputValue !== this.newPill.name);
  }

  get needCreateNewPlace(): boolean {
    return this.newPlace == null || (this.newPlace && this.newPlaceInputValue !== this.newPlace.name);
  }

  constructor(private pillService: PillService, private placeService: PlaceService, private modalService: BsModalService) {
  }

  ngOnInit() {
    this.loadErrorMessage = false;

    this.pillService.getPills().subscribe(pills => {
      this.pills = pills;
    }, e => {
      console.error(e);
      this.loadErrorMessage = true;
    });

    this.placeService.getPlaces().subscribe(places => {
      this.places = places;
      for (let i = 0; i < places.length; ++i) {
        const curPlace = places[i];
        for (let j = 0; j < curPlace.pills.length; ++j) {
          const curPill = curPlace.pills[j];
          this.pillsPlaces.push(new PillPlace(curPill, curPlace));
        }
      }
    }, e => {
      console.error(e);
      this.loadErrorMessage = true;
    });
  }

  confirmDeletePillPlace(pillPlace: PillPlace) {
    this.confirmDeletePillPlaceModalRef = this.modalService.show(ConfirmModalComponent, {
      class: 'modal-sm',
      initialState: {
        confirm: () => {
          this.deletePillPlace(pillPlace);
        }
      }
    });
  }

  deletePillPlace(pillPlace: PillPlace) {
    this.placeService.deletePillPlace(pillPlace.place.id, pillPlace.pill.id).subscribe(() => {
      this.pillsPlaces.splice(this.pillsPlaces.indexOf(pillPlace), 1);
    }, e => {
      console.error(e);
      this.requestFailedModalRef = this.modalService.show(RequestFailedModalComponent);
    });
  }

  openAddPillPlaceModal(addPillPlaceModalTemplate: TemplateRef<any>) {
    this.addPillPlaceModalRef = this.modalService.show(addPillPlaceModalTemplate);
  }

  onAddPillPlaceFormSubmit() {
    const requests: Array<Observable<any>> = [];
    let pillForCreatingPillPlace = this.newPill;
    let placeForCreatingPillPlace = this.newPlace;

    if (this.needCreateNewPill) {
      const newPill = createEmptyPill();
      newPill.name = this.newPillInputValue;
      requests.push(this.pillService.createPill(newPill).pipe(tap(createdPill => {
        this.pills.push(createdPill);
        pillForCreatingPillPlace = createdPill;
      }, e => {
        this.requestFailedModalRef = this.modalService.show(RequestFailedModalComponent, {
          initialState: {
            message: 'Ошибка создания лекарства.'
          }
        });
        console.error(e);
      })));
    }

    if (this.needCreateNewPlace) {
      const newPlace = createEmptyPlace();
      newPlace.name = this.newPlaceInputValue;
      requests.push(this.placeService.createPlace(newPlace).pipe(tap(createdPlace => {
        this.places.push(createdPlace);
        placeForCreatingPillPlace = createdPlace;
      }, e => {
        this.requestFailedModalRef = this.modalService.show(RequestFailedModalComponent, {
          initialState: {
            message: 'Ошибка создания места.'
          }
        });
        console.error(e);
      })));
    }

    (requests.length === 0 ? of(requests) : forkJoin(requests)).subscribe(results => {
      const newPillPlace = new PillPlace(pillForCreatingPillPlace, placeForCreatingPillPlace);
      this.placeService.createPillPlace(newPillPlace).subscribe(place => {
        this.pillsPlaces.push(newPillPlace);
        this.addPillPlaceModalRef.hide();
        this.resetAddPillPlaceForm();
      }, e => {
        this.requestFailedModalRef = this.modalService.show(RequestFailedModalComponent, {
          initialState: {
            message: 'Ошибка создания места лекарства.'
          }
        });
        console.error(e);
      });
    });
  }

  onSelectNewPill(event: TypeaheadMatch): void {
    this.newPill = event.item;
  }

  onSelectNewPlace(event: TypeaheadMatch): void {
    this.newPlace = event.item;
  }

  resetAddPillPlaceForm() {
    this.newPill = null;
    this.newPlace = null;
    this.newPillInputValue = '';
    this.newPlaceInputValue = '';
  }

}
