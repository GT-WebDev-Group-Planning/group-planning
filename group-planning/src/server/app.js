require("dotenv").config({ path: '.env.local' });
const axios = require("axios");
const cookieParser = require("cookie-parser");

const process = require("process");
const { google } = require("googleapis");

const express = require("express");
const cors = require("cors");
const app = express();

const jwt = require('jsonwebtoken');
const jwtSecret = process.env.SECRET;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
)

const calendar = google.calendar({
    version : "v3",
    auth : process.env.GOOGLE_CALENDAR_API
  })
  
  const scopes = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.events'
  ];

  app.get('/google', (req, res) => {
    const url = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: scopes
    });
  
    res.redirect(url);
  });

  app.get('/redirect', async (req, res) => {
    try {
      const code = req.query.code;
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);
  
      const { data } = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                'Authorization': `Bearer ${tokens.access_token}`
            }
        });
      
        const token = jwt.sign({ data, tokens }, jwtSecret);
      res.cookie('jwt', token, { httpOnly: true }).redirect('http://localhost:3000/CalendarSelect');

      // const calendars = await listCalendars(oauth2Client);
      // res.cookie('userEmail', data.email).redirect(`http://localhost:3000/CalendarSelect?calendars=${JSON.stringify(calendars)}`);

    } catch (error) {
      console.log(error);
      res.status(500).send("Unable to save user");
    }
  });

  app.get('/api/calendars', async (req, res) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, jwtSecret);
        const { data, tokens } = decoded;
        oauth2Client.setCredentials(tokens);
        const calendars = await listCalendars(oauth2Client);
        res.json(calendars);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Unable to fetch calendar data" });
    }
  });

  async function listCalendars(auth) {
    const calendar = google.calendar({ version: 'v3', auth });
    const calendarList = await calendar.calendarList.list();
    const calendars = calendarList.data.items;
  
    if (!calendars || calendars.length === 0) {
      console.log('No calendars found.');
      return [];
    }
  
    const calendarData = calendars.map((calendar) => ({
      id: calendar.id,
      summary: calendar.summary,
    }));
  
    return calendarData;
  }

  const port = process.env.PORT || 5000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();