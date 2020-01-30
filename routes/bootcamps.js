const express = require('express');
const {
    createBootCamp, //      CREATE
    getBootCamps,   //      READS 
    getBootCamp,    ///:id  READ
    updateBootCamp, ///:id  UPDATE
    deleteBootCamp  ///:id  DELETE
} = require('../controllers/bootcamps');

const router = express.Router();

router.route('/')
    .post(createBootCamp)   //      CREATE
    .get(getBootCamps);     //      READS

router.route('/:id')
    .get(getBootCamp)       ///:id  READ
    .put(updateBootCamp)    ///:id  UPDATE
    .delete(deleteBootCamp);///:id  DELETE

module.exports = router;