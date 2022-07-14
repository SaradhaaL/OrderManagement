import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserApisService {

  constructor(private http : HttpClient) { }

getOrdersList(): Observable<any> {
  return this.http.get('../assets/data/orders.json')
}
}
