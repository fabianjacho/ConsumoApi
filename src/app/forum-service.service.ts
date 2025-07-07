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


//en el post y en el put se pone el body y los headers
//el post es para crear un nuevo recurso y el put es para actualizar un recurso existente
addForum(forum: forumPost): Observable<forumPost> {
  return this.http.post<forumPost>(`${this.apiUrl}`, forum, { headers: this.jsonHeaders }); 
}

updateForum(forum: forumPost): Observable<forumPost> {
  return this.http.put<forumPost>(`${this.apiUrl}/${forum.id}`, forum, { headers: this.jsonHeaders });  
}

}
