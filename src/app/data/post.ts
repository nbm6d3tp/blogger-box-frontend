import { Category } from './category'

export type PostCreateInput = Omit<Post, 'id' | 'createdDate'>
export interface Post {
	id: string
	title: string
	content: string
	createdDate: string
	category: Category
}
