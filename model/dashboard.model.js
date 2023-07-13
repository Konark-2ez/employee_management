const mongoose = require('mongoose');
const dashSchema=mongoose.Schema({
    fname:String,
    lname:String,
    email:String,
    salary:Number,
    department:String

})
const dashModel = mongoose.model('dashboard',dashSchema);
module.exports = {dashModel}