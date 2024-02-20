const mongoose = require('mongoose')

const coursesSchema = new mongoose.Schema({
    
    coursename:{
        type:String,
        require:true,
    },

    description:{
        type:String,
        require:true,
          
    },
    category:{
        type:String,
        require:true
    },

    courseimage:{
        type:String,
        require:true
    },

    coursevideo:{
        type:String,
        require:true
    },

    userId:{
        type:String,
        require:true
    }
})


const coursses= mongoose.model("coursses",coursesSchema)

// export
module.exports = coursses
