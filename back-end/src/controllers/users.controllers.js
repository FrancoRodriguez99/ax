const User = require("../models/user");
const Address = require("../models/address");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// ------ register ------
const singUp = async (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res.status(409).json({ message: "Email already exists" });
      } else {
        // Hash password and create new user
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({ error: err });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              name: req.body.name,
            });
            user
              .save()
              .then((result) => {
                res.status(201).json({ message: "User created successfully" });
              })
              .catch((error) => {
                res.status(500).json({ error: error });
              });
          }
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

// ------ login ------
const signIn = async (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      console.log(user);
      if (!user) {
        return res.status(401).json({ message: "email" });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        console.log(result);
        if (err) {
          return res.status(401).json({ message: "pass" });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user.email,
              userId: user._id,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "1h",
            }
          );
          return res.status(200).json({ message: "ok", data: { token, user } });
        }
        return res.status(401).json({ message: "conection" });
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    });
};

const googleLogIn = async (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        const token = jwt.sign(
          {
            email: user.email,
            userId: user._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        return res.status(200).json({ message: "Authentication successful", data: { token, user } });
      } else {
        // Hash password and create new user
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({ error: err });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              name: req.body.name,
              avatar: req.body.avatar,
            });
            user
              .save()
              .then((result) => {
                const token = jwt.sign(
                  {
                    email: user.email,
                    userId: user._id,
                  },
                  process.env.JWT_SECRET,
                  {
                    expiresIn: "1h",
                  }
                );
                return res.status(200).json({ message: "Authentication successful", data: { token, user: { email: user.email, id: user._id, name: user.name, avatar: user.avatar } } });
              })
              .catch((error) => {
                res.status(500).json({ error: error });
              });
          }
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};
const address = async (req, res) => {
  try {
    const a = await Address.find({ user: req.params.id });
    res.status(200).json(a);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

const addressadd = async (req, res) => {
  try {
    const newAddress = new Address({
      _id: new mongoose.Types.ObjectId(),
      title: req.body.title,
      address: req.body.address,
      tel: req.body.tel,
      user: req.params.id,
    });
    await newAddress.save();
    await User.updateMany({ _id: { $in: req.params.id } }, { $push: { address: newAddress._id } });

    res.status(201).json({ message: "ok" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error" });
  }
};

const changeAddres = async (req, res) => {
  try {
    await Address.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: "ok" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error" });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const deletedAddress = await Address.findOneAndDelete({ _id: req.params.id });
    await User.updateOne({ _id: deletedAddress.user }, { $pull: { address: deletedAddress._id } });
    res.status(200).json({ message: "ok" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error" });
  }
};

const editUser = async (req, res) => {
  try {
    let mody = {};

    if (req.body.name) mody.name = req.body.name;
    if (req.body.email) mody.email = req.body.email;
    if (req.body.avatar) mody.avatar = req.body.avatar[0];

    await User.findByIdAndUpdate(req.params.id, mody);
    res.status(200).json({ message: "ok" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error" });
  }
};

const getProfile = async (req, res) => {
  try {
    const a = await User.findById(req.params.id).populate("bills");
    res.status(201).json(a);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};

module.exports = { singUp, signIn, googleLogIn, address, addressadd, changeAddres, deleteAddress, editUser, getProfile };
