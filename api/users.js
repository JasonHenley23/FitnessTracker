/* eslint-disable no-useless-catch */
const express = require("express");
const { getAllUsers } = require("../../JuiceBox1/db");
const { getUserByUsername, getAllRoutinesByUser, getUserById, getPublicRoutinesByUser, getAllRoutines } = require("../db");
const router = express.Router();
const JWT = require("jsonwebtoken");


// POST /api/users/register
router.post(`/register`, async (req, res, next) => {
    try {
    
    const {
        username,
        password
    } = req.body;

    if (!username || !password) {
        next({message: "Provide a username and password"})
        return;
    }
    const user = await getUserByUsername(username);
    console.log(user);
    if (user) {
        next({message: "user not found"})
        
    }
    
    if (user.password !== password) {
        next({message: "Invalid credentials provided"});
        return;
    }
    delete user.password;
    const token = JWT.sign({id: user.id, username: user.username}, process.env.JWT_SECRET);
    res.send({message: "you're logged in!", user, token});
    }


catch (err) {
    next (err);
}
});


// POST /api/users/login
router.post(`/login`, async (req, res, next) => {
    try {
    
    const {
        username,
        password
    } = req.body;

    if (!username || !password) {
        next({message: "Provide a username and password"})
        return;
    }
    const user = await getUserByUsername(username);
    if (!user) {
        next({message: "user not found"})
        
    }
    
    if (user.password !== password) {
        next({message: "Invalid credentials provided"});
        return;
    }
    delete user.password;
    const token = JWT.sign({id: user.id, username: user.username}, process.env.JWT_SECRET);
    res.send({message: "you're logged in!", user, token});
    }


catch (err) {
    next (err);
}
});


// GET /api/users/me
router.get(`/`, async (req, res, next) => {
    try {
        const user = await getUserById();

        if (req.user) {
            const userData = await 
        }
        else res.send(
            user
        );
    } catch (error) {
        next (error);
    }
})


// GET /api/users/:username/routines
router.get(`/:username/routines`, async () => {
    try {

        const myData = async () => {

            try {
              const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/:username/routines`, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${TOKEN_STRING_HERE}`
                },
              });
              const result = await response.json();
              console.log(result);
              return result
            } catch (err) {
              console.error(err);
            }
          }
        }
    });

    //     const {
    //          username
    //     } = req.params;

    //     const userRoutines = await getPublicRoutinesByUser({username});
        
    //     if (req.user) {
    //         const allRoutines = getAllRoutinesByUser({username})
    //         res.send(
    //             allRoutines
    //         )
    //     }
    //     else {
    //         res.send(
    //             userRoutines
    //         )
    //     }

    // } catch (err) {
    //     next (err);
    // }



module.exports = router;
