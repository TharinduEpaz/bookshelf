const CustomError = require("../errors")
const {isTokenValid} = require('../utils/jwt')

const authenticateUser = async (req,res,next) => {
    const token = req.signedCookies.token;

    try {
        if(token){
            const payload = isTokenValid(token)
            req.user = payload.user
            console.log(req.user);
        }
        else{
            throw new CustomError.UnauthenticatedError('Authentication invalid')
        }
        
    } catch (error) {
        next(error)
    }

    next()

}
const authPermissions = (...rest)=> {
    return (req,res,next) => {
        if(!rest.includes(req.user.role)){
            throw new CustomError.UnauthorizedError('Unauthorized')
        }
        next()
    }
}

module.exports = {authenticateUser, authPermissions}