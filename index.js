'use strict'

require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors()); app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


const apiRouter = require('./routes/router')(app);
app.use('/assets', express.static(path.join(__dirname, '/public/app/bower_components/')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/app/index.html'));
})

app.use((req, res) => {
	res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(process.env.port, () => {
	console.log(`HostManager listening on port ${process.env.port}`);
});
