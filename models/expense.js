'use strict';
module.exports = (sequelize, DataTypes) => {
  var Expense = sequelize.define('expense', {
	id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
	username: DataTypes.STRING,
	value: DataTypes.INTEGER,
	expense_info: DataTypes.TEXT,
	type: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  });

  return Expense;
};
