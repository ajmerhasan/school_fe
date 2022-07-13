import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { Course, Enroll, Student } from './model/enroll.model';
import { CourseService } from './service/course.service';
import { EnrollService } from './service/enroll.service';
import { StudentService } from './service/student.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'school-fe';

  size: 'small' | 'middle' | 'large' | number = 'small';

  //editCache: { [key: string]: { edit: boolean; data: Enroll } } = {};
  //listOfData: Enroll[] = [];

  // allStudents: any = [];
  // allCourses: any = [];
  allEnrollment: any = [];
  enrollUpdate: any = [];
  isOkLoading = false;

  students$!: Observable<Student[]>;
  courses$!: Observable<Course[]>;

  //enroll$!: Observable<Enroll[]>;

  //enrollForm!: FormGroup;

  constructor(
    private studentSvc: StudentService,
    private courseSvc: CourseService,
    private enrollSvc: EnrollService,
    private nzMessageService: NzMessageService,
    public fb: FormBuilder,
    private modalService: NzModalService,
  ) { }

  enrollForm = new FormGroup({
    student_id: new FormControl(),
    course_id: new FormControl(),
    yearTaken: new FormControl(),
    score: new FormControl(),
  })

  // studentList(e : any) {
  //   this.students$ = this.studentSvc.findAll();
  
  //   console.log(this.students$);
  //   return this.students$;
  // }

  findAll() {
    this.enrollSvc
        .findAll()
        .subscribe((response: any) => {
          //console.log(response);
          //this.allEnrollment.data = response;
          this.allEnrollment = response;
        });
  }

  find(id: number) {
    this.enrollSvc
        .find(id)
        .subscribe(() => {
          this.allEnrollment = this.enrollSvc.find(id);
        });
  }

  delete(enroll: Enroll){
    // this.enrollSvc.delete(enroll.id)
    //   .subscribe(() => {
    //     this.allEnrollment = this.enrollSvc.findAll();
    //   });

    this.enrollSvc.delete(enroll.id).subscribe();  
    this.nzMessageService.info('Unenrolled successfully');
    
  }

  update(enroll: Enroll) {
    const data = {
      "yearTaken": enroll.yearTaken,
      "score": enroll.score
    }

    //console.log(data);
    this.enrollSvc.update(enroll.id!, data).subscribe();
    this.nzMessageService.info('Updated successfully');
  }

  create(enroll: Enroll) {
    // const data = {
    //   "yearTaken": enroll.yearTaken,
    //   "score": enroll.score
    // }

    //console.log(data);
    //this.enrollSvc.create(enroll).subscribe();
    this.enrollSvc.create(enroll);

    this.handleOk();

    this.nzMessageService.info('Updated successfully');
  }

  cancel(): void {
    this.nzMessageService.info('Abort deletion');
  }

  ngOnInit(): void {
    // this.students();
    // this.courses();
    this.students$ = this.studentSvc.findAll();
    this.courses$ = this.courseSvc.findAll();
  
    this.findAll();
  }

  onSubmit() {
    // console.log("payload ", this.enrollForm.value)
    // alert(JSON.stringify(this.enrollForm.value, undefined, 2)) 

    this.enrollSvc.create(this.enrollForm.value);
  }

  isVisible = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    // console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
