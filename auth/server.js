const bcrypt = require("bcryptjs");
const router = require("express").Router();

let jwt = require('jsonwebtoken');
let restricted = require('./middleware/restricted.js');
let generateToken = require("./generateToken.js");

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
                // req.session.session_name =  a_user.username;
                // req.session.userid = a_user.userid;
                // console.log(req.session);
                const token = generateToken(a_user)
                res.status(200).json({message: `Welcome ${a_user.username}`,
                token})

                // res.send({message: "We've logged in."});
            }
            else {
                res.status(500).json({message: 'Invalid Credentials'});
            }


        }
        
    )
    .catch(error => {
        res.status(401).json({errorMessage: "We had trouble retrieving the user you wanted."})
    })
    
})

// restrict access to this endpoint to users that only provide the right credentials in the headers
// https://flaviocopes.com/express-headers/
router.get("/users", restricted,(req,res) => {
    Users.get()
         .then( users => res.status(200).json(users))
         .catch(error => res.status(500).json({errorMessage: "We could not retrieve user data."}) ) 
})

module.exports = router; 