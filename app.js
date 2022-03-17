const express = require('express');
const mongoose = require("mongoose");

const pageRoute = require("./routes/pageRoute")
const courseRoute = require("./routes/courseRoute")
const categoryRoute = require("./routes/categoryRoute")
const userRoute = require("./routes/userRoute")

mongoose.connect('mongodb://localhost/smartedu-db').then(() => {
  console.log("DB Connect!");
});

const app = express();

//Template Engine
app.set('view engine', 'ejs');

//Middlewares
app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/',pageRoute);
app.use('/courses',courseRoute);
app.use('/categories',categoryRoute);
app.use('/users',userRoute);






const port = 3000;
app.listen(port, () => {
	console.log(`http://localhost:${port}`);
});
