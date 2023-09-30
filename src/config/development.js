require("dotenv").config();

const devConfig = {
  port: process.env.PORT || 5050,
  connectionString: process.env.DATABASE_URL,
};

module.exports = devConfig;