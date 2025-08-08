const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require("./routes/userRoute");
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const URI = "mongodb+srv://admin:admin@blog.v0kpkyu.mongodb.net/Blog?retryWrites=true&w=majority&appName=Blog"

//Local modules
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());
const PORT = 3000;

app.use('/api', userRoute);

// app.use(session ({
//   secret: '1234',  
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     httpOnly: true,
//     secure: false, 
//     maxAge: 24 * 60 * 60 * 1000 
//   }
// }));

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

