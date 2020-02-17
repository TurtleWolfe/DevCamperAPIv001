const express = require('express');
const {
  createCourse, //      CREATE 
  getCourses,   //      READS 
  getCourse,    ///:id  READ
  updateCourse, ///:id  UPDATE
  deleteCourse  ///:id  DELETE
} = require('../controllers/courses');

const Course = require('../models/Course');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .post(protect, authorize('publisher', 'admin'), createCourse)       //      CREATE
  .get(advancedResults(Course, {
    path: 'bootcamp',
    select: 'name description'
  }),                                                                 //      READS                                             
    getCourses);                                                      //      READS

router.route('/:id')
  .get(getCourse)                                                     ///:id  READ
  .put(protect, authorize('publisher', 'admin'), updateCourse)        ///:id  UPDATE
  .delete(protect, authorize('publisher', 'admin'), deleteCourse);    ///:id  DELETE

module.exports = router;
