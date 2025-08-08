import { Component, input, output } from '@angular/core';
import { User } from '../interfaces/user';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [NgClass],
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss',
})
export class UsersList {
  users = input<User[]>();
  onSelectUser = output<number>();
  selectedUser!: number;
  selectCurrentUser(userId: number) {
    this.selectedUser = userId;
    this.onSelectUser.emit(userId);
  }
}
