const express = require('express');
const {dbConnect} = require('./utils/dbConnect');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const cors = require('cors');
const path = require('path');

require('dotenv').config();


const app = express();

app.use(express.static(path.join(__dirname, '../client/build')));


const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const startServer = () => {

    dbConnect();

    app.listen(PORT, () => {
        console.log('Server is running on port '+ PORT);
    });
}

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/posts', postRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


startServer();  
