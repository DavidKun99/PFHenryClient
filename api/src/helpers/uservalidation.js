const { User } = require("../db.js");

module.exports = {
  getRoleId: async (role) => {
    const roleUser = await User.findOne({
      where: { name: role },
    });
    return roleUser.role_id;
  },

  getUsersProperty: (status) => {
    if (typeof status === "boolean") {
      if (status !== undefined);
      return {
        where: {
          user_status: true,
        },
      };
    }
  },

  getUserId: async (email) => {
    const userId = await User.findAll({ where: { email: email } });
    console.log("userId del validation: ", userId);
    if (userId.length === 0) {
      console.log("Email is not registered");
    } else {
      return userId;
    }
  },
};
