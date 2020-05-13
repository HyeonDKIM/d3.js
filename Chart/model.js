const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    age:{type:String}
});

module.exports = mongoose.model('PatientInformation', PatientSchema);