import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse ,HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private url = 'http://localhost:8080/api/v1/courses';
  
  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    })
  }

  find(): Observable<any> {
    return this.http.get(this.url);
  }
}
