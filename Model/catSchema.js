// import mongoose
const mongoose = require('mongoose')

// create scheme
const catSchema = new mongoose.Schema({

    category:{
        type:String,
        require:true,
    },

    userId:{
        type:String,
        require:true
    }
})


// create model
const categories = mongoose.model("categories",catSchema)

// export
module.exports = categories
