import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './models/post.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  postCount = 3;

  constructor(
    private http: HttpClient
  ) { };

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('https://api.mika.house/posts');
  }

  getPost(slug: String): Observable<Post> {
    return this.http.get<Post>(`https://api.mika.house/post/${slug}`);
  }

  getLatestPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`https://api.mika.house/latest/${this.postCount}`);
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>('https://api.mika.house/post', post);
  }

  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(`https://api.mika.house/post/${post.slug}`, post);
  }

  deletePost(slug: String): Observable<any> {
    return this.http.post<any>(`https://api.mika.house/post/${slug}`, {});
  }

  uploadImage(form:any): Observable<any> {
    return this.http.post<any>('https://api.mika.house/image', form);
  }

  tagSearch(tag: String): Observable<Post[]> {
    return this.http.get<Post[]>(`https://api.mika.house/tags/${tag}`);
  }
}
