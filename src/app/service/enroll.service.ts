import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse ,HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Enroll } from '../model/Enroll';

@Injectable({
  providedIn: 'root'
})
export class EnrollService {

  private url = 'http://localhost:8080/api/v1/enrollment';
  
  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    })
  }

  findAll(): Observable<Enroll[]> {
    //return this.http.get<Enroll[]>(this.url);

    return this.http
      .get(this.url)
      .pipe<Enroll[]>(map((data: any) => data));
  }

  find(id: number): Observable<Enroll> {
    return this.http.get<Enroll>(`${this.url}/${id}`);
  }

  create(enroll: Enroll): Observable<Enroll> {
    const copy = this.convert(enroll);
    return this.http.post<Enroll>(this.url, copy);
  }

  update(enroll: Enroll): Observable<Enroll> {
    const copy = this.convert(enroll);
    return this.http.put<Enroll>(`${this.url}/${copy.id}`, copy);
  }

  delete(id: number | undefined): Observable<HttpResponse<Enroll>> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }

  private convert(enroll: Enroll): Enroll {
    const copy: Enroll = Object.assign({}, enroll);
    return copy;
  }
}
