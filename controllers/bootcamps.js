// @desc    Create a new BootCamp
// @route   POST /api/v1/bootcamps
// @access  Private
exports.createBootCamp = (req, res, next) => {
    res
        .status(200)
        .json({ success: true, msg: `Creat new BootCamp` });
};

// @desc    Read all BootCamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootCamps = (req, res, next) => {
    res
        .status(200)
        .json({ success: true, msg: 'Show all BootCamps' });
};

// @desc    Read a single BootCamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootCamp = (req, res, next) => {
    res
        .status(200)
        .json({ success: true, msg: `GET BootCamp ${req.params.id}` });
};

// @desc    Update a single BootCamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateBootCamp = (req, res, next) => {
    res
        .status(200)
        .json({ success: true, msg: `Update BootCamp ${req.params.id}` });
};

// @desc Delete a single BootCamp
// @route Get /api/v1/bootcamp/:id
// @access Private
exports.deleteBootCamp = (req, res, next) => {
    res
        .status(200)
        .json({ success: true, msg: `Delete BootCamp ${req.params.id}` });
};