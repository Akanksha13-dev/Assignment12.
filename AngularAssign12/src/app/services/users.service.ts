import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3000/usersses';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
   getUsers():Observable<any> {
    return this.http.get(baseUrl);
    
}
getUser(id:string):Observable<any> {
  return this.http.get(`${baseUrl}/${id}`);
  
}

 deleteUser(id: string):Observable<any> {
  return this.http.delete(`${baseUrl}/${id}`);
   
}
 editUser(id: string, data: any):Observable<any> {
  const date=new Date(data.datetime);
  //console.log(date);
  const updateData={
      
    firstName: data.firstName,
    middleName:data.middleName,
    lastName: data.lastName,
    email: data.email,
    phoneNumber: data.phoneNumber,
    role:parseInt(data.role),
    address: data.address,
    datetime:date.toISOString(),//data.datetime,
    customersId:parseInt(data.customersId)

  }
   console.log('hey',updateData);
  return this.http.put(`${baseUrl}/${id}`, updateData);

    
}
 addUser(data:any):Observable<any> {
  const date=new Date(data.datetime);
 //console.log(date);
  const object={
      
    firstName: data.firstName,
    middleName:data.middleName,
    lastName: data.lastName,
    email: data.email,
    phoneNumber: data.phoneNumber,
    role:parseInt(data.role),
    address: data.address,
    datetime:date.toISOString(),
    customersId:parseInt(data.customersId)

  }

  return this.http.post(baseUrl, object);
}
}
  // getAll(): Observable<any> {
  //   return this.http.get(baseUrl);
  // }

  // get(id): Observable<any> {
  //   return this.http.get(`${baseUrl}/${id}`);
  // }

  // create(data): Observable<any> {
  //   return this.http.post(baseUrl, data);
  // }

  // update(id, data): Observable<any> {
  //   return this.http.put(`${baseUrl}/${id}`, data);
  // }

  // delete(id): Observable<any> {
  //   return this.http.delete(`${baseUrl}/${id}`);
  // }

