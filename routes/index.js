const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user')
const passport = require('passport')
const { isAuthenticated } = require('../passportConfig')

router.get('/', (req, res) => {
    res.render('sastoSaaman/index')
})


router.get('/register', (req, res) => {
    res.render("authenticate/register/new")
})
router.post('/register', async (req, res) => {
    const { username, email, password, contactNumber } = req.body
    try {
        const newUser = await User.create({
            username,
            email,
            password,
            contactNumber
        })
        newUser.save()
        console.log(newUser)
        console.log("New User Successfully created")
        res.redirect("/saaman")
    } catch (error) {
        res.send(error)
    }
})
router.get('/login', (req, res) => {
    res.render("authenticate/login/new")
})
router.post('/login', passport.authenticate("local", {
    failureRedirect: "/saaman/login",
    successRedirect: "/saaman"
}))

router.post('/logout', (req, res) => {
    req.logout(err => {
        if (err) {
            console.log(err);
        }
        res.redirect('/upload');
    });
});
module.exports = router