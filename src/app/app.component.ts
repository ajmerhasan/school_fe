import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Enroll } from './model/Enroll';
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

  editCache: { [key: string]: any } = {};

  // allStudents: any = [];
  // allCourses: any = [];
  // allEnrollment: any = [];
  allEnrollment: any[] = [];

  constructor(
    // private studentSvc: StudentService,
    // private courseSvc: CourseService,
    private enrollSvc: EnrollService,
    private nzMessageService: NzMessageService,
  ) { }

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.allEnrollment.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.allEnrollment[index] },
      edit: false
    };
  }

  saveEdit(id: string): void {
    const index = this.allEnrollment.findIndex(item => item.id === id);
    Object.assign(this.allEnrollment[index], this.editCache[id].data);
    this.editCache[id].edit = false;
  }

  updateEditCache(): void {
    this.allEnrollment.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  readAll(): void {
    this.enrollSvc
        .findAll()
        .subscribe((response: any) => {
          console.log(response);
          this.allEnrollment = response;
        })

    this.allEnrollment.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  ngOnInit(): void {
    // this.students();
    // this.courses();
    this.readAll();
  }

  // students(): void {
  //   this.studentSvc
  //       .find()
  //       .subscribe((response: any) => {
  //         console.log(response);
  //         this.allStudents = response;
  //       })
  // }

  // courses(): void {
  //   this.courseSvc
  //       .find()
  //       .subscribe((response: any) => {
  //         console.log(response);
  //         this.allCourses = response;
  //       })
  // }
}
