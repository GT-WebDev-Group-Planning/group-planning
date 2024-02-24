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

const createUser = require("./db/actions/createUser");
const createEvents = require('./db/actions/createEvents');

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

      const exists = await createUser(data, res);
      if (!exists) {
        res.status(500).send("Unable to save user");
      }

      const token = jwt.sign({ data, tokens }, jwtSecret);
      res.cookie('jwt', token, { httpOnly: true }).redirect('http://localhost:3000/CalendarSelect');

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

  app.get('/api/events', async (req, res) => {
    try {
        const token = req.cookies.jwt;
        const id = req.query.id;
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, jwtSecret);
        const { data, tokens } = decoded;
        oauth2Client.setCredentials(tokens);
        const events = await listEvents(oauth2Client, data.email, id);
        const exists = await createEvents(events, data.email, res);
        if (!exists) {
          res.status(500).send("Unable to save user");
        }
        res.cookie('jwt', token, { httpOnly: true }).redirect('http://localhost:3000/Groups');
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Unable to fetch event data" });
    }
  });

  async function listEvents(auth, userEmail, id) {
    const calendar = google.calendar({ version: 'v3', auth });
    if (id === userEmail) {
      id = "primary";
    }
    const res = await calendar.events.list({
      calendarId: id,
      timeMin: new Date().toISOString(),
      maxResults: 20,
      singleEvents: true,
      orderBy: 'startTime',
    });
    const events = res.data.items;
    if (!events || events.length === 0) {
      console.log('No upcoming events found.');
      return [];
    }
    return events;
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