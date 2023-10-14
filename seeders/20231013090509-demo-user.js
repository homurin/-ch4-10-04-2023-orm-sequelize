"use strict";
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { User, Auth } = require("../models");

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
    const userArr = [
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
    ];
    const users = await User.bulkCreate(userArr);
    const auths = users.map((el) => {
      const email = el.name.split(" ")[0] + "@gmail.com";
      const hashedPassword = bcrypt.hashSync("griffin123456", saltRounds);
      return {
        userId: el.id,
        email: email.toLowerCase(),
        password: hashedPassword,
        confirmPassword: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });
    console.log(auths);
    queryInterface.bulkInsert("Auths", auths);
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
