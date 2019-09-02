// Imports packages
let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let bodyparser = require('body-parser');
let mongodb = require('mongodb');

// Configure express
let app = express();
app.engine('html', require('ejs').renderFile);
app.set("view engine", "html");
app.listen(8080);
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/img"));
app.use(express.static(__dirname + "/css"));

// Configure MongoDB
let mongoDBClient = mongodb.MongoClient;

// Connection URL
let url = "mongodb://localhost:27017/";

// References database
let db = null;
let col = null;

//Connect to mongoDB server
mongoDBClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        if (err) {
            console.log("err", err);
        } else {
            console.log("Connected successfully to server");
            db = client.db("week6ab");
            col = db.collection("users");
        }
    }
);

// Homepage 
app.get('/', (req,res) => {
    console.log('Welcome to my ToDo Application!!!')
    res.render('index.html')
})

app.get('/newtask', (req,res) => {
    console.log("New task being added!!!")
    res.render('newtask.html')
})

// Ne
app.post('/newtask', (req, res) => {
    let taskDetails = req.body;
    console.log('POST recieved')

    db.c

    res.render('index.html')
    db.push(req.body)
})

app.get('/listtask', (req,res) => {
    console.log("Display lists of tasks!!!")
    res.render('listtask.html',{ar:db})
})

app.get('/deletetaskID', (req,res) => {
    console.log("Deleted task ID!!!")
    res.render('deletetaskID.html')
})

app.get('/deletetaskALL', (req,res) => {
    console.log("Deleted all completed task!!!")
    res.render('deletetaskALL.html')
})

app.get('/updatetask', (req,res) => {
    console.log("Task updated!!!")
    res.render('updatetask.html')
})

