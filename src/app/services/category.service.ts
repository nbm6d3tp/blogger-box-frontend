import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { CATEGORIES, Category, CategoryCreateInput } from '../data/category'
import { Observable, catchError, of } from 'rxjs'
import { environment } from '../environment/environment'

@Injectable()
export class CategoryService {
	private categoriesUrl = `${environment.apiURL}v1/categories`

	constructor(private http: HttpClient) {}

	getAll(): Observable<Category[]> {
		return of(CATEGORIES)
	}

	protected handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(`${operation} failed: ${error.message}`, error) // log to console
			// Let the app keep running by returning an empty result.
			return of(result as T)
		}
	}
}
