const multer=require('multer')


const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'public/images/')
    },
    filename:function(req,file,cb){
        cb(null,file.filename+"_"+Date.now()+"_"+file.originalname)
    }
})
const upload=multer({storage:storage}).single("image")

module.exports=upload