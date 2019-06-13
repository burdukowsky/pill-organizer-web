import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {faTrash, faPen, faPlus, faTimes, faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import {clone, trim} from 'lodash';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

import {Place, createEmptyPlace} from '../main/place';
import {PlaceService} from '../main/place.service';
import {ConfirmModalComponent} from '../shared/confirm-modal/confirm-modal.component';
import {RequestFailedModalComponent} from '../shared/request-failed-modal/request-failed-modal.component';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {
  @ViewChild('placeModalTemplate', {static: false})
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

  canEdit = this.authService.hasAnyRole(['EDITOR', 'ADMIN']);

  get isAdding(): boolean {
    return this.editablePlace.id == null;
  }

  get showPlaceWithThisNameExistsMessage(): boolean {
    const placeWithEditablePlaceNameExists =
      this.places.some(place => place.name.trim().toLowerCase() === this.editablePlace.name.trim().toLowerCase());
    return this.isAdding && placeWithEditablePlaceNameExists;
  }

  constructor(private placeService: PlaceService, private modalService: BsModalService, private authService: AuthService) {
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
    this.placeService.deletePlace(place.id).subscribe(() => {
      this.places.splice(this.places.indexOf(place), 1);
    }, e => {
      this.requestFailedModalRef = this.modalService.show(RequestFailedModalComponent, {
        initialState: {
          message: 'Ошибка удаления места.'
        }
      });
      console.error(e);
    });
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
    this.editablePlace.name = trim(this.editablePlace.name);
    this.editablePlace.description = trim(this.editablePlace.description);
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
      this.placeService.updatePlace(this.editablePlace).subscribe(updatedPlace => {
        const indexOfUpdatedPlace = this.places.findIndex((place => place.id === updatedPlace.id));
        if (indexOfUpdatedPlace !== -1) {
          this.places[indexOfUpdatedPlace] = updatedPlace;
        }
        this.placeModalRef.hide();
        this.resetPlaceForm();
      }, e => {
        this.requestFailedModalRef = this.modalService.show(RequestFailedModalComponent, {
          initialState: {
            message: 'Ошибка обновления места.'
          }
        });
        console.error(e);
      });
    }
  }

  resetPlaceForm() {
    this.editablePlace = createEmptyPlace();
  }
}
