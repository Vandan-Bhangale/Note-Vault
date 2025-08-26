const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require("./routes/userRoute");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mognodbStore = require('connect-mongodb-session')(session);
require('dotenv').config();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const URI = process.env.DATABASE_URL;

const store = new mognodbStore({
  uri: URI,
  collection:'sessions'
})

//Local modules
// app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(cookieParser());
const PORT = 3000;

app.set("trust proxy", 1);  // trust first proxy (Render/Heroku/etc.)

//This session is for local development
// app.use(session ({
//   name: 'sessionId',
//   secret: process.env.SESSION_SECRET,  
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     httpOnly: true,
//     secure: false, 
//     maxAge: 24 * 60 * 60 * 1000 
//   },
//   store
// }));

//This session is for deployed version on render and vercel
app.use(session({
  name: 'sessionId',
  secret: process.env.SESSION_SECRET,  
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: true,       // ✅ always true since Render uses HTTPS
    sameSite: "none",   // ✅ needed for cross-site (Vercel -> Render)
    maxAge: 24 * 60 * 60 * 1000 
  },
  store
}));


app.use('/api', userRoute);

mongoose.connect(URI)
.then(() => {
    console.log("Database connection is successful")
    app.listen(PORT,() => {
    console.log(`Server is live on http://localhost:${PORT}`);
    });
})
.catch((err) => {
    console.log("Error while connecting to the Database.",err);
})