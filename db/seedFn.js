const { sequelize } = require("./db");
const { User } = require("./");
const users = require("./seedData");
const bcrypt = require("bcrypt");

const seed = async () => {
  await sequelize.sync({ force: true }); // recreate db
  await User.bulkCreate(users);
  await Promise.all(
    users.map(async (user) => {
      const SALT_LENGTH = 10;
      const hashedPassword = await bcrypt.hash(user.password, SALT_LENGTH);
      user.password = hashedPassword;
    })
  );
};

// async function hashPassword() {
//   const SALT_LENGTH = 10;
//   const users = await User.findAll();
//   await Promise.all(
//     users.map(async (user) => {
//       const hashedPassword = await bcrypt.hash(user.password, SALT_LENGTH);
//       user.password = hashedPassword;
//     })
//   );
// }

module.exports = seed;
