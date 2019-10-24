import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DatenService {
  private url = '../assets/artikel.json';

  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get<any[]>(this.url);
  }
}
