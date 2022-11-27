const express = require('express');
const bodyParser = require('body-parser');
const { render } = require('ejs');
const date = require(__dirname + '/date.js');
const mongoose = require('mongoose');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/todolistDB');

const taskSchema = new mongoose.Schema({
    name: {
        type: String
    }
});

const Task = mongoose.model('task', taskSchema);

const task1 = new Task({
    name: 'Estudar Matemática'
});

const task2 = new Task({
    name: 'Estudar Física'
});

const task3 = new Task({
    name: 'Almoçar'
});

const defaultTask = [task1, task2, task3];

app.set('view engine', 'ejs');

app.use(express.static("public"));

app.get('/', function (req, res) {
    const day = date.getDate();

    Task.find({}, function (err, items) {
        console.log(items);

        if (items.length === 0) {

            Task.insertMany(defaultTask, function (err) {

                if (err) {
                    console.log(err);
                } else {
                    console.log('Success');
                }

            });

            res.redirect('/')

        } else {
            res.render('list', { listTitle: day, newItemInput: items });
        }
    });

});

// ** Input addItem **
app.post('/', function (req, res) {
    // console.log(req.body);
    let item = req.body.newItem;

    const newTask = new Task({
        name: item
    });

    newTask.save();

    res.redirect('/');
});

app.post('/delete', function(req,res){

const checkItemId = req.body.checkbox;

// Task.deleteOne({_id: checkItemId}, function(err){
//     if(err){
//         console.log(err);
//     }else {
//         console.log('Deleted with success');
//     }
// });
    Task.findByIdAndRemove(checkItemId, function(err){
        if(err){
            console.log(err);
        }else{
            console.log('Deleted with success');
        }
    });

    res.redirect('/')
})

app.get('/work', function (req, res) {
    res.render('list', { listTitle: 'Work List', newItemInput: workItems });
});

app.get('/about', function (req, res) {
    res.render('about');
});

app.listen(3000, function () {
    console.log('Server is running on port 3000.')
});