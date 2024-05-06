const express = require('express');
const router = express.Router();
const passport = require("passport")

router.get('/', (req, res, next) => { 
    passport.authenticate('jwt', {session: false},
    (err, jwtPayload, info) => {
        // If token is invalid
        if (err || !jwtPayload)  {
            return res.status(401).json({
                message: "Session has expired. Please try again later."
            });
        }
        // Return the token if it is valid.
        return res.json(jwtPayload);
    })(req, res, next)
})

module.exports = router;
