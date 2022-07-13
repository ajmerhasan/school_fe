export class Enroll {
    constructor(
        public createdAt?: Date,
        public createdBy?: string,
        public updatedAt?: Date,
        public updatedBy?: string,
        public student?: Student,
        public course?: Course,
        public yearTaken?: Date,
        public score?: number,
        public id?: number,
    ){}
}

export class Student {
    constructor(
        public createdAt?: Date,
        public createdBy?: string,
        public updatedAt?: Date,
        public updatedBy?: string,
        public firstName?: string,
        public lastName?: string,
        public mobile?: string,
        public nric?: string,
        public gender?: string,
        public id?: number,
    ){}
}

export class Course {
    constructor(
        public createdAt?: Date,
        public createdBy?: string,
        public updatedAt?: Date,
        public updatedBy?: string,
        public courseName?: string,
        public id?: number,
    ){}
}