const express = require('express');
const {
    createBootCamp,     //      CREATE
    getBootCamps,       //      READS 
    getBootCamp,        ///:id  READ
    updateBootCamp,     ///:id  UPDATE
    deleteBootCamp,     ///:id  DELETE
    getBootCampsInRadius,///radius/:zipcode/:distance
    bootcampPhotoUpload  ////:id/photo
} = require('../controllers/bootcamps');

const BootCamp = require('../models/BootCamp');

// Include other resource routers
const courseRouter = require('./courses');
const reviewRouter = require('./reviews');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);
router.use('/:bootcampId/reviews', reviewRouter);

router.route('/radius/:zipcode/:distance').get(getBootCampsInRadius);

router.route('/:id/photo').put(protect, authorize('publisher', 'admin'), bootcampPhotoUpload);

router.route('/')
    .post(protect, authorize('publisher', 'admin'), createBootCamp)                                //      CREATE
    .get(advancedResults(BootCamp, 'courses'), getBootCamps);     //      READS

router.route('/:id')
    .get(getBootCamp)                                             ///:id  READ
    .put(protect, authorize('publisher', 'admin'), updateBootCamp)                                 ///:id  UPDATE
    .delete(protect, authorize('publisher', 'admin'), deleteBootCamp);                             ///:id  DELETE

module.exports = router;