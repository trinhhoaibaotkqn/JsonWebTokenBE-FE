const { findById } = require('../model/User');
const User = require('../model/User');

class UserController {

    getAllUsers = async (req, res) => {
        try {
            const listUsers = await User.find();
            res.status(200).json(listUsers);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    deleteUser = async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            res.status(200).json('Delete succcessfully')
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = new UserController;