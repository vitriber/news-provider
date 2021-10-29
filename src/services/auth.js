const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


module.exports = {
  
  async login (req, res, next) {
    const { username, password } = req.body;
  
    const userLoggedIn = await User.query().findOne({ username: username });

    const validPassword = await bcrypt.compare(password, userLoggedIn.password);
  
    if (!userLoggedIn.username || !validPassword) {
      
      return res.status(403).send('Wrong username or password.');

    } else {

      const token = jwt.sign({id: userLoggedIn.id, admin: userLoggedIn.admin}, 'verySecret');

      return res.header('Authorization', token).send({token: token});
    }
  
  },

  authorizeLogin (req, res, next) {
    const token = req.header('Authorization');
   
    try {

      if(!token){

        next();

      } else {

        const verified = jwt.verify(token, 'verySecret');
        req.user = verified;
  
        next(); 
       
      }

    }catch (error) {
      next(error);
    }
  },

  authorizeAdmin (req, res, next) {
    const token = req.header('Authorization');
    if(!token) {
      return res.status(401).send('Invalid token.');
    }
    try {
      const verify = jwt.verify(token, 'verySecret');
      isAdmin = verify.admin;

      if(!isAdmin){
        return res.status(401).send('User does not have permission to access.');

      }
      req.user = isAdmin;

      next(); 

    }catch (error) {
      next(error);
    }
  }
}