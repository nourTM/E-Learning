import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';


import { CourseCreateComponent } from './components/course-create/course-create.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseEditComponent } from './components/course-edit/course-edit.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'create-course' },
  { path: 'create-course', component: CourseCreateComponent },
  { path: 'edit-course/:id', component: CourseEditComponent },
  { path: 'courses-list', component: CourseListComponent }
  ];


@NgModule({
  declarations: [],
  imports: [CommonModule , RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
