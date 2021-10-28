const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = {
  async index(req, res) {
    const results = await User.query();

    return res.json(results);
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.query().findById(id);

      return res.json(user);

    } catch (error) {

      next(error);
    }
  },

  async singUp(req, res, next) {

    try {
      const newUser = req.body;

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(newUser.password, salt);
      
      newUser.password = hashPassword;

      await User.query().insert(newUser);

      return res.status(201).send();

    } catch (error) {

      next(error);

    }

  },


  async updateUser(req, res, next) {
    try {
      let updateUser = req.body;

      const { id } = req.params

      await User.query().findById(id).patch(updateUser);

      updateUser = await User.query().findById(id);

      return res.send(updateUser);

    } catch (error) {
      next(error);
    }

  },

  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;

      await User.query().deleteById(id);

      return res.send();

    } catch (error) {
      next(error);
    }
  }

}
