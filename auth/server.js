const bcrypt = require("bcryptjs");
const router = require("express").Router();

let jwt = require('jsonwebtoken');
let config = require('./config');
let middleware = require('./middleware');

const Users = require("../data/users/usersDataModel.js");

// https://cloud.google.com/blog/products/gcp/12-best-practices-for-user-account
// https://medium.com/@paulrohan/how-bcryptjs-works-90ef4cb85bf4
// https://github.com/knownasilya/connect-session-knex

router.post("/register", (req,res) => {
    console.log(req.body + " at line 10");
    console.log("Trying to register!");
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 14);

    // use hash to override the password
    user.password = hash;

    // questions about hash 
    Users.add(user)
        .then(saved => {
            res.status(200).json(saved);
        })
        .catch(error => {
            res.status(500).json({errorMessage: "There was an error in registering your user."})
        })

})

router.post("/login", (req,res) => {

    let {username, password} = req.body;
    // or let {username, password} = req.body
     

    Users.findBy({username}).first().then(

        a_user => {
            console.log("User " +  a_user);

            if(a_user && bcrypt.compareSync(password, a_user.password)) 
            {
                req.session.session_name =  a_user.username;
                req.session.userid = a_user.userid;
                console.log(req.session);
                res.send({message: "We've logged in."});
            }
            else {
                res.status(401).json({message: 'Invalid Credentials'});
            }


        }
        
    )
    .catch(error => {
        res.status(500).json({errorMessage: "We had trouble retrieving the user you wanted."})
    })
    
})

// restrict access to this endpoint to users that only provide the right credentials in the headers
// https://flaviocopes.com/express-headers/
router.get("/users", restricted,(req,res) => {
    Users.get()
         .then( users => res.status(200).json(users))
         .catch(error => res.status(500).json({errorMessage: "We could not retrieve user data."}) ) 
})

function restricted(req, res, next) {
    // console.log(req.session);

    const token = req.headers.authorization; 

    if (token)
    // if (req.session && req.session.session_name)
    // if (username && password) {
    {
        jwt.verify(token, secret); 
    }
    else {
        res.status(500).json({errorMessage: "There was an error in making the server request."})
    }
}

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
    };

    const secret = 'MY_SECRET_KEY';
    const options = {
        expiresIn = "1d",
    };

    return jwt.sign(payload, secret, options); 
}

module.exports = router; 