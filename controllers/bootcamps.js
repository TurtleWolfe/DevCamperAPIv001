const BootCamp = require('../models/BootCamp');

// @desc    Create a new BootCamp
// @route   POST /api/v1/bootcamps
// @access  Private
exports.createBootCamp = async (req, res, next) => {

    try {
        const bootCamp = await BootCamp.create(req.body);
        // console.log(req.body);
        res
            .status(201)
            .json({
                success: true,
                msg: `Created a new BootCamp`,
                data: bootCamp,
            });
    } catch (error) {
        res
            .status(400)
            .json({
                success: false,
                msg: `are you sure that name is unique?`,
                // data: bootCamp,
            });
    }

};

// @desc    Read all BootCamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootCamps = async (req, res, next) => {
    try {
        const bootCamps = await BootCamp.find();
        if (!bootCamps) {
            return res
                .status(400)
                .json({
                    success: false,
                    msg: `GET BootCamp by ID ${req.params.id} is an odd request, ain't it?`,
                    // data: bootCamp,
                });
        }
        res
            .status(200)
            .json({
                success: true,
                count: bootCamps.length,
                msg: `GET all ${bootCamps.length} BootCamps`,
                data: bootCamps,
            });
    } catch (error) {
        res
            .status(400)
            .json({
                success: false,
                msg: `GET BootCamp by ID ${req.params.id} is oddly formatted for MongoID`,
                // data: bootCamps,
            });
    }
};

// @desc    Read a single BootCamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootCamp = async (req, res, next) => {
    try {
        const bootCamp = await BootCamp.findById(req.params.id);
        // console.log(req.body);
        if (!bootCamp) {
            return res
                .status(400)
                .json({
                    success: false,
                    msg: `GET BootCamp by ID ${req.params.id} is not found in this database`,
                    // data: bootCamp,
                });
        }
        res
            .status(200)
            .json({
                success: true,
                msg: `GET BootCamp by ID ${req.params.id} out of ${bootCamps.length}`,
                data: bootCamp,
            });
    } catch (error) {
        res
            .status(400)
            .json({
                success: false,
                msg: `GET BootCamp by ID ${req.params.id} is an odd request..`,
                // data: bootCamp,
            });
    }
};

// @desc    Update a single BootCamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateBootCamp = async (req, res, next) => {
    try {
        const bootCamp = await BootCamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!bootCamp) {
            return res
                .status(400)
                .json({
                    success: false,
                    msg: `PUT BootCamp by ID ${req.params.id} is not found in this database`,
                });
        }
        res
            .status(200)
            .json({
                success: true,
                msg: `Update BootCamp ${req.params.id}`,
                data: bootCamp
            });
    } catch (error) {
        res
            .status(400)
            .json({
                success: false,
                msg: `PUT BootCamp by ID ${req.params.id} is an ODDITY not found in this database`,
            });
    }
};

// @desc Delete a single BootCamp
// @route Get /api/v1/bootcamp/:id
// @access Private
exports.deleteBootCamp = async (req, res, next) => {
    try {
        const bootCamp = await BootCamp.findByIdAndDelete(req.params.id);

        if (!bootCamp) {
            return res
                .status(400)
                .json({
                    success: false,
                    msg: `DELETE BootCamp by ID ${req.params.id} is not found in this database`,
                });
        }
        res
            .status(200)
            .json({
                success: true,
                msg: `Deleted BootCamp by ID ${req.params.id}`,
                data: bootCamp
            });
    } catch (error) {
        res
            .status(400)
            .json({
                success: false,
                msg: `DELETE BootCamp by ID ${req.params.id} is an ODDITY not found in this database`,
            });
    }
};