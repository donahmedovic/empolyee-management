import {InMemoryDbService} from 'angular-in-memory-web-api'

export class EmpoloyeesData implements InMemoryDbService{
    createDb() {
      let employees = [{
            id: 1,
            age: 55,
            email:'a.sharkawy@aot.com',
            firstName: "ahmed",
            lastName: "sharkawy",
            designation: "Associate Lead, Technology"
          }, {
            id: 2,
            age: 35,
            email:'f.lotfy@aot.com',
            firstName: "fady",
            lastName: "lotfy",
            designation: "Associate Senior, Technology"
          }, {
            id: 3,
            age: 25,
            email:'s.soliman@aot.com',
            firstName: "sara",
            lastName: "soliman",
            designation: "Recruitment specialist, HR"
          },
          {
            id: 4,
            age: 29,
            email:'a.Gamal@aot.com',
            firstName: "Ali",
            lastName: "Gamal",
            designation: "Team Lead, UI"
          }, {
            id: 5,
            age: 31,
            email:'s.Saad@aot.com',
            firstName: "Sohaib",
            lastName: "Saad",
            designation: "Senior IOS, Mobile"
          },{
            id: 6,
            age: 34,
            email:'m.monir@aot.com',
            firstName: "Mahmoud",
            lastName: "monir",
            designation: "Senior Android, Mobile"
          }];
          return{employees}
    }

}