import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../../service/api.service';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})
export class CourseCreateComponent implements OnInit {
  submitted = false;
  courseForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.mainForm();
  }

  ngOnInit(): void { }

  mainForm(): void{
    this.courseForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      sharingDate: ['', [Validators.required]],
      pieces: ['', [Validators.required]]
    });
  }

  // Getter to access form control
  get myForm(){
    return this.courseForm.controls;
  }
  onSubmit(): boolean{
    this.submitted = true;
    if (!this.courseForm.valid) {
      return false;
    } else {
      // console.log(this.courseForm.value);
      this.apiService.createCourse(this.courseForm.value).subscribe(
        (res) => {
          console.log('Course successfully created!');
          this.ngZone.run(() => this.router.navigateByUrl('/courses-list'));
        }, (error) => {
          console.log(error);
        });
    }
  }
}
