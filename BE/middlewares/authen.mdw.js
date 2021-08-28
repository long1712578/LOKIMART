const jwt = require('jsonwebtoken');
const authConfig = require('../config/authen.config');

module.exports = (req,res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if(token) {
        try{
            const decoded = jwt.verify(token, authConfig.secret);
            req.payload = decoded;
        next();
        }catch(e){
            return res.status(401).json({
                message: 'Invalid access token!'
              });
        }
    }else{
        return res.status(400).json({
            message: 'Access token not found!'
          });
    }
}
