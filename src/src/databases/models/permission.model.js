const { connectDB } = require("../connection");
const Permissions = require('../schemas/permissions.schema');

class PermissionModel {
  static findByRole = async (id) => {
    try {
      await connectDB();
      const permissions = await Permissions.findOne({"profile": id}).lean();
      return permissions;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = PermissionModel;
