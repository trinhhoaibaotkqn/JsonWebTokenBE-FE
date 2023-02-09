const { findById } = require('../model/User');
const User = require('../model/User');

class UserController {

    getAllUsers = async (req, res) => {
        try {
            const listUsers = await User.find().select('username email admin');
            res.status(200).json({
                errCode: 0,
                message: "Get list users successfully",
                listUsers
            });
        } catch (err) {
            res.status(500).json(err);
        }
    }

    deleteUser = async (req, res) => {
        try {
            const user = await User.findOne({ _id: req.params.id });
            res.status(200).json({
                errCode: 0,
                message: 'Delete succcessfully',
            })
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = new UserController;