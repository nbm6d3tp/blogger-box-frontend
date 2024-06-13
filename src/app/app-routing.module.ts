import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { PostListComponent } from './post-list/post-list.component'
import { CreatePostFormComponent } from './create-post-form/create-post-form'

const routes: Routes = [
	{ path: '', component: PostListComponent },
	{ path: 'add-post', component: CreatePostFormComponent },
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
