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
    //console.log(conferences);
    
    res.render('tum_konferanslar', { 
        conferences : conferences ,
        user : req.session.user
    });
});

app.get('/yeni_konferans',async(req,res) => {
    if (req.session.isLoggedIn != true)
    {
        return res.redirect('/login');
    }
    let attendeeList = new Map();
    res.render('yeni_konferans', {
        user : req.session.user,
        attendeeList : attendeeList
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

app.get('/olusturdugum_konferanslar', async (req, res) => {
    if (req.session.isLoggedIn != true)
    {
        return res.redirect('/login');
    }
    let conferenceService = require('./service/conferenceService');
    const attendeeId = req.session.user._id;
    const conferencesTheUserCreated = await conferenceService.getConferencesByCreatorId(attendeeId);

    res.render('olusturdugum_konferanslar', { 
        conferences : conferencesTheUserCreated ,
        user : req.session.user
    });
});

app.get('/konferans_duzenle/:konferansId', async (req, res) => {
    if (req.session.isLoggedIn != true)
    {
        return res.redirect('/login');
    }
    let conferenceService = require('./service/conferenceService');
    const attendeeId = req.session.user._id;
    const konferansId = req.params.konferansId;
    const conference = await conferenceService.getConferenceById(konferansId);

    conference.endDateString = conference.endDate.toISOString().split('T')[0];
    conference.startDateString = conference.startDate.toISOString().split('T')[0];

    conference.keys = Array.from( conference.attendeeList.keys() );
    conference.roles = Array.from( conference.attendeeList.values() );

    conference.roleNames = ["", "Attendee" , "Reviewer", "Author", "Conf Admin"];

    let userService = require('./service/userService');
    conference.attendeeNameArray = [];

    for (const key of conference.keys) {
        let user = await userService.getUserById(key);
        conference.attendeeNameArray.push(user.name);
    }
    
    res.render('konferans_duzenle', { 
        conference : conference ,
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

    let conferenceService = require('./service/conferenceService');
    const attendeeId = req.session.user._id;
    const conferencesTheUserIsAuthor = await conferenceService.getConferencesOfAttendeeWithRole(attendeeId, 3); // 3 = Author

    //console.log(conferencesTheUserIsAuthor);
    res.render("yazi_yukle",{
        user : req.session.user,
        conferences : conferencesTheUserIsAuthor
    });
});

app.get('/incelemelerim', async(req,res) => {
    if (req.session.isLoggedIn != true)
    {
        return res.redirect('/login');
    }
    const reviewService = require('./service/reviewService');
    const paperService = require('./service/paperService');
    const reviews = await reviewService.getPaperByReviewerId(req.session.user._id);

    for (const review of reviews) {
        review.paper = await paperService.getPaperById(review.paperId);
        console.log(review.paper)
    }
    res.render("incelemelerim",{
        reviews: reviews,
        user : req.session.user
    });
});

app.get('/inceleme_ekle/:reviewId',async (req,res) => {
    if (req.session.isLoggedIn != true){
        return res.redirect('/login');
    }
    const reviewService = require('./service/reviewService');
    const paperService = require('./service/paperService');    
    const review = await reviewService.getReviewById(req.params.reviewId);
    res.render("inceleme_ekle",{})
})




const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});