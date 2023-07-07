const express = require('express');
const router = express.Router();

// PATCH /api/routine_activities/:routineActivityId
router.patch(`/`, async (req, res, next) => {
    try {

    } catch (err) {
        next (err);
    }
})
// DELETE /api/routine_activities/:routineActivityId
router.delete(`/`, async (req,res, next) => {
    try {

    } catch (err) {
        next(err);
    }
})
module.exports = router;
