const express = require('express');
const router = express.Router();
const{ getAllActivities, getActivityByName, createActivity, getActivityById } = require("../db")

// GET /api/activities/:activityId/routines
router.get('/', async (req, res, next) => {
    try {
        const activityId = await getActivityById();
        res.send(
            activityId

        )
    } catch (error) {
        next (error);
    }
})
// GET /api/activities
router.get(`/`, async (req, res, next) => {
    try {
        const activities = await getAllActivities();
        res.send(
            activities
        );
    } catch (error) {
        next (error);
    }
})

// POST /api/activities
router.post(`/`, async (req, res, next) => {
    try {
        const { name, description } = req.body; 
        const existingActivity = await getActivityByName(name);
        if (existingActivity) {
            next({
                name:'not found',
                message:`An activity with name ${name} already exists`
            })
            
        } else {
            const createdActivity = await createActivity(req.body);
            if (createActivity) {
                res.send (createdActivity);
            } else {
                next ({
                    name:'failed to create',
                    message:`There was an error creating your activity`
                })
            }
        }
    } catch (error) {
        next (error);
    }
})

// PATCH /api/activities/:activityId
router.patch(`/`, async (req, res, next) => {
        try {
            
    } catch (err) {
        next (err);
    }
})

module.exports = router;
