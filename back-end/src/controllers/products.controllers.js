const Bebida = require("../models/bebida");
const Extra = require("../models/extra");
const Product = require("../models/product");
const Bill = require("../models/bill");

const mongoose = require("mongoose");

const addProduct = async (req, res) => {
  try {
    const newProduct = new Product({
      _id: new mongoose.Types.ObjectId(),
      title: req.body.title,
      sub_types: req.body.sub_types,
      price: req.body.price,
      img: req.body.img,
      unidad: req.body.unidad,
    });
    await newProduct.save();
    res.status(201).json({ message: "Product created successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error" });
  }
};

const addBebibda = async (req, res) => {
  try {
    const newProduct = new Bebida({
      _id: new mongoose.Types.ObjectId(),
      title: req.body.title,
      alcohol: req.body.alcohol,
      price: req.body.price,
      img: req.body.img,
      unidad: req.body.unidad,
    });
    await newProduct.save();
    res.status(201).json({ message: "Product created successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error" });
  }
};

const addExtra = async (req, res) => {
  try {
    const newExtra = new Extra({
      _id: new mongoose.Types.ObjectId(),
      title: req.body.title,
      unidad: req.body.unidad,
      product: req.body.products,
      price: req.body.price,
      img: req.body.img,
      sub_type: req.body.sub_type,
    });
    await newExtra.save();
    await Product.updateMany({ _id: { $in: req.body.products } }, { $push: { extras: newExtra._id } });

    res.status(201).json({ message: "Product created successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error" });
  }
};

const getProducts = async (req, res) => {
  try {
    const productos = await Product.find();
    res.status(201).json(productos);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};

const deleteProducts = async (req, res) => {
  try {
    const a = await Bill.deleteMany({});
    res.status(201).json(a);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};

const getProduct = async (req, res) => {
  try {
    const a = await Product.findById(req.params.id).populate("extras");
    res.status(201).json(a);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};

const getBebidas = async (req, res) => {
  try {
    const a = await Bebida.find();
    res.status(201).json(a);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};

module.exports = { addProduct, addBebibda, addExtra, getProducts, deleteProducts, getProduct, getBebidas };
