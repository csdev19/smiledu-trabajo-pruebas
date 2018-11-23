var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
const db = require('./config/db');

const clientRoutes = require('./routes/clients/clients');
const categoriesRoutes = require('./routes/categories/categories');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());

app.use('/clients', clientRoutes);
app.use('/categories', categoriesRoutes);


app.get('/mostrar-cliente', function (req, res) {
   
   res.send(data);
   console.log('llegue'+data);
})

app.get('/ver-clientes', async function  (req, res) {
   console.log("hola estas en ver-clientes");
   await db.connectBD();
   let resultadoDB = await getClients();
   console.log(resultadoDB);
   res.send(resultadoDB);
})


app.get('/mostrar-productos', function (req, res) {
   res.send(productos);
   console.log('llegue'+productos);
})



// POST METHOD
app.post('/agregar-cliente',async function (req, res) {
   console.log('client');
   let client = req.body;
   console.log(client);
   await connectBD();
   let result = await addClients(client)
   // res.send('hola estas en listar-clientes');
   console.log("hola estas en listar-clientes");
   res.send(result);
})


// categorias
app.get('/ver-categorias', async function  (req, res) {
   console.log("hola estas en ver-categorias");
   await connectBD();
   let resultadoDB = await getCategories();
   console.log(resultadoDB);
   res.send(resultadoDB);
})


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})



function connectBD() {
   let bd = require('./database.json');
   let __database = 'comercio';
   let bd_user = bd.user;
   let bd_host = bd.host;
   let bd_port = bd.port;
   let bd_pass = bd.pass;
   if(!global.pgpromise) {
      global.pgpromise = require("pg-promise")({
            noWarnings : false
      });
   }
   let __conexion = 'postgres://'+bd_user+':'+bd_pass+'@'+bd_host+':'+bd_port+'/'+__database;
   if(global.dbp) {
      let connString = global.dbp.$pool.options.connectionString;
      if(!connString.includes(__database) || global.dbp.$pool.ending ) {
         global.dbp = pgpromise(__conexion);
      }
   } else {
      global.dbp = pgpromise(__conexion);
   }
}


function getClients() {
   return new Promise((resolve, reject) => {
       let sql = `
         SELECT *
         FROM clientes`;
       global.dbp.any(sql)
         .then(res => {
           return resolve(res);
         }).catch(err => {
           return reject(err);
       });
   });
}


function getCategories() {
   return new Promise((resolve, reject) => {
       let sql = `SELECT *
                    FROM categorias`;
       global.dbp.any(sql)
         .then(res => {
           return resolve(res);
         }).catch(err => {
           return reject(err);
       });
   });
}

function addClients(cliente) {
   console.log('llamaste a addclient');
   console.log(cliente);
   return new Promise((resolve, reject) => {
       let sql = `INSERT INTO public.clientes(
                     nombres, apellidos, fecha_nacimiento, correo, direccion)
                     VALUES ($1, $2, $3, $4, $5);`;
       global.dbp.none(sql, [cliente['nombre'], cliente['apellido'], cliente['fecha_nac'], cliente['correo'], cliente['direccion']])
         .then(res => {
         //   return resolve(res);
            // ahora deberiamos decir si funciono 
            console.log('funciono'+res);
            return 'Funciono';
         }).catch(err => {
         //   return reject(err);
            console.log(err);
            return 'Hubo un error';
         });
   });
}