import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api = "http://localhost:4000/users"
  constructor(private http:HttpClient) { }

  getAllUsers(){
    return this.http.get<User[]>(this.api);
  }
  getUserById(userId){
    const path = `${this.api}/${userId}`;
    return this.http.get(path);
  }

  createUser(user:User){
    const path = `${this.api}/create`;
    return this.http.post(path,user);
  }

  updateUser(user,userId){
    const path = `${this.api}/update/${userId}`;
    return this.http.put(path,user);

  }

  validateLogin(datos){
    const  path = `${this.api}/login/login`;
    return this.http.post(path,datos);
  }
  
  deleteUser(){}
}
