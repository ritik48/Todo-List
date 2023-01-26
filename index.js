const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Task = require('./models/task');
const methodOverride = require('method-override');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/todoApp')
    .then(() => console.log("MONGOOSE CONNECTION ESTABLISHED."))
    .catch((err) => console.log("MONGOOSE ERROR \n"+err));

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.get('/todos', async (req, res) => {
    const tasks = await Task.find({});
    console.log(tasks.length);
    res.render('showList', { tasks });
})

app.post('/todos', async (req, res) => {
    const newTask = req.body;
    const T1 = new Task(newTask);
    await T1.save();
    const tasks = await Task.find({});
    res.redirect('/todos');
})

app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const getTask = await Task.findByIdAndDelete(id);
    res.redirect('/todos');
})


app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000 ...");

})
