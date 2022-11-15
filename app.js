const express = require('express');
const bodyParser = require('body-parser');
const { render } = require('ejs');
const date = require(__dirname + '/date.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const tasks = ['Comprar pão', 'Estudar Química'];
const workItems = [];

app.set('view engine', 'ejs');

app.use(express.static("public"));

app.get('/', function (req, res) {

    const day = date.getDate();

    res.render('list', {
        listTitle: day,
        newItemInput: tasks
    });
});

// ** Input addItem **
app.post('/', function (req, res) {
    console.log(req.body);

    let item = req.body.newItem;

    if (req.body.list === 'Work') {
        workItems.push(item);
        res.redirect('/work');
    } else {
        tasks.push(item);
        res.redirect('/');
    }
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