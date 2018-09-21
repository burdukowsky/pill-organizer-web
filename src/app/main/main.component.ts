import {Component, OnInit} from '@angular/core';

import {PillService} from './pill.service';
import {PlaceService} from './place.service';
import {Pill} from './pill';
import {Place} from './place';
import {PillPlace, createEmptyPillPlace} from './pill-place';

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

  constructor(private pillService: PillService, private placeService: PlaceService) {
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

}
