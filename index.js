const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const userRoutes = require('./route/userRoute');
const paperRoutes = require('./route/paperRoute');
const conferenceRoutes = require('./route/conferenceRoute');
const reviewRoutes = require('./route/reviewRoute');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public'))); // Statik dosyalar için

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 'extended: true' ile URL kodlanmış verileri doğru şekilde işle

// MongoDB bağlantısı
mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error', err);
});

// Routes
app.use('/user', userRoutes);
app.use('/paper', paperRoutes);
app.use('/conference', conferenceRoutes);
app.use('/review', reviewRoutes);

// Ana Sayfa
app.get('/', (req, res) => {
    res.render('index');
});

// Kullanıcı Giriş Sayfası
app.get('/login', (req, res) => {
    res.render('login');
});

// Kullanıcı Kayıt Sayfası
app.get('/register', (req, res) => {
    res.render('register');
});

// Konferans Oluşturma Sayfası
app.get('/create-conference', (req, res) => {
    res.render('create_conference');
});

let deneme = require('./service/conferenceService');
// Konferansları Listeleme Sayfası
app.get('/conferences', (req, res) => {
    const conferences = deneme.getConferences();
    res.render('conference',{conferences});
});

// Makale Oluşturma Sayfası
app.get('/create-paper', (req, res) => {
    res.render('create_paper');
});

// İncelemeleri Listeleme Sayfası
app.get('/reviews', (req, res) => {
    res.render('reviews');
});

// İnceleme Oluşturma Sayfası
app.get('/create-review', (req, res) => {
    res.render('create_review');
});

// Kullanıcı Profili Sayfası
app.get('/profile', (req, res) => {
    res.render('user_profile');
});

// Dashboard Sayfası
app.get('/dashboard', (req, res) => {
    res.render('user_dashboard');
});

// Yönetici Kontrol Paneli
app.get('/admin', (req, res) => {
    res.render('admin_dashboard');
});

// Sunucuyu belirlenen portta başlat
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
