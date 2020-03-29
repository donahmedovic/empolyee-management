import {InMemoryDbService} from 'angular-in-memory-web-api'

export class EmpoloyeesData implements InMemoryDbService{
    createDb() {
      let employees = [{
            id: 1,
            age: 55,
            firstName: "ahmed",
            lastName: "sharkawy",
            designation: "Associate Lead, Technology"
          }, {
            id: 2,
            age: 35,
            firstName: "fady",
            lastName: "lotfy",
            designation: "Associate Senior, Technology"
          }, {
            id: 3,
            age: 25,
            firstName: "sara",
            lastName: "soliman",
            designation: "Recruitment specialist, HR"
          },
          {
            id: 4,
            age: 29,
            firstName: "Ali",
            lastName: "Gamal",
            designation: "Team Lead, UI"
          }, {
            id: 5,
            age: 31,
            firstName: "Sohaib",
            lastName: "Saad",
            designation: "Senior IOS, Mobile"
          },{
            id: 6,
            age: 34,
            firstName: "Mahmoud",
            lastName: "monir",
            designation: "Senior Android, Mobile"
          }];
          return{employees}
    }

}