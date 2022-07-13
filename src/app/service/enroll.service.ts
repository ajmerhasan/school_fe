import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse ,HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Enroll } from '../model/enroll.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollService {

  private baseUrl = 'http://localhost:8080/api/v1/enrollment';
  
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
      .get(this.baseUrl)
      .pipe<Enroll[]>(map((data: any) => data));
  }

  find(id: number): Observable<Enroll> {
    return this.http.get<Enroll>(`${this.baseUrl}/${id}`);
  }

  create(payload: any) {
    this.httpOptions = {
      headers: new HttpHeaders({
        // 'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // 'Access-Control-Allow-Credentials': 'true',
        ////'Authorization': 'Bearer ahWYmFWT8pCqbfqx6FA9cBrQoFNf8w'
      })
    }  

    console.log("payload ", payload);

    const data = {
      "yearTaken": payload.yearTaken,
      "score": payload.score
    }

    var raw = JSON.stringify(data);

    console.log("data ", data);

    console.log(this.baseUrl + '/student/' + payload.student_id + '/course/' + payload.course_id);
    
    // return this.http.post<any>(this.baseUrl + '/student/' + payload.student_id + '/course/' + payload.course_id, raw, this.httpOptions);

    return this.http.post<any>(this.baseUrl + '/student/' + payload.student_id + '/course/' + payload.course_id, raw, this.httpOptions)
                    .subscribe((res) => { console.log('response ', res)});
  }

  update(id: number, payload: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: number | undefined): Observable<HttpResponse<Enroll>> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  
}
