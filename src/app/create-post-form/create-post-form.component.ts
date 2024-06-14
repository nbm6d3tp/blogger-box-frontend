import { Component, OnInit } from '@angular/core'
import { PostService } from '../services/post.service'
import { FormBuilder, Validators } from '@angular/forms'
import { Category } from '../data/category'
import { CategoryService } from '../services/category.service'
import { Router } from '@angular/router'
import { PostCreateInput } from '../data/post'

@Component({
	selector: 'app-create-post-form',
	templateUrl: './create-post-form.component.html',
	styleUrls: ['./create-post-form.component.css'],
})
export class CreatePostFormComponent implements OnInit {
	categories: Category[] = []
	postCreateInput!: PostCreateInput

	constructor(
		private fb: FormBuilder,
		private categoryService: CategoryService,
	) {
		console.log('CreatePostFormComponent constructor')
	}

	ngOnInit(): void {
		this.categoryService.getAll().subscribe(categories => {
			this.categories = categories
		})
	}

	form = this.fb.group({
		title: [
			'',
			{
				validators: [Validators.required, Validators.minLength(5), Validators.maxLength(150)],
			},
		],
		category: [
			'',

			{
				validators: [Validators.required],
			},
		],
		content: [
			'',

			{
				validators: [Validators.required, Validators.maxLength(2500)],
			},
		],
	})

	get title() {
		return this.form.controls['title']
	}
	get category() {
		return this.form.controls['category']
	}
	get content() {
		return this.form.controls['content']
	}
}
