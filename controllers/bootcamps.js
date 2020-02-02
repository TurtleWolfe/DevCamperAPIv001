const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const BootCamp = require('../models/BootCamp');

// @desc    Create a new BootCamp               C
// @route   POST /api/v1/bootcamps              C
// @access  Private                             C
exports.createBootCamp = asyncHandler(async (req, res, next) => {
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
    const bootCamps = await BootCamp.find();
    res.status(200)
        .json({
            success: true,
            count: bootCamps.length,
            msg: `GET all ${bootCamps.length} BootCamps`,
            data: bootCamps
        });
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
    let bootCampZ = await BootCamp.find();
    const bootCamp = await BootCamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!bootCamp) {
        return next(
            new ErrorResponse(`PUT BootCamp by ID ${req.params.id} is an odd request.. out of ${bootCampZ.length}`, 404)
        );
    }
    res.status(200)
        .json({
            success: true,
            msg: `Updated BootCamp ${req.params.id}`,
            data: bootCamp
        });

});

// @desc Delete a single BootCamp               D
// @route Get /api/v1/bootcamps/:id             D
// @access Private                              D
exports.deleteBootCamp = asyncHandler(async (req, res, next) => {
    let bootCampZ = await BootCamp.find();
    const bootCamp = await BootCamp.findByIdAndDelete(req.params.id);
    if (!bootCamp) {
        return next(
            new ErrorResponse(`DELETE BootCamp by ID ${req.params.id} is an ODDITY not found in this database ${bootCampZ.length}`, 404)
        );
    }
    res.status(200)
        .json({
            success: true,
            msg: `Deleted BootCamp by ID ${req.params.id} out of ${bootCampZ.length} remaining`,
            data: bootCamp
        });
});