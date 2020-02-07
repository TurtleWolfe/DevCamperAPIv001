const express = require('express');
const {
    createBootCamp, //      CREATE
    getBootCamps,   //      READS 
    getBootCamp,    ///:id  READ
    updateBootCamp, ///:id  UPDATE
    deleteBootCamp,  ///:id  DELETE
    getBootCampsInRadius,    ///radius/:zipcode/:distance
    bootcampPhotoUpload    ////:id/photo
} = require('../controllers/bootcamps');

const BootCamp = require('../models/BootCamp');
const advancedResults = require('../middleware/advancedResults');

// Include other resource routers
const courseRouter = require('./courses');
// const reviewRouter = require('./reviews');

const router = express.Router();

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);
// router.use('/:bootcampId/reviews', reviewRouter);

router.route('/radius/:zipcode/:distance').get(getBootCampsInRadius);

router.route('/:id/photo').put(bootcampPhotoUpload);

router.route('/')
    .post(createBootCamp)                                         //      CREATE
    .get(advancedResults(BootCamp, 'courses'), getBootCamps);     //      READS

router.route('/:id')
    .get(getBootCamp)                                             ///:id  READ
    .put(updateBootCamp)                                          ///:id  UPDATE
    .delete(deleteBootCamp);                                      ///:id  DELETE

module.exports = router;