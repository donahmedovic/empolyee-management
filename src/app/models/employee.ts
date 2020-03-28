export class Employee{
    id:number;
    age:number
    firstName:string;
    lastName:string;
    designation:string;
    /**
     *
     */
    constructor(id:number,
        firstName:string,
        lastName:string,
        designation:string) {
            this.id=id;
            this.firstName=firstName;
            this.lastName=lastName;
            this.designation=designation;
    }

}