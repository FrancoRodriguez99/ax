const mongoose = require("mongoose");
const Bill = require("../models/bill");
const User = require("../models/user");
const Productos = require("../models/product");
const Bebidas = require("../models/bebida");
const Extras = require("../models/extra");

require("dotenv").config();
var request = require("request");
const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

const generateBill = async (req, res) => {
  try {
    const { carro, idUser, idAddress } = req.body;
    var buyMe = [];

    var items = {
      productos: carro.productos,
      extra: carro.extras,
      bebida: carro.bebidas,
    };

    const newBill = new Bill({
      _id: new mongoose.Types.ObjectId(),
      fecha: new Date(),
      total: carro.total,
      items,
      address: idAddress,
      user: idUser,
    });

    await User.updateMany({ _id: { $in: idUser } }, { $push: { bills: newBill._id } });

    carro.productos
      .concat(carro.extras)
      .concat(carro.bebidas)
      .forEach((element) => {
        buyMe.push({
          title: element.title,
          unit_price: parseInt(element.price),
          quantity: element.quantity,
          id: element._id,
        });
      });

    var preference = {
      items: buyMe,
      auto_return: "approved",
      notification_url: "http://200.58.107.91:9000/api/mercadopago/payed",
      external_reference: newBill._id.toString(),
      back_urls: {
        success: "http://lodewalter.com.ar/order/" + newBill._id.toString(),
        pending: "http://lodewalter.com.ar/order" + newBill._id.toString(),
        failure: "http://lodewalter.com.ar/order" + newBill._id.toString(),
      },
    };

    try {
      var q = "";
      var qq = "";
      // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso

      await mercadopago.preferences
        .create(preference)
        .then((response) => {
          q = response.body.init_point;
          qq = response.body.id;
          console.log(response);
        })
        .catch((e) => console.log(e));
      newBill.type = q;
      newBill.mpid = qq;
      await newBill.save();
      res.status(200).json(q);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error" });
  }
};

const checkOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Bill.findById(id).populate("address");

    let productos = [];
    let extras = [];
    let bebidas = [];

    for (let i = 0; i < order.items.productos.length; i++) {
      const a = await Productos.findById(order.items.productos[i]._id);
      productos.push({ ...a._doc, quantity: order.items.productos[i].quantity });
    }
    for (let i = 0; i < order.items.bebida.length; i++) {
      const a = await Bebidas.findById(order.items.bebida[i]._id);
      bebidas.push({ ...a._doc, quantity: order.items.bebida[i].quantity });
    }
    for (let i = 0; i < order.items.extra.length; i++) {
      const a = await Extras.findById(order.items.extra[i]._id);
      extras.push({ ...a._doc, quantity: order.items.extra[i].quantity });
    }

    res.status(200).json({ order, productos, extras, bebidas });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error" });
  }
};

const generateBillEfectivo = async (req, res) => {
  try {
    const { carro, idUser, idAddress } = req.body;

    var items = {
      productos: carro.productos,
      extra: carro.extras,
      bebida: carro.bebidas,
    };

    const newBill = new Bill({
      _id: new mongoose.Types.ObjectId(),
      fecha: new Date(),
      total: carro.total,
      items,
      address: idAddress,
      user: idUser,
      pagado: true,
    });
    await newBill.save();
    await User.updateOne({ _id: { $in: idUser } }, { $push: { bills: newBill._id } });
    // replace the values below

    const options = {
      url: "https://graph.facebook.com/v16.0/122592924153210/messages",
      headers: {
        Authorization: "Bearer EAAQWUQCltLkBAK5q2Ac6TqvufXfsoPjmi6w2bKs1OeAzp3tpqQzqi83RZAms8gmFVM0sbytFwM3OodW85P8NhmGje9WnLRy1kHMv8J10ghL4RW0kJNtnCvlscR5s1URec53BQY8JIOmQ40rWEcyj3crrhum0KnKiT8AVZBABZBvbTCiHALG7AEwqdoAUcQMyEG5tUYuReZCpo3vjZADZAl",
        "Content-Type": "application/json",
      },
      method: "POST",
      json: {
        messaging_product: "whatsapp",
        to: "542235450046",
        type: "template",
        template: {
          name: "hello_world",
          language: {
            code: "en_US",
          },
        },
      },
    };

    res.status(200).json(newBill);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error" });
  }
};

const payed = async (req, res) => {
  try {
    const options = {
      url: `https://api.mercadopago.com/v1/payments/${req.body.data.id}/?access_token=${process.env.MP_ACCESS_TOKEN}`,
      headers: {
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
      },
    };

    request.get(options, async (error, response, body) => {
      if (error) {
        console.error(error);
        return;
      } else {
        const a = JSON.parse(body);
        if (a.status === "approved") {
          await Bill.findByIdAndUpdate(a.external_reference, { pagado: true });
        }
      }
    });

    res.status(200).json({});
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error" });
  }
};

module.exports = { generateBill, checkOrder, generateBillEfectivo, payed };
