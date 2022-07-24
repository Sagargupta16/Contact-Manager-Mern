const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');

const contacts = require('./routes/api/contacts');

const app = express();
const path = require('path');

// Connect Database
connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/contacts', contacts);

__dirname = path.resolve();


if (process.env.NODE_ENV === 'production') {
 app.use(express.static(path.join(__dirname,'client/build')));
 app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'));
 });
}
else{
    app.get('/', (req, res) => {
        res.send('Server is running');
    })
}
const port = process.env.PORT || 3006;

app.listen(port, () => console.log(`Server running on port ${port}`));