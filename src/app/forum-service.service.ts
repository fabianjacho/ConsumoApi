import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { forumPost } from './app.component'; // Import the forumPost interface
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForumServiceService {

//  constructor() { }

private readonly apiUrl = environment.api;  
private http = inject(HttpClient);
private jsonHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });


getForum():Observable<forumPost[]> {
  return this.http.get<forumPost[]>(`${this.apiUrl}`,
     { headers: this.jsonHeaders }).pipe(map((raw) => raw.reverse()));   

}


}
