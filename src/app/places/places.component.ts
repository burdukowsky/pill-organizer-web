import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {faTrash, faPen, faPlus, faTimes, faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import {clone} from 'lodash';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

import {Place, createEmptyPlace} from '../main/place';
import {PlaceService} from '../main/place.service';
import {ConfirmModalComponent} from '../shared/confirm-modal/confirm-modal.component';
import {RequestFailedModalComponent} from '../shared/request-failed-modal/request-failed-modal.component';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {
  @ViewChild('placeModalTemplate')
  private placeModalTemplate: TemplateRef<any>;

  places: Array<Place> = [];
  placeFilter: Place = createEmptyPlace();
  editablePlace: Place = createEmptyPlace();
  loadErrorMessage: boolean;
  confirmDeletePlaceModalRef: BsModalRef;
  requestFailedModalRef: BsModalRef;
  placeModalRef: BsModalRef;
  faTrash = faTrash;
  faPen = faPen;
  faPlus = faPlus;
  faTimes = faTimes;
  faPaperPlane = faPaperPlane;

  get isAdding(): boolean {
    return this.editablePlace.id == null;
  }

  get showPlaceWithThisNameExistsMessage(): boolean {
    const placeWithEditablePlaceNameExists =
      this.places.some(place => place.name.trim().toLowerCase() === this.editablePlace.name.trim().toLowerCase());
    return this.isAdding && placeWithEditablePlaceNameExists;
  }

  constructor(private placeService: PlaceService, private modalService: BsModalService) {
  }

  ngOnInit() {
    this.loadErrorMessage = false;

    this.placeService.getPlaces().subscribe(places => {
      this.places = places;
    }, e => {
      console.error(e);
      this.loadErrorMessage = true;
    });
  }

  confirmDeletePlace(place: Place) {
    this.confirmDeletePlaceModalRef = this.modalService.show(ConfirmModalComponent, {
      class: 'modal-sm',
      initialState: {
        confirm: () => {
          this.deletePlace(place);
        }
      }
    });
  }

  deletePlace(place: Place) {
    // TODO: implement
  }

  startEditPlace(place: Place) {
    this.editablePlace = clone(place);
    this.placeModalRef = this.modalService.show(this.placeModalTemplate);
  }

  startAddPlace() {
    this.editablePlace = createEmptyPlace();
    this.placeModalRef = this.modalService.show(this.placeModalTemplate);
  }

  onPlaceFormSubmit() {
    if (this.isAdding) {
      this.placeService.createPlace(this.editablePlace).subscribe(createdPlace => {
        this.places.push(createdPlace);
        this.placeModalRef.hide();
        this.resetPlaceForm();
      }, e => {
        this.requestFailedModalRef = this.modalService.show(RequestFailedModalComponent, {
          initialState: {
            message: 'Ошибка создания места.'
          }
        });
        console.error(e);
      });
    } else {
      // TODO: implement
    }
  }

  resetPlaceForm() {
    this.editablePlace = createEmptyPlace();
  }
}
