import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

export const sign_up = async (req, res, next) => {

    try {    
        let { userName, email, password, confirmPassword } = req.body;
        userName = userName.trim();
        email = email.trim();
        password = password.trim();
        confirmPassword = confirmPassword.trim();
        if (userName == '' || email == '' || password == '' || confirmPassword == '') {
            res.json({
              status: 'FAILED',
              message: 'empty input fields',
            });
        }else if (password !== confirmPassword) {
            res.json({
              status: 'FAILED',
              message: 'passwords do not match',
            });
          } else if (!/^[a-zA-Z ]*$/.test(userName)) {
            res.json({
              status: 'FAILED',
              message: 'invalid userName entered',
            });
          } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            res.json({
              status: 'FAILED',
              message: 'invalid email entered',
            });
          } else if (password.length < 8) {
            res.json({
              status: 'FAILED',
              message: 'password entered is too short',
            });
          } 
      // encrypting the password
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      //using spread operator to take every properties
      const newUser = new User({ userName,email, password: hash });
      //saving a new details in mongoDB
      await newUser.save();
      res.status(200).send('user has been created');
    } catch (err) {
      next(err);
    }
  };

export const login = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) return next(createError(404, 'User not found'));
      //comparing a password to check if it exists or correct
      const isCorrect = await bcrypt.compare(req.body.password, user.password);
      if (!isCorrect) return next(createError(400, 'Wrong credentials'));
      // creating my token
      // take our id from mongo and create token and send it to user after login
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      const { password, ...others } = user._doc;
      res
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .status(200)
        .json(others);
    } catch (err) {
      next(err);
    }
  };
  export const googleAuth = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT);
        res
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .status(200)
          .json(user._doc);
      } else {
        const newUser = new User({
          ...req.body,
          fromGoogle: true,
        });
        const savedUser = await newUser.save();
        const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
        res
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .status(200)
          .json(savedUser._doc);
      }
    } catch (err) {
      next(err);
    }
  };

  export const sign_out = (req, res, next) => {
    res.clearCookie('access_token');
    res.status(200).send('user has been signed out');
  };
