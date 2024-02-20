const multer = require('multer')

const storage = multer.diskStorage({
   
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    
    filename:(req,file,callback)=>{
        const filename = `file-${Date.now()}.${file.originalname}`
        callback(null,filename)
    }
})

const fileFilter = (req,file,callback)=>{
    //mimetype - used to get the type
    if(file.mimetype === 'image/png' || file.mimetype ==='image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'video/mp4' || file.mimetype === 'video/mpeg'){
        callback(null,true)
    }
    else{
        callback(null,false)
        return callback(new Error("Only png, jpg,,jpeg ,mp4,and mpeg files are allowed !!!"))
    }
}


// create multerConfigure
const multerConfig = multer({
    storage,
    fileFilter
})

// export multer
module.exports = multerConfig