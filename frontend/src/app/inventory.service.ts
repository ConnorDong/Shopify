import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { inventory } from './models/inventory.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  readonly ROOT_URL;
  constructor(private http: HttpClient) { 
    this.ROOT_URL = 'http://127.0.0.1:5000'
  }
  get_inventory(uri: string) {
    return this.http.get<inventory[]>(`${this.ROOT_URL}/${uri}`);
  }
  add_inventory(uri:string, payload: inventory) {
    return this.http.post<inventory>(`${this.ROOT_URL}/${uri}`, payload)
  }
  delete_inventory(uri:string, id:number) {
    return this.http.delete<string>(`${this.ROOT_URL}/${uri}/${id}`)
  }
  edit_inventory(uri:string, id:number, payload: inventory) {
    return this.http.put<inventory>(`${this.ROOT_URL}/${uri}/${id}`, payload)
  }
  get_csv(){
    return this.http.get(`${this.ROOT_URL}/inventory/csv`, {
      responseType: 'arraybuffer'});
  }
}
