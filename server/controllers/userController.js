
    

const getUsers = (req,res) => {
    res.send('getting users')
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