const jwt = require('jsonwebtoken');

let token = {

    //Generate access token
    generateAccessToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin
            },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: '5s' },
        );
    },

    //Generate access token
    generateRefreshToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin
            },
            process.env.JWT_REFRESH_KEY,
            { expiresIn: '365d' },
        );
    }

}

module.exports = token;