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

app.get('/cikis', (req, res) => {
    if (req.session.isLoggedIn != true)
    {
        return res.redirect('/login');
    }
    req.session.destroy((err) => {
        if (err) {
            console.error('Oturum sonlandırma hatası:', err);
            res.status(500).send('Oturum sonlandırma hatası');
        } else {
            // Kullanıcıyı giriş sayfasına yönlendir
            res.redirect('/login'); // Örnek: Giriş sayfasının adresi
        }
    });
});

app.get('/tum_konferanslar', async (req, res) => {
    if (req.session.isLoggedIn != true)
    {
        return res.redirect('/login');
    }

    let conferenceService = require('./service/conferenceService');
    const conferences = await conferenceService.getConferences();
    
    res.render('tum_konferanslar', { 
        conferences : conferences ,
        user : req.session.user
    });
});


app.get('/katildigim_konferanslar', async (req, res) => {
    if (req.session.isLoggedIn != true)
    {
        return res.redirect('/login');
    }
    let conferenceService = require('./service/conferenceService');
    const attendeeId = req.session.user._id;
    const conferencesTheUserAttended = await conferenceService.getConferencesByAttendeeId(attendeeId);

    res.render('katildigim_konferanslar', { 
        conferences : conferencesTheUserAttended ,
        user : req.session.user
    });
});

app.get('/yazilarim', async(req,res) => {
    if (req.session.isLoggedIn != true)
    {
        return res.redirect('/login');
    }
    let paperService = require('./service/paperService');
    const papers = await paperService.getPapersByCreatorId(req.session.user._id);
    //console.log(papers);
    res.render('yazilarim', { 
        papers : papers,
        user : req.session.user
    });
});

app.get('/yazi_yukle',async(req,res) => {
    if (req.session.isLoggedIn != true)
    {
        return res.redirect('/login');
    }
    res.send("anasikim");
});

app.get('/yeni_konferans',async(req,res) => {
    if (req.session.isLoggedIn != true)
    {
        return res.redirect('/login');
    }
    res.render('yeni_konferans', {
        user : req.session.user
    });
});


const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});