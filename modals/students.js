const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Name is required']
    },
    email: {
        type: String,
        required: [true,"Email is required"],
    },
    phone: {
        type: String,
        required: [true,"phone is required"]
    },
    image: {
        type: String,
        required: [true,"image is required"]
    },
    created: {
        type: String,
        required: true,
        default: Date.now
    },

})

const studentModel=mongoose.model('Student',studentSchema)
module.exports=studentModel