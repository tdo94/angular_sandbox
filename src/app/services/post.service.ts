import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/Post';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postUrl: string = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postUrl);
  }

  savePost(title: string, body:string): Observable<Post> {
    let post = {
      title,
      body
    }
    return this.http.post<Post>(this.postUrl, post, httpOptions);
  }

  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.postUrl}/${post.id}`, post, httpOptions);
  }

  removePost(post: Post | number): Observable<Post> {
    const id = typeof post === 'number' ? post : post.id;
    return this.http.delete<Post>(`${this.postUrl}/${id}`)
  }

  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.postUrl}/${id}`);
  }
}
