var express = require('express');
var router = express.Router();
const StudentController=require('../controllers/studentsControler')
const upload=require('../middlewares/multer')


/* GET users listing. */

router.get('/add',StudentController.addUi)

router.get('/', StudentController.find);
router.get('/edit/:id', StudentController.findOneToUpdate);
router.post('/',upload, StudentController.inserOne);
router.post('/update/:id',upload, StudentController.updateOne);
router.get('/delete/:id', StudentController.deleteOne);

module.exports = router;