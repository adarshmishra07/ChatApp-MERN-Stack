const express = require("express");
const dotenv = require("dotenv");
const passport = require("passport");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const session = require("express-session");
var cors = require("cors");

//Load Config
dotenv.config({ path: "./config/config.env" });

// passport config
require("./config/passport")(passport);

connectDB();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/',require('./routes/Index'))
app.use('/auth',require('./routes/auth'))

//Port & Server Config
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
