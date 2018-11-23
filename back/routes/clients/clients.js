const express = require('express');
const router = express.Router();

const cq = require('./clients_querys');
const db = require('../../config/db');

var cors = require('cors');
var bodyParser = require('body-parser');

// GET METHOD
router.get('/', async function  (req, res) {
  console.log("hola estas en ver-clientes");
  await db.connectBD();
  let resultadoDB = await cq.getClients();
  console.log(resultadoDB);
  res.send(resultadoDB);
})


// POST METHOD
router.post('/agregar-cliente',async function (req, res) {
  console.log('client');
  let client = req.body;
  console.log(client);
  await db.connectBD();
  let result = await cq.addClients(client)
  // res.send('hola estas en listar-clientes');
  console.log("hola estas en listar-clientes");
  res.send(result);
})

var d = 'solo espero que de mi siempre recuerdes lo mejor, porque yo siempre tendre una sonrisa cuando recuerde cada instante que vivi contigo';

module.exports = router;