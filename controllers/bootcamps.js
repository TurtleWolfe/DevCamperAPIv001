const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');
const BootCamp = require('../models/BootCamp');

// @desc    Create a new BootCamp               C
// @route   POST /api/v1/bootcamps              C
// @access  Private                             C
exports.createBootCamp = asyncHandler(async (req, res, next) => {
    // Add user to req,body
    req.body.user = req.user.id;

    // Check for published bootcamp
    const publishedBootcamp = await BootCamp.findOne({ user: req.user.id });

    // If the user is not an admin, they can only add one bootcamp
    if (publishedBootcamp && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(
                `The user with ID ${req.user.id} has already published a bootcamp`,
                400
            )
        );
    }

    const bootCamp = await BootCamp.create(req.body);
    // console.log(req.body);
    res.status(201)
        .json({
            success: true,
            msg: `Created a new BootCamp`,
            data: bootCamp,
        });
});

// @desc    Reads all BootCamps                 Rs
// @route   GET /api/v1/bootcamps               Rs
// @access  Public                              Rs
exports.getBootCamps = asyncHandler(async (req, res, next) => {
    // let bootCampZ = await BootCamp.find();
    res.status(200).json(res.advancedResults);
    // res.status(200)
    //     .json({
    //         success: true,
    //         count: bootCamps.length,
    //         pagination,
    //         msg: `GET ${bootCamps.length} BootCamps out of ${bootCampZ.length}`,
    //         data: bootCamps
    //     });
});

// @desc    Read a single BootCamp              R
// @route   GET /api/v1/bootcamps/:id           R
// @access  Public                              R
exports.getBootCamp = asyncHandler(async (req, res, next) => {
    let bootCampZ = await BootCamp.find();
    const bootCamp = await BootCamp.findById(req.params.id);
    // console.log(req.body);
    if (!bootCamp) {
        return next(
            new ErrorResponse(`GET BootCamp by ID ${req.params.id} is not part of the ${bootCampZ.length}`, 404)
        );
    }
    res.status(200)
        .json({
            success: true,
            msg: `GET BootCamp by ID ${req.params.id} out of ${bootCampZ.length}`,
            data: bootCamp,
        });
});

// @desc    Update a single BootCamp            U
// @route   PUT /api/v1/bootcamps/:id           U
// @access  Private                             U
exports.updateBootCamp = asyncHandler(async (req, res, next) => {
    let bootcamp = await BootCamp.findById(req.params.id);
    let bootcampz = await BootCamp.find();

    if (!bootcamp) {
        return next(
            new ErrorResponse(`PUT bootcamp by ID ${req.params.id} is an odd request.. out of ${bootcampz.length}`, 404)
        );
    }

    // Make sure user is bootcamp owner
    if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(
                `User ${req.params.id} is not authorized to update this bootcamp`,
                401
            )
        );
    }

    bootcamp = await BootCamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200)
        .json({
            success: true,
            msg: `Updated BootCamp ${req.params.id}`,
            data: bootcamp
        });
});

// @desc Delete a single BootCamp               D
// @route DELETE /api/v1/bootcamps/:id          D
// @access Private                              D
exports.deleteBootCamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await BootCamp.findById(req.params.id);
    const bootcampz = await BootCamp.find();

    if (!bootcamp) {
        return next(
            new ErrorResponse(`DELETE BootCamp by ID ${req.params.id} is an ODDITY not found in this database ${bootcampz.length}`, 404)
        );
    }

    // Make sure user is bootcamp owner
    if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(
                `User ${req.params.id} is not authorized to delete this bootcamp`,
                401
            )
        );
    }

    bootcamp.remove();

    res.status(200)
        .json({
            success: true,
            msg: `Deleted BootCamp by ID ${req.params.id} out of ${bootcampz.length - 1} remaining`,
            data: bootcamp
        });
});

// @desc      Get BootCamps within a radius
// @route     GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access    Private
exports.getBootCampsInRadius = asyncHandler(async (req, res, next) => {
    const { zipcode, distance } = req.params;

    // Get lat/lng from geocoder
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    // Calc radius using radians
    // Divide dist by radius of Earth
    // Earth Radius = 3,963 mi / 6,378 km
    const radius = distance / 3963;

    const bootCamps = await BootCamp.find({
        location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
    });

    res.status(200).json({
        success: true,
        count: bootCamps.length,
        msg: `${bootCamps.length} BootCamps within ${req.params.distance} miles of the ${req.params.zipcode} zipcode`,
        data: bootCamps
    });
});

// @desc      Upload photo for BootCamp
// @route     PUT /api/v1/bootcamps/:id/photo
// @access    Private
exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
    const bootcamp = await BootCamp.findById(req.params.id);

    if (!bootcamp) {
        return next(
            new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
        );
    }

    // Make sure user is bootcamp owner
    if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(
                `User ${req.params.id} is not authorized to update this bootcamp`,
                401
            )
        );
    }

    if (!req.files) {
        return next(new ErrorResponse(`Please upload a file`, 400));
    }
    // console.log(req.files.file);
    const file = req.files.file;
    console.log(file);

    // Make sure the image is a photo
    if (!file.mimetype.startsWith('image')) {
        return next(new ErrorResponse(`Please upload an image file`, 400));
    }

    // Check filesize
    if (file.size > process.env.MAX_FILE_UPLOAD) {
        return next(
            new ErrorResponse(
                `Please upload an image less than ${process.env.MAX_FILE_UPLOAD} bytes`,
                400
            )
        );
    }

    // Create custom filename
    file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

    // save image to database and respond
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
        if (err) {
            console.error(err);
            return next(new ErrorResponse(`Problem with file upload`, 500));
        }

        await BootCamp.findByIdAndUpdate(req.params.id, { photo: file.name });

        res.status(200).json({
            success: true,
            data: file.name
        });
    });
});