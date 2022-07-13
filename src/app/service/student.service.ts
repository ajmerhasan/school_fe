import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse ,HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Course, Student } from '../model/enroll.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl = 'http://localhost:8080/api/v1/students';
  
  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    })
  }

  // find(): Observable<any> {
  //   return this.http.get(this.baseUrl);
  // }

  findAll(): Observable<Student[]> {
    return this.http.get<Student[]>(this.baseUrl);

    // return this.http
    //   .get(this.baseUrl)
    //   .pipe<Student[]>(map((data: any) => data));
  }
}
