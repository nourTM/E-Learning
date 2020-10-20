import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators, AbstractControl} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../../service/api.service';
import {formatDate} from '@angular/common';
import {HttpEvent, HttpEventType} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})
export class CourseCreateComponent implements OnInit {
  submitted = false;
  courseForm: FormGroup;
  constructor(
    private sanitizer: DomSanitizer,
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.mainForm();
  }

  /* drag and drop code */
  fileArr = [];
  imgArr = [];
  fileObj = [];

  // Getter to access form control
  get myForm(){
    return this.courseForm.controls;
  }
  mainForm() {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      sharingDate: [ [Validators.required]]
    });
  }

  get date(): AbstractControl{
    return this.courseForm.get('date') ;
  }

  handleUpload(e): void{
     console.log( e.target.value);

  }
  onSubmit(): boolean{
    this.submitted = true;
    if (!this.courseForm.valid) {
      console.log(this.courseForm.value);
      return false;
    } else {
      this.courseForm.controls.sharingDate.patchValue(formatDate(new Date(), 'yyyy/MM/dd hh:mm:ss', 'en'));
      // this.date =  formatDate(this.myDate, 'yyyy/MM/dd hh:mm:ss', 'en');
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

  ngOnInit(): void {
  }
}
