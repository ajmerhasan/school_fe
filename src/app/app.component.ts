import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
import { Enroll } from './model/enroll.model';
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

  editCache: { [key: string]: { edit: boolean; data: Enroll } } = {};
  //listOfData: Enroll[] = [];

  // allStudents: any = [];
  // allCourses: any = [];
  allEnrollment: any = [];
  enrollUpdate: any = [];

  enroll$!: Observable<Enroll[]>;

  constructor(
    // private studentSvc: StudentService,
    // private courseSvc: CourseService,
    private enrollSvc: EnrollService,
    private nzMessageService: NzMessageService,
  ) { }

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
    this.enrollSvc.delete(enroll.id)
      .subscribe(() => {
        this.allEnrollment = this.enrollSvc.findAll();
      });
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

  cancel(): void {
    this.nzMessageService.info('Abort deletion');
  }

  ngOnInit(): void {
    // this.students();
    // this.courses();
    this.findAll();
  }

  // startEdit(id: string): void {
  //   this.editCache[id].edit = true;
  // }

  // cancelEdit(id: number): void {
  //   const index = this.listOfData.findIndex(item => item.id === id);
  //   this.editCache[id] = {
  //     data: { ...this.listOfData[index] },
  //     edit: false
  //   };
  // }

  // saveEdit(id: number): void {
  //   const index = this.listOfData.findIndex(item => item.id === id);
  //   Object.assign(this.listOfData[index], this.editCache[id].data);
  //   this.editCache[id].edit = false;
  // }

  // updateEditCache(): void {
  //   this.listOfData.forEach(item => {
  //     this.editCache[item.id!] = {
  //       edit: false,
  //       data: { ...item }
  //     };
  //   });

  //   console.log(this.listOfData);
  // }

  // ngOnInit(): void {
  //   this.readAll();
  //   this.updateEditCache();
  // }
}
