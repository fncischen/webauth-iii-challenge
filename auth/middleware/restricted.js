let jwt = require('jsonwebtoken');

module.exports = function restricted(req, res, next) {
    // console.log(req.session);

    const token = req.headers.authorization; 

    if (token)
    // if (req.session && req.session.session_name)
    // if (username && password) {
    {
        jwt.verify(token, 'MY_SECRET_KEY'); 
    }
    else {
        res.status(500).json({errorMessage: "You need a token to access this database"})
    }
}