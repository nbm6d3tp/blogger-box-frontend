import { Component, OnInit } from '@angular/core'
import { PostService } from '../services/post.service'
import { FormBuilder, Validators } from '@angular/forms'
import { CATEGORIES, Category } from '../data/category'
import { CategoryService } from '../services/category.service'
import { Router } from '@angular/router'
import { PostCreateInput } from '../data/post'
import Swal from 'sweetalert2'

@Component({
	selector: 'app-create-post-form',
	templateUrl: './create-post-form.component.html',
	styleUrls: ['./create-post-form.component.css'],
})
export class CreatePostFormComponent implements OnInit {
	categories: Category[] = []
	postCreateInput!: PostCreateInput
	isLoading = false

	constructor(
		private fb: FormBuilder,
		private categoryService: CategoryService,
		private postService: PostService,
		private router: Router,
	) {}

	onSubmit() {
		this.form.markAllAsTouched()
		if (this.form.valid) {
			this.isLoading = true
			this.form.disable()
			this.postCreateInput = {
				title: this.title.value as string,
				categoryID: this.category.value as string,
				content: this.content.value as string,
			}
			this.postService.create(this.postCreateInput).subscribe({
				next: value => {
					Swal.fire({
						icon: 'success',
						title: 'Post created successfully',
						showConfirmButton: true,
						confirmButtonText: 'Go back to home page',
						allowOutsideClick: false,
					}).then(() => {
						this.router.navigate(['/'])
					})
				},
				error: error => {
					Swal.fire({
						icon: 'error',
						title: 'Error creating post',
						text: 'Please try again later.',
						showConfirmButton: true,
						confirmButtonText: 'Go back to home page',
						allowOutsideClick: false,
					}).then(() => {
						this.router.navigate(['/'])
					})
				},
				complete: () => {
					this.isLoading = false
					this.form.enable()
				},
			})
		} else {
			const Toast = Swal.mixin({
				toast: true,
				position: 'top-end',
				showConfirmButton: false,
				timer: 3000,
				timerProgressBar: true,
				didOpen: toast => {
					toast.onmouseenter = Swal.stopTimer
					toast.onmouseleave = Swal.resumeTimer
				},
			})
			Toast.fire({
				icon: 'error',
				title: 'Please review your post',
			})
		}
	}

	onFocus(input: HTMLElement) {
		const formControlName = input.getAttribute('formControlName') as
			| 'title'
			| 'category'
			| 'content'
			| null
		if (formControlName) this.form.controls[formControlName].markAsUntouched()
	}
	onCancel() {
		this.router.navigate(['/'])
	}

	ngOnInit(): void {
		this.categoryService.getAll().subscribe({
			next: categories => {
				this.categories = categories
			},
			error: error => {
				this.categories = CATEGORIES
			},
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
