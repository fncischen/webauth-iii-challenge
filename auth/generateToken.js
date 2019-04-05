// https://medium.com/@siddharthac6/json-web-token-jwt-the-right-way-of-implementing-with-node-js-65b8915d550e
module.exports = function generateToken(user) {
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
