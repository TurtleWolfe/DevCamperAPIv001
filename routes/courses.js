const express = require('express');
const {
  createCourse, //      CREATE 
  getCourses,   //      READS 
  getCourse,    ///:id  READ
  updateCourse, ///:id  UPDATE
  deleteCourse  ///:id  DELETE
} = require('../controllers/courses');

const Course = require('../models/Course');
const advancedResults = require('../middleware/advancedResults');

const router = express.Router({ mergeParams: true });

router.route('/')
  .post(createCourse)       //      CREATE
  .get(advancedResults(Course, {
    path: 'bootcamp',
    select: 'name description'
  }),
    getCourses);            //      READS

router.route('/:id')
  .get(getCourse)           ///:id  READ
  .put(updateCourse)        ///:id  UPDATE
  .delete(deleteCourse);    ///:id  DELETE

module.exports = router;
