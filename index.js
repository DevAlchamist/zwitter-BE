require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const crypto = require("crypto");
const cors = require("cors");
const JwtStrategy = require("passport-jwt").Strategy;
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const { cookieExtractor, isAuth } = require("./services/Common");

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.error("MongoDB Connection Error:", error));

const app = express();

// Apply CORS middleware
app.use(
  cors({
    origin: "https://zwitter-plum.vercel.app/",
    credentials: true, // Allow cookies to be sent back and forth
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET_KEY,
};

app.use(express.json());
app.use(cookieParser());
app.use(passport.authenticate("session"));
app.use(express.urlencoded({ extended: true }));

// Passport Local Strategy for authentication
passport.use(
  "local",
  new LocalStrategy({ usernameField: "username" }, async function (
    username,
    password,
    done
  ) {
    try {
      const user = await userModel.findOne({ username: username }).exec();
      if (!user) {
        return done(null, false, { message: "User not found" });
      }
      if (user.password !== password) {
        return done(null, false, { message: "Password Incorrect" });
      }
      const token = jwt.sign(
        { username: user.username, id: user.id },
        process.env.JWT_SECRET_KEY
      );
      done(null, {
        id: user.id,
        name: user.name,
        username,
        profileImage: user.profileImage,
        token,
      });
    } catch (error) {
      done(error);
    }
  })
);

// Passport JWT Strategy
passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await userModel.findById(jwt_payload.id);
      if (user) {
        return done(null, {
          username: user.username,
          name: user.name,
          id: user.id,
          profileImage: user.profileImage,
        });
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

// Passport serialization and deserialization
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

const userModel = require("./models/User");
const authRouter = require("./routes/Auth");
const userRouter = require("./routes/User");
const postRouter = require("./routes/Post");
const commentRouter = require("./routes/Comment");

app.use("/api/auth", authRouter);
// app.use("/api/user", isAuth(), userRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);

app.get("/", (req, res) => {
  res.json({ status: "running" });
});

app.listen(process.env.PORT, () => console.log("listening on port 8080"));
