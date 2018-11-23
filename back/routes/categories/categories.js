const express = require('express');
const router = express.Router();
const cq = require('./categories_querys');
const db = require('../../config/db');

// categorias
router.get('/ver-categorias', async function  (req, res) {
    console.log("hola estas en ver-categorias");
    await db.connectBD();
    let resultadoDB = await cq.getCategories();
    console.log(resultadoDB);
    res.send(resultadoDB);
 })
