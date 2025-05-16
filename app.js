const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/study_planner', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(session({
    secret: 'study-planner-secret',
    resave: false,
    saveUninitialized: true
}));

// Task Schema
const Task = mongoose.model('Task', {
    title: String,
    description: String,
    dueDate: Date
});

// Routes
app.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.render('index', { tasks });
});

app.get('/pomodoro', (req, res) => {
    res.render('pomodoro');
});

app.post('/add-task', async (req, res) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate
    });
    await task.save();
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
