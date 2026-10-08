require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use('/auth', require('./routes/auth'));
app.use('/complaints', require('./routes/Complaints'));   // ← new line
app.use('/quiz', require('./routes/quiz'));   // ← new line
app.listen(5000, () => console.log("Server running on port 5000"));