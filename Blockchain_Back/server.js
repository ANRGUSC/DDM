const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./routes/api');

const PORT = 3000;
var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api' , api);

app.listen(PORT , function(){
  console.log('Listening to Port:' + PORT);
});

app.get('/' , function(req , res) {
  console.log('Hello World!');
});
