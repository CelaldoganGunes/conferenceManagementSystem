const express = require('express');
const mongoose = require('mongoose');

//const userRoutes = require('./routes/userRoutes');
//const paperRoutes = require('./routes/paperRoutes');
const conferenceRoutes = require('./route/conferenceRoute');
//const reviewRoutes = require('./routes/reviewRoutes');
//const sessionRoutes = require('./routes/sessionRoutes');

const app = express();

app.use(express.json());

// MongoDB bağlantısı
mongoose.connect('mongodb://localhost:27017/mydatabase').then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error', err);
});

// Routes
//app.use('/api', userRoutes);
//app.use('/api', paperRoutes);
app.use('/conferences', conferenceRoutes);
//app.use('/api', reviewRoutes);
//app.use('/api', sessionRoutes);

// Ana sayfa
app.get('/', (req, res) => {
    res.send('Ana sayfa');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});