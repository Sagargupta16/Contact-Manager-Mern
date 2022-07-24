const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');

const contacts = require('./routes/api/contacts');

const app = express();
const path = require('path');

// Connect Database
connectDB();

app.use(cors({origin: true,Credentials: true}));
app.use('/api/contacts', contacts);

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
 app.use(express.static('client/build'));
 app.get('*', (req, res) => {
 res.sendFile(path.join(__dirname + '/client/build'));
 });
}

const port = process.env.PORT || 3006;


app.listen(port, () => console.log(`Server running on port ${port}`));