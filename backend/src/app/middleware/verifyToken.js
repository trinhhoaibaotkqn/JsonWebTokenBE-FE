const jwt = require('jsonwebtoken');

const Token = require("../model/Token");

//Check access token exists or not
verifyToken = (req, res, next) => {
    const token = req.headers.token;
    if (token) {
        const accessToken = token.split(" ")[1];
        jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
            if (err) {
                return res.status(403).json("Token is not valid");//403 Forbidden bị ngăn cấm
            }
            req.user = user;//user - payload của token nếu token tồn tại
            next();
        });
    }
    else {
        res.status(401).json("You're not authenticated");//requires user authentication information
    }
}

//Check access token is admin or user is deleting
verifyTokenAndAdminAuth = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.admin) {
            next();
        }
        else {
            res.status(403).json("You're allowed delete this user");
        }
    });
}

verifyRefreshToken = async (req, res, next) => {
    //Check token in cookie
    const token = req.cookies.refreshToken;//req.cookies -- must install (cookie-parser)
    if (!token) {
        return res.status(401).json("You're not authenticated");
    }
    //Check valid token
    const objToken = await Token.findOneAndDelete({ token: token });
    if (objToken) {
        const refreshToken = objToken.token;
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if (err) {
                return res.status(403).json("Token is not valid");//403 Forbidden bị ngăn cấm
            }
            req.user = user;
            next();
        });
    }
    else {
        res.status(403).json("Token is not valid");
    }
}

module.exports = {
    verifyToken,
    verifyTokenAndAdminAuth,
    verifyRefreshToken,
}