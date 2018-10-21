import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './models/post.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]>{
    return this.http.get<Post[]>('https://api.mika.house/posts')
  }

  getPost(postId): Observable<Post>{
    return this.http.get<Post>('https://api.mika.house/post/' + postId)
  }

  createPost(post: Post): Observable<Post>{
    return this.http.post<Post>('https://api.mika.house/post', post);
  }

  deletePost(postId): Observable<any>{
    return this.http.post<any>('https://api.mika.house/post/' + postId, {});
  }
}
