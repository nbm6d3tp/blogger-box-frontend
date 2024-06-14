import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'

import { Post, PostCreateInput } from '../data/post'
import { environment } from '../environment/environment'

@Injectable()
export class PostService {
	private postsUrl = `${environment.apiURL}v1/posts`

	constructor(private http: HttpClient) {}

	getAll(): Observable<Post[]> {
		return this.http.get<Post[]>(this.postsUrl)
	}

	create(post: PostCreateInput): Observable<Post> {
		return this.http.post<Post>(this.postsUrl, post)
	}

	protected handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(`${operation} failed: ${error.message}`, error) // log to console
			// Let the app keep running by returning an empty result.
			return of(result as T)
		}
	}
}
