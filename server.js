const express = require("express");
const path = require("path");
const app = express();
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const validation = require(path.join(__dirname, '/JS/validation.js'))
const PORT = process.env.PORT || 8080;
function onHttpStart() {
  console.log("Express http server listening on: " + PORT);
}
//handle handlebars
app.engine('hbs', exphbs({extname: '.hbs'}))
app.set()
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'html'))
//allow the index.html using js script and css style
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/css")));
app.use(express.static(path.join(__dirname, "/JS")));
app.use(express.static(path.join(__dirname, "/images")));
//send home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/html/home.html"));
});
//send roomListing page
app.get("/roomListing", (req, res) =>{
  res.sendFile(path.join(__dirname, "/html/roomListing.html"))
})
//send login page
app.get("/login", (req, res) =>{
  res.render('login', {
    data:{validation: false},
    layout: false
    })
  })
  app.post("/login", (req, res)=>{
    const errors = validation.getLoginErrors(req.body)
    if(errors.isValid){
      res.render('dashboard', {
        data : {reqData: req.body, isLogin: errors.isLogin},
        layout: 'main'
      })
     }
     else{
       res.render('login', {
         data : {errors: errors, reqData: req.body},
         layout: false
       })
     }
  })
//send registration page
app.get("/registration", (req, res) =>{
  
  res.render('registration', {
    data: {validation: false},
    layout: false
    })
})
app.post("/registration", (req, res)=>{
  //validate input
  const errors = validation.getErrors(req.body);
 if(errors.isValid){
  res.render('dashboard', {
    data : {reqData: req.body, isLogin: false},
    layout: 'main'
  })
 }
 else{
   res.render('registration', {
     data : {errors: errors, reqData: req.body},
     layout: false
   })
 }
})
//error if the page does not exist
app.use(function (req, res) {
  res.status(404).send("Page Not Found");
});
//listen on port PORT
app.listen(PORT, onHttpStart);