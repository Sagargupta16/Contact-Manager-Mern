const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');

const contacts = require('./routes/api/contacts');

const app = express();
const path = require('path');

// Connect Database
connectDB();

app.use(cors({origin: true,Credentials: true}));

app.get('/', (req, res) => res.send('Hello world!'));

app.use('/api/contacts', contacts);

const port = process.env.PORT || 3006;


if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
 app.use(express.static('client/build'));
 app.get('*', (req, res) => {
 res.sendFile(path.join(__dirname + '/client/build/index.html'));
 });
}

app.listen(port, () => console.log(`Server running on port ${port}`));