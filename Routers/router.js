// 
//1) import express module
const express = require('express')

// // create an object for router class inside express module
const router = new express.Router()


// // import controller
const userController = require('../controller/userController')

// // import controller
const courserController = require('../controller/courserController')

const coursesController = require('../controller/coursesController')

// // import controller
const catController = require('../controller/catController')

const enrollController = require('../controller/enrollController')


const jwtMiddleware = require('../Middleware/jwtMiddleware')

const multerConfig = require('../Middleware/multerMiddleware')

// // setup path to resolve request
router.post('/user/register',userController.register)

// login
router.post('/user/login',userController.login)

// // setup path to resolve request
router.post('/courser/register',courserController.register)

// login
router.post('/courser/login',courserController.login)

// add category
router.post('/admin/addcategory',jwtMiddleware,catController.addCategory)

// get category
router.get('/admin/getcategory',jwtMiddleware,catController.getCategory)

// get category
router.get('/admin/getcategories',catController.getCategories)

// // update
router.put('/admin/editcategory/:id',jwtMiddleware,catController.editCategory)

// delete
router.delete('/admin/remove/:id',jwtMiddleware,catController.deletecAtegory)

// get users
router.get('/user/getalluser',userController.getallusers)

// get cousers
router.get('/courser/getallcoursers',courserController.getallCoursers)

// add cousre
router.post('/courser/addcourse',jwtMiddleware, multerConfig.fields([{ name: 'courseimage', maxCount: 1 }, { name: 'coursevideo', maxCount: 1 }]),coursesController.addcourse)

// get cousre
router.get('/courser/getcourse',jwtMiddleware,coursesController.getCourses)

// get all cousre
router.get('/courser/getallcourse',jwtMiddleware,coursesController.getAllCourses)

// get all cousre
router.get('/courser/getallcourses',jwtMiddleware,coursesController.getAllCourses1)

// update cousre
router.put('/courser/edit/:id',jwtMiddleware,multerConfig.fields([{ name: 'courseimage', maxCount: 1 }, { name: 'coursevideo', maxCount: 1 }]),coursesController.editCourses)

// delete course
router.delete('/courser/remove/:id',jwtMiddleware,coursesController.deleteCourse)

// get course and courser details together
router.get('/courser/getallcombine/:id',jwtMiddleware,coursesController.getCombinedData)

// enroll now
router.post('/user/enrollnow',jwtMiddleware,enrollController.enrollNow)

// get enrolledusers
router.get('/user/enrollusers/:id',jwtMiddleware,enrollController.getEnrolledUsers)
// get enrolledusers
router.delete('/user/removeEnrolled/:id',jwtMiddleware,enrollController.deleteEnrolled)

// //4) export router
module.exports = router