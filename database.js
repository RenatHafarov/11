require("dotenv").config({
    path: require("path").join(__dirname, "/.env"),
  });
  const { sequelize, Sequelize } = require("./models");
  
  const withPagination = require("sequelize-pagination");
  const options = {
    methodName: "paginate", // the name of the pagination method
    primaryKey: "id", // the primary key field of the model
    oneBaseIndex: true,
  };
  
  const userModel = require("./models/user"),
 
  settingsModel = require("./models/settings");

  
  const params = [sequelize, Sequelize.DataTypes];
  
  const User = userModel(...params),
  Settings = settingsModel(...params);
 



  

  
  
  
  
  

  withPagination(options)(User);
 


  
  module.exports = {
    User,
    Settings,
   
    

  };
  