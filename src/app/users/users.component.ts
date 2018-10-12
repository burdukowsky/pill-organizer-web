import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {faPaperPlane, faPen, faPlus, faTimes, faTrash} from '@fortawesome/free-solid-svg-icons';
import {cloneDeep, trim} from 'lodash';

import {User, createEmptyUser} from './user';
import {UserService} from './user.service';
import {ConfirmModalComponent} from '../shared/confirm-modal/confirm-modal.component';
import {RequestFailedModalComponent} from '../shared/request-failed-modal/request-failed-modal.component';
import {Role, getAllRoles} from './role';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @ViewChild('userModalTemplate')
  private userModalTemplate: TemplateRef<any>;

  users: Array<User> = [];
  roles: Array<Role> = getAllRoles();
  editableUser: User = createEmptyUser();
  loadErrorMessage: boolean;
  confirmDeleteUserModalRef: BsModalRef;
  requestFailedModalRef: BsModalRef;
  userModalRef: BsModalRef;
  faTrash = faTrash;
  faPen = faPen;
  faPlus = faPlus;
  faTimes = faTimes;
  faPaperPlane = faPaperPlane;

  get isAdding(): boolean {
    return this.editableUser.id == null;
  }

  get blackList(): Array<string> {
    const usernames: Array<string> = this.users.map(user => user.username);
    if (!this.isAdding) {
      const oldEditableUserUsername: string = this.users.find(user => user.id === this.editableUser.id).username;
      usernames.splice(usernames.indexOf(oldEditableUserUsername), 1);
    }
    return usernames;
  }

  constructor(private userService: UserService, private modalService: BsModalService) {
  }

  ngOnInit() {
    this.loadErrorMessage = false;

    this.userService.getUsers().subscribe(users => {
      this.users = users;
    }, e => {
      console.error(e);
      this.loadErrorMessage = true;
    });
  }

  confirmDeleteUser(user: User) {
    this.confirmDeleteUserModalRef = this.modalService.show(ConfirmModalComponent, {
      class: 'modal-sm',
      initialState: {
        confirm: () => {
          this.deleteUser(user);
        }
      }
    });
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user.id).subscribe(() => {
      this.users.splice(this.users.indexOf(user), 1);
    }, e => {
      this.requestFailedModalRef = this.modalService.show(RequestFailedModalComponent, {
        initialState: {
          message: 'Ошибка удаления пользователя.'
        }
      });
      console.error(e);
    });
  }

  startEditUser(user: User) {
    this.editableUser = cloneDeep(user);
    this.userModalRef = this.modalService.show(this.userModalTemplate);
  }

  startAddUser() {
    this.editableUser = createEmptyUser();
    this.userModalRef = this.modalService.show(this.userModalTemplate);
  }

  onUserFormSubmit() {
    this.editableUser.username = trim(this.editableUser.username);
    this.editableUser.password = trim(this.editableUser.password);
    if (this.isAdding) {
      this.userService.createUser(this.editableUser).subscribe(createdUser => {
        this.users.push(createdUser);
        this.userModalRef.hide();
        this.resetUserForm();
      }, e => {
        this.requestFailedModalRef = this.modalService.show(RequestFailedModalComponent, {
          initialState: {
            message: 'Ошибка создания пользователя.'
          }
        });
        console.error(e);
      });
    } else {
      if (this.editableUser.password === '') {
        this.editableUser.password = undefined;
      }
      this.userService.updateUser(this.editableUser).subscribe(updatedUser => {
        const indexOfUpdatedUser = this.users.findIndex((user => user.id === updatedUser.id));
        if (indexOfUpdatedUser !== -1) {
          this.users[indexOfUpdatedUser] = updatedUser;
        }
        this.userModalRef.hide();
        this.resetUserForm();
      }, e => {
        this.requestFailedModalRef = this.modalService.show(RequestFailedModalComponent, {
          initialState: {
            message: 'Ошибка обновления полььзователя.'
          }
        });
        console.error(e);
      });
    }
  }

  resetUserForm() {
    this.editableUser = createEmptyUser();
  }

  roleExists(role: Role): boolean {
    const jsonRoles = this.editableUser.roles.map(value => JSON.stringify(value));
    const jsonCheckedRole = JSON.stringify(role);
    return jsonRoles.indexOf(jsonCheckedRole) !== -1;
  }

  onRoleCheck(role: Role): void {
    const jsonRoles = this.editableUser.roles.map(value => JSON.stringify(value));
    const jsonCheckedRole = JSON.stringify(role);
    const index = jsonRoles.indexOf(jsonCheckedRole);
    if (index === -1) {
      this.editableUser.roles.push(role);
    } else {
      this.editableUser.roles.splice(index, 1);
    }
  }

}
