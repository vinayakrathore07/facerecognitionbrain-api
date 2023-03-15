const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
client: 'pg',
  connection: {
    host: 'dpg-cg5ba2bhp8u9l20imja0-a',
    port: 5432,
    database: 'facerecogniton_db',
    user: 'vinayak_rathore07',
    password: 'NEbL4K2wiPWSeJTn4sdegzkTG3CEnps6',
    ssl: true
  }
});

const app = express();

app.use(cors())
app.use(express.json());

app.get('/', (req, res)=> {
	res.send('it is working!' )
})


app.post('/signin', signin.handleSignin(req, res, db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})
app.listen(process.env.PORT || 3000,()=>{
	console.log('app is running on port ${process.env.PORT}');
})

