const { sequelize } = require("./db");
const { User } = require("./");
const users = require("./seedData");
const bcrypt = require("bcrypt");

const seed = async () => {
  await sequelize.sync({ force: true }); // recreate db
  await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
    })
  );
  await User.bulkCreate(users);
};

module.exports = seed;
