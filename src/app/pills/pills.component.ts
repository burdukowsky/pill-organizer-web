import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {faTrash, faPen, faPlus, faTimes, faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {clone} from 'lodash';

import {Pill, createEmptyPill} from '../main/pill';
import {PillService} from '../main/pill.service';
import {ConfirmModalComponent} from '../shared/confirm-modal/confirm-modal.component';
import {RequestFailedModalComponent} from '../shared/request-failed-modal/request-failed-modal.component';

@Component({
  selector: 'app-pills',
  templateUrl: './pills.component.html',
  styleUrls: ['./pills.component.scss']
})
export class PillsComponent implements OnInit {
  @ViewChild('pillModalTemplate')
  private pillModalTemplate: TemplateRef<any>;

  pills: Array<Pill> = [];
  pillFilter: Pill = createEmptyPill();
  editablePill: Pill = createEmptyPill();
  loadErrorMessage: boolean;
  confirmDeletePillModalRef: BsModalRef;
  requestFailedModalRef: BsModalRef;
  pillModalRef: BsModalRef;
  faTrash = faTrash;
  faPen = faPen;
  faPlus = faPlus;
  faTimes = faTimes;
  faPaperPlane = faPaperPlane;

  get isAdding(): boolean {
    return this.editablePill.id == null;
  }

  get showPillWithThisNameExistsMessage(): boolean {
    const pillWithEditablePillNameExists =
      this.pills.some(pill => pill.name.trim().toLowerCase() === this.editablePill.name.trim().toLowerCase());
    return this.isAdding && pillWithEditablePillNameExists;
  }

  constructor(private pillService: PillService, private modalService: BsModalService) {
  }

  ngOnInit() {
    this.loadErrorMessage = false;

    this.pillService.getPills().subscribe(pills => {
      this.pills = pills;
    }, e => {
      console.error(e);
      this.loadErrorMessage = true;
    });
  }

  confirmDeletePill(pill: Pill) {
    this.confirmDeletePillModalRef = this.modalService.show(ConfirmModalComponent, {
      class: 'modal-sm',
      initialState: {
        confirm: () => {
          this.deletePill(pill);
        }
      }
    });
  }

  deletePill(pill: Pill) {
    this.pillService.deletePill(pill.id).subscribe(() => {
      this.pills.splice(this.pills.indexOf(pill), 1);
    }, e => {
      this.requestFailedModalRef = this.modalService.show(RequestFailedModalComponent, {
        initialState: {
          message: 'Ошибка удаления лекарства.'
        }
      });
      console.error(e);
    });
  }

  startEditPill(pill: Pill) {
    this.editablePill = clone(pill);
    this.pillModalRef = this.modalService.show(this.pillModalTemplate);
  }

  startAddPill() {
    this.editablePill = createEmptyPill();
    this.pillModalRef = this.modalService.show(this.pillModalTemplate);
  }

  onPillFormSubmit() {
    if (this.isAdding) {
      this.pillService.createPill(this.editablePill).subscribe(createdPill => {
        this.pills.push(createdPill);
        this.pillModalRef.hide();
        this.resetPillForm();
      }, e => {
        this.requestFailedModalRef = this.modalService.show(RequestFailedModalComponent, {
          initialState: {
            message: 'Ошибка создания лекарства.'
          }
        });
        console.error(e);
      });
    } else {
      this.pillService.updatePill(this.editablePill).subscribe(updatedPill => {
        const indexOfUpdatedPill = this.pills.findIndex((pill => pill.id === updatedPill.id));
        if (indexOfUpdatedPill !== -1) {
          this.pills[indexOfUpdatedPill] = updatedPill;
        }
        this.pillModalRef.hide();
        this.resetPillForm();
      }, e => {
        this.requestFailedModalRef = this.modalService.show(RequestFailedModalComponent, {
          initialState: {
            message: 'Ошибка обновления лекарства.'
          }
        });
        console.error(e);
      });
    }
  }

  resetPillForm() {
    this.editablePill = createEmptyPill();
  }

}
