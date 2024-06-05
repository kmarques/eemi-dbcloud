const Sequelize = require("sequelize");

const connection = new Sequelize(
  "postgres://postgres.eeapopwcyyrqytxqgjib:wmuqRmjnjcISzvYg@aws-0-eu-central-1.pooler.supabase.com:5432/postgres"
);

connection.authenticate().then(() => console.log("Database connected"));

module.exports = connection;
