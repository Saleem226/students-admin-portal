const studentModel = require('../modals/students')
const StudentModel = require('../modals/students')
const fs = require('fs')

class StudentController {

    static addUi = (req, res) => {
        res.render('add_student', { title: "ADD Student" })
    }

    static find = async (req, res) => {
        try {
            const students = await studentModel.find()
            res.render('index', { title: "home", students: students })
        } catch (error) {
            console.log(error)
            res.send("all students not found")
        }
    }

    static findOneToUpdate = async (req, res) => {
        try {
            const student = await StudentModel.findById(req.params.id)
            res.render('edit_student', { title: "edit", student: student })
            // res.send(student)
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
    static inserOne = async (req, res) => {
        try {
            console.log(req.file)
            if (!req.file) {
                req.file.filename = ''
            }
            const user = new StudentModel({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                image: req.file.filename
            })
            await user.save();
            req.session.message = {
                type: 'success',
                message: "User Added Successfully"
            };

            res.redirect('/students/')

        } catch (error) {
            console.log(error)
            res.send(error)
        }

    }

    static updateOne = async (req, res) => {
        const { id } = req.params
        console.log(id)
        try {
            let new_image = ''
            if (req.file) {
                new_image = req.file.filename
                console.log(new_image)
            }
            fs.unlink("./public/images/"+req.body.old_image, (err) => {
                if (err) {
                    console.log(err)

                } else {
                    new_image = req.body.old_image
                }
            })
        // fs.unlinkSync("./public/images/"+req.body.old_image)

            const student = await StudentModel.findByIdAndUpdate(id, {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                image: new_image
            })
            req.session.message = {
                type: "success",
                message: "Student updated successfuly"
            }
            res.redirect('/students/')
        } catch (error) {
            req.session.message = {
                type: "danger",
                message: error.message
            }
            console.log(error)
            res.redirect('/students/')
        }
    }

    static deleteOne = async (req, res) => {
        try {
            const { id } = req.params
            const student = await StudentModel.findByIdAndRemove(id)
            if (student.image !== '') {
                fs.unlink("./public/images/"+ student.image, (err) => {
                    err ? console.log(err) : console.log(" image deleted successfully")
                })
            }
            req.session.message = {
                type: "success",
                message: "Student Deleted Successfully"
            }
            res.redirect('/students/')
        } catch (error) {
            req.session.message = {
                type: "danger",
                message: "Unable to delete"
            }
            res.redirect('/students/')
        }
    }

}


module.exports = StudentController