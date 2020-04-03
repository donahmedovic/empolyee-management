const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Employee = new Schema({
    // id: { 
    //     Number 
    // },
    name: {
        type: String
    },
    email: {
        type: String
    },
    designation: {
        type: String
    },
    mobile: {
        type: String
    },
    age:{
        type:Number
    }
}, {
    collection: 'employee'
})

module.exports = mongoose.model('Employee', Employee)