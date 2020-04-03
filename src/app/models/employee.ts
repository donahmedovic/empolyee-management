export class Employee{
    _id:string;
    age:number;
    email:string;
    name:string;
    mobile:string;
    designation:string;
    /**
     *
     */
    constructor(id:string,
    name:string,
    email:string,
    mobile:string,
    age:number,
        designation:string) {
            this._id=id;
            this.mobile=mobile;
            this.name=name;
            this.email=email;
            this.age=age;
            this.designation=designation;
    }

}