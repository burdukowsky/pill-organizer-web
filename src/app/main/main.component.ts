import {Component, OnInit} from '@angular/core';
import {faTrash, faPlus} from '@fortawesome/free-solid-svg-icons';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

import {PillService} from './pill.service';
import {PlaceService} from './place.service';
import {Pill} from './pill';
import {Place} from './place';
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
  bsModalRef: BsModalRef;

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
    this.bsModalRef = this.modalService.show(ConfirmModalComponent, {
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
      this.bsModalRef = this.modalService.show(RequestFailedModalComponent);
    });
  }

}
