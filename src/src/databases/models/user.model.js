const { connectDB } = require("../connection");
const User = require('../schemas/user.schema');

class UserModel {

  static findOneByColumn = async (column, value) => {
    try {
      await connectDB();
      const users = await User.findOne({[column]: value}).lean();
      return users;
    } catch (error) {
      throw error;
    }
  };

  static findAll = async (limit, offset, roles, filter = "") => {
    try {
      await connectDB();
      const users = await User.find({ active: 1 })
      .select({
        _id: 0,
        id: '$id_user',
        id_user: 1,
        names: '$firstname',
        firstname: 1,
        surnames: '$lastname',
        lastname: 1,
        email: 1,
        active: 1,
        document: '$identifier',
        identifier: 1,
        phone: 1
      })
      .sort({ id_user: -1 })
      .skip(offset)
      .limit(limit)   
      .lean();
      console.log(users);
      return users;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = UserModel;
