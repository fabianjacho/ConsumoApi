import { Component, OnInit } from '@angular/core';
import { forumPost } from '../app.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ForumServiceService } from '../forum-service.service';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  //en el constructor solo se inicializan los servicios
  //y se inyectan los servicios que se van a utilizar
  constructor(private forumService: ForumServiceService) { }

  forum: forumPost = {
    userid: 0,
    id: 0,
    title: '',
    body: ''
  };

  forumPosts: forumPost[] = [];

  onSubmit(foro: forumPost) {
   console.log(foro);

   foro.userid = 1; // Asignar un usuario por defecto
   foro.id = this.forumPosts.length + 1; // Asignar un ID

   this.forumService.addForum(foro).subscribe(data => {
     this.forumPosts.unshift(data); // Añadir el nuevo post al inicio del array
     //this.forum = { userid: 0, id: 0, title: '', body: '' }; // Resetear el formulario
     console.log("Post added:", data);
   });
   

  }

  /*
  ngOnInit() {
    this.forumService.getForum().subscribe(data => {
      this.forum = data;
      console.log("Forum loaded:", data);
  });*/

  ngOnInit(): void {
    this.forumService.getForum().subscribe(data => {
      this.forumPosts = data;
      console.log("Forum loaded:", data);
    });
  }

}
