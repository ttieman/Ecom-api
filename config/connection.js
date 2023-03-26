const Sequelize = require('sequelize'); // Import to Sequelize

//create connection to database using environment variables
require('dotenv').config(); // Import to environment variables

const sequelize = new Sequelize(
    process.env.DB_NAME,  //declaring the enviorment variables in the .env file
    process.env.DB_USER,
     process.env.DB_PASSWORD, 
     
    {
    host: 'localhost',  //declaring the host dialect and port
    dialect: 'mysql',
    port: 3306,
   }
   );

module.exports = sequelize;  //exporting sequelize as a module