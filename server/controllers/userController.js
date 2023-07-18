
const userModel = require('../models/user')

const getUsers = async (req,res) => {
    const users = await userModel.findAll();
    res.json(users)
    
}

const setUser = (req,res) => {
    res.send('setting users')
}

const updateUser = (req,res) => {
    res.send('updating users')
}


module.exports = {
    getUsers,
    setUser,
    updateUser
}