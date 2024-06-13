import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { TopBarComponent } from './top-bar/top-bar.component'
import { HttpClientModule } from '@angular/common/http'
import { PostService } from './services/post.service'
import { PostListComponent } from './post-list/post-list.component'
import { PostListItemComponent } from './post-list-item/post-list-item.component'
import { ReactiveFormsModule } from '@angular/forms'
import { CreatePostFormComponent } from './create-post-form/create-post-form'

@NgModule({
	declarations: [
		AppComponent,
		TopBarComponent,
		PostListComponent,
		PostListItemComponent,
		CreatePostFormComponent,
	],
	imports: [BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule],
	providers: [PostService],
	bootstrap: [AppComponent],
})
export class AppModule {}
