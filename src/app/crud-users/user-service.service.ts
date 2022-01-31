import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private url : string = "https://isaac-spring-admin.herokuapp.com/usuario/";
  constructor( private http:HttpClient) { }

  //Obtener usuarios
  getAllUsers():Observable<User[]>{
    return this.http.get<User[]>(this.url);
  }

  //Crear usuario
  createUser(u:User):Observable<User>{
    return this.http.post<User>(this.url,u);
  }

  //Obtener un usuario
  getUserById(id:number):Observable<User>{
    return this.http.get<User>(this.url+id);
  }

  //Actualizar
  updateUser(u:User):Observable<User>{
    return this.http.put<User>(this.url,u);
  }

  //Eliminar
  deleteUser(id:number):Observable<User>{
    return this.http.delete<User>(this.url+id);
  }

}