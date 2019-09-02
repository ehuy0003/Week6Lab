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
            col = db.collection("tasks");
        }
    }
);

// Homepage 
app.get('/', (req,res) => {
    console.log('Welcome to my ToDo Application!!!')
    res.render('index.html')
})

// POST REQUEST - Adding new task
app.post('/index', (req, res) => {
    console.log('POST recieved')
    let taskDetails = req.body;

    col.insertOne({
        id: "" + Math.floor(100000 + Math.random() * 900000),
        name: taskDetails.taskName,
        assigned: taskDetails.taskHandler,
        due: taskDetails.taskDetails,
        status: taskDetails.taskDetails,
        description: taskDetails.taskDes,
    })
    
    res.render('index.html')
    db.push(req.body)
})

app.get('/getall', (req,res) => {
    console.log("Display lists of tasks!!!")

    let query = {};
    col.find(query).sort({name:1, status:-1}).toArray(function(err,data){
        res.send(data);
    })

    res.render('getall.html',{ar:db})
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

