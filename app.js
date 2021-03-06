const express = require('express');
const session = require("express-session")
const MongoStore = require('connect-mongo');
const mongoose = require("mongoose");
const flash = require('connect-flash');
const methodOverride = require("method-override");

const pageRoute = require("./routes/pageRoute")
const courseRoute = require("./routes/courseRoute")
const categoryRoute = require("./routes/categoryRoute")
const userRoute = require("./routes/userRoute");

mongoose.connect('mongodb://localhost/smartedu-db').then(() => {
  console.log("DB Connect!");
});

const app = express();

//Template Engine
app.set('view engine', 'ejs');

global.userIn = null;

//Middlewares
app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({mongoUrl:'mongodb://localhost/smartedu-db'})
}))
app.use(flash());
app.use((req,res,next)=>{
  res.locals.flashMessages = req.flash();
  next();
})
app.use('*',(req,res,next)=>{
  userIn = req.session.userID;
  next();
});
app.use(methodOverride('_method',{
    methods:["POST","GET"]
  })
);

app.use('/',pageRoute);
app.use('/courses',courseRoute);
app.use('/categories',categoryRoute);
app.use('/users',userRoute);
app.use('/contact',pageRoute);






const port = 3000;
app.listen(port, () => {
	console.log(`http://localhost:${port}`);
});
