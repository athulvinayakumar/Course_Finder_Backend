// import mongoose
const mongoose = require('mongoose')

// create scheme
const enrollSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,

        validator(value) {
            (!validator.isEmail(value))
            throw new Error('invalid Email')
        }
    },
    date: {
        type: String,
        require: true,
    },
    number: {
        type: String,
        require: true,
    },
    message: {
        type: String,
        require: true,
    },
    courseid: {
        type: String,
        require: true
    }
})


// create model
const enrolls = mongoose.model("enrolls", enrollSchema)

// export
module.exports = enrolls
