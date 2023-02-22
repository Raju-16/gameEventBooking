const express = require("express");
const UserModel = require("../Model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res) => {
  const { name, email, password } = req.body;
  let user;
  try {
    user = await UserModel.findOne({ email }).lean().exec();
  } catch (error) {
    return res.status(500).send({ error });
  }
  if (user) {
    return res.status(500).send("User already registered");
  }

  const newPassword = bcrypt.hashSync(password, 10);

  const userData = new UserModel({
    name,
    email,
    password: newPassword,
  });

  try {
    await userData.save();
    return res.status(200).send(userData);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  let user;
  try {
    user = await UserModel.findOne({ email }).lean().exec();
  } catch (error) {
    return res.status(500).send({ error });
  }

  if (!user) {
    return res.status(500).send("You are not registerd");
  }

  const isPasswordCorrect = bcrypt.compareSync(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(500).send("Wrong Credentials");
  }
  const token = jwt.sign({ id: user._id }, process.env.SECERET_WEB_TOKEN, {
    expiresIn: "168hrs",
  });

  return res.status(200).send({ message: "login successfull", user, token });
};

module.exports = { register, login };
