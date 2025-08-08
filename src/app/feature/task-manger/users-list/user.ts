import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[] = [
    { id: 1, name: 'John Doe', createdAt: new Date(), updatedAt: new Date() },
    { id: 2, name: 'Jane Doe', createdAt: new Date(), updatedAt: new Date() },
    { id: 3, name: 'John Smith', createdAt: new Date(), updatedAt: new Date() },
    { id: 4, name: 'Jane Smith', createdAt: new Date(), updatedAt: new Date() },
    { id: 5, name: 'Jane Smith', createdAt: new Date(), updatedAt: new Date() },
    { id: 6, name: 'Jane Smith', createdAt: new Date(), updatedAt: new Date() },
    { id: 7, name: 'Jane Smith', createdAt: new Date(), updatedAt: new Date() },
  ];
  getUsers(): Observable<User[]> {
    return of(this.users);
  }
}
