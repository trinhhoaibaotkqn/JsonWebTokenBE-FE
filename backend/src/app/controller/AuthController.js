const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const token = require('../../util/generateToken');
const Token = require('../model/Token');
const User = require('../model/User');

class AuthController {
    //[POST] REGISTER
    async register(req, res) {
        try {
            //Hash password
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
            //Create user
            const newUser = new User({
                username: req.body.username,
                password: hashed,
                email: req.body.email
            })
            //Save user
            const user = await newUser.save();
            res.status(200).json(user);

        } catch (err) {
            res.status(500).json("error");
        }
    }


    //Store token: access token -> redux store
    //             refresh token -> httponly cookies

    //[POST] LOGIN
    async login(req, res) {
        try {
            //Check username
            const user = await User.findOne({ username: req.body.username })
            if (!user) {
                return res.status(404).json("Wrong username");
            }
            //Check password(hashed)
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                return res.status(404).json("Wrong password");
            }
            //Valid username & password
            if (user && validPassword) {
                const accessToken = token.generateAccessToken(user);
                const refreshToken = token.generateRefreshToken(user);
                //Add refresh token to Database
                const newToken = new Token({ token: refreshToken });
                await newToken.save();
                //Store refresh token -> httponly cookies
                res.cookie("refreshToken", refreshToken,
                    {
                        httpOnly: true,
                        secure: false,//when deploy change to true
                        path: "/",
                        sameSite: "strict",
                    }
                )
                const { password, ...others } = user._doc;//liên quan đến mongoose
                return res.status(200).json({ others, accessToken });
            }
        } catch {
            res.status(500).json("error");
        }
    }

    //[POST] request new access token and at the same time create new refresh token
    async requestRefreshToken(req, res) {
        const user = req.user;//get user (payload) from refresh token in middle ware
        const accessToken = token.generateAccessToken(user);
        const newRefreshToken = token.generateRefreshToken(user);
        //save refresh token in database
        const newToken = new Token({ token: newRefreshToken });
        await newToken.save();
        //store refresh token in cookie
        res.cookie("refreshToken", newRefreshToken,
            {
                httpOnly: true,
                secure: false,//when deploy change to true
                path: "/",
                sameSite: "strict",
            }
        );
        res.status(200).json({ accessToken: accessToken })
    }

    async logout(req, res) {
        res.clearCookie("refreshToken");
        await Token.deleteOne({ token: req.cookies.refreshToken });
        res.status(200).json("Logged out successfully");
    }
}

module.exports = new AuthController;