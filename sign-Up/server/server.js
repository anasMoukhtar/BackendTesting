express = require('express')
mongoose = require('mongoose')
require('dotenv').config()
const Client = require('./model/clients')
const URI = process.env.MONGODBURI
App = express()
App.use(express.json())
const port = 3000

mongoose.connect(URI)
.then(() => console.log('MongoDB connection established'))
  .catch((err) => console.error('MongoDB connection error:', err));
App.post('/signUp', async (req, res) => {
  try {
      const { name, email, password } = req.body;

      // Simple validation
      if (!name || !email || !password) {
          return res.status(400).send('All fields are required!');
      }

      // Check if user already exists
      const existingUser = await Client.findOne({ email });
      if (existingUser) {
          return res.status(400).send('Email is already registered!');
      }

      const client = new Client({ name, email, password });
      await client.save();
      res.status(201).send('Welcome!');
  } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
  }
});
App.get('/signUp',async (req, res) => {
  const Accounts = await Client.find()
  res.send(Accounts)
})
App.listen(port, () => {
    console.log(`Connected on port: ${port}`);
  });