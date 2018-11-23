var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
const db = require('./config/db');

const clientRoutes = require('./routes/clients/clients');
// const categoriesRoutes = require('./routes/categories/categories');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());

app.use('/clients', clientRoutes);
// app.use('/categories', categoriesRoutes);





var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})

