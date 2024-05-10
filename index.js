const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const userRoutes = require('./route/userRoute');
const paperRoutes = require('./route/paperRoute');
const conferenceRoutes = require('./route/conferenceRoute');
const reviewRoutes = require('./route/reviewRoute');
//const sessionRoutes = require('./route/sessionRoutes');

const app = express();

app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded());
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 * 60}})) //Teslim zamanı 1 haftaya ayarlanacak


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
    if (req.session.isLoggedIn != true)
    {
        return res.redirect('/login');
    }
    else
    {
        return res.redirect('/tum_konferanslar');
    } 
});

app.get('/login', (req, res) => {
    res.render('login'); // login.ejs dosyasını render et
});

// GET request ile register sayfasını göster
app.get('/register', (req, res) => {
    res.render('register'); // register.ejs dosyasını render et
});


app.get('/tum_konferanslar', async (req, res) => {
    let conferenceService = require('./service/conferenceService');
    const conferences = await conferenceService.getConferences();
    console.log(conferences);
    
    res.render('tum_konferanslar', { 
        conferences : conferences ,
        user : req.session.user
    });
});


app.get('/katildigim_konferanslar', async (req, res) => {
    let conferenceService = require('./service/conferenceService');
    const attendeeId = req.session.user._id;
    console.log(attendeeId);
    const conferences = await conferenceService.getConferences();
    if (!conferences) {
        throw new Error("konferans yok");
    }
    
    let conferencesOfTheUser = [];
    conferences.forEach(element => {
        if(element.attendeeList.get(attendeeId))
        {
            conferencesOfTheUser.push(element);
        }
    });

    res.render('katildigim_konferanslar', { 
        conferences : conferencesOfTheUser ,
        user : req.session.user
    });
});

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});