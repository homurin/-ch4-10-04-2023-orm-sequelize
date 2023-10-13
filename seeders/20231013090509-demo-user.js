"use strict";
const bcrypt = require("bcrypt");
const saltRounds = 10;
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Users", [
      {
        name: "Peter Griffin",
        age: 35,
        address: "lamongan",
        role: "Owner",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Lois Griffin",
        age: 30,
        address: "garut",
        role: "Owner",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Megatron Griffin",
        age: 17,
        address: "solo",
        role: "Owner",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Chris Griffin",
        age: 12,
        address: "surabaya",
        role: "Owner",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Stewie Griffin",
        age: 5,
        address: "lamongan",
        role: "Owner",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Brian Griffin",
        age: 5,
        address: "lamongan",
        role: "Staff",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    queryInterface.bulkInsert("Auths", [
      {
        userId: 1,
        email: "peter@gmail.com",
        password: bcrypt.hashSync("griffin123456", saltRounds),
        confirmPassword: bcrypt.hashSync("griffin123456", saltRounds),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        email: "louis@gmail.com",
        password: bcrypt.hashSync("griffin123456", saltRounds),
        confirmPassword: bcrypt.hashSync("griffin123456", saltRounds),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        email: "megatron@gmail.com",
        password: bcrypt.hashSync("griffin123456", saltRounds),
        confirmPassword: bcrypt.hashSync("griffin123456", saltRounds),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 4,
        email: "chris@gmail.com",
        password: bcrypt.hashSync("griffin123456", saltRounds),
        confirmPassword: bcrypt.hashSync("griffin123456", saltRounds),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 5,
        email: "stewie@gmail.com",
        password: bcrypt.hashSync("griffin123456", saltRounds),
        confirmPassword: bcrypt.hashSync("griffin123456", saltRounds),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 6,
        email: "brian@gmail.com",
        password: bcrypt.hashSync("griffin123456", saltRounds),
        confirmPassword: bcrypt.hashSync("griffin123456", saltRounds),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
