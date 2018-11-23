var express = require('express');
const router = express.Router();

router.get('/mostrar-productos', function (req, res) {
    res.send(productos);
    console.log('llegue'+productos);
})
 

module.exports = router;