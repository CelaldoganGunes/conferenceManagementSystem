const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./route/userRoute');
const paperRoutes = require('./route/paperRoute');
const conferenceRoutes = require('./route/conferenceRoute');
const reviewRoutes = require('./route/reviewRoute');
//const sessionRoutes = require('./route/sessionRoutes');

const app = express();

app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded());

// MongoDB bağlantısı
mongoose.connect('mongodb://localhost:27017/mydatabase').then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error', err);
});

// Routes
app.use('/user', userRoutes);
app.use('/paper', paperRoutes);
app.use('/conference', conferenceRoutes);
app.use('/review', reviewRoutes);
//app.use('/api', sessionRoutes);

// Ana sayfa
app.get('/', (req, res) => {
    res.send('Ana sayfa');
});

app.get('/login', (req, res) => {
    res.render('login'); // login.ejs dosyasını render et
});

// GET request ile register sayfasını göster
app.get('/register', (req, res) => {
    res.render('register'); // register.ejs dosyasını render et
});

let deneme = require('./service/conferenceService');

app.get('/tum_konferanslar', async (req, res) => {
    // Assume conferences is an array of objects containing conference data
    /*const conferences = [
        { name: 'Conference 1', startDate: '2024-05-10', endDate: '2024-05-12', address: 'Address 1', attended: false },
        { name: 'Conference 2', startDate: '2024-06-01', endDate: '2024-06-03', address: 'Address 2', attended: true },
        // Add more conference objects as needed
    ];*/
    const conferences = await deneme.getConferences();
    console.log(conferences);
    
    res.render('tum_konferanslar', { conferences });
});


const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});