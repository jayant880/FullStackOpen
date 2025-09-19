require("dotenv").config()
const express = require('express');
const morgan = require('morgan');
const Person = require('./model/person');

const app = express();

const PORT = process.env.PORT || 3002;

// middleware
app.use(express.static('dist'));
app.use(express.json());
morgan.token('newPerson', function (req, res) { return JSON.stringify(req.body) });
app.use(morgan(`:method :url :status :res[content-length] - :response-time ms :newPerson`));

// endpoints
// get all persons
app.get('/api/persons', (req, res) => {
    Person.find({}).then(result => {
        res.status(200).json(result);
    })
});

// save a person
app.post('/api/persons', (req, res) => {
    const { name, number } = req.body;

    if (!name || !number) {
        return res.status(400).json({ error: 'content missing' });
    }

    const person = new Person({ name, number });
    person.save().then(savedPerson => res.json(savedPerson));
});

app.put('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const { name, number } = req.body;

    Person.findById(id)
        .then(person => {
            if (!person) return res.status(404).end();
            person.number = number;
            return person.save().then(updatedPerson => res.json(updatedPerson))
        }).catch(error => next(error));
})

// get a person by id
app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    Person.findById(id).then(person => {
        person ? res.json(person) : res.status(404).end();
    }).catch(error => next(error));
});

// delete a person by id
app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    Person.findByIdAndDelete(id)
        .then(deletedPerson => {
            if (!deletedPerson) {
                return res.status(404).json({ error: 'Person not found' });
            }
            res.status(204).end();
        }).catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Error Deleting person' });
        });
});

app.get('/info', (req, res) => {
    Person.countDocuments({})
        .then(count => {
            const info = `<div>Phonebook has info for ${count} people</div><br><div>${new Date()}</div>`;
            res.send(info);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Error counting documents');
        });
});

const unknownEndpoint = (req, res) => { res.status(404).send({ error: 'unknown endpoint' }) };

const errorHandler = (error, req, res, next) => {
    console.error(error.message);
    if (error.name === 'CastError') return res.status(400).send({ error: 'malformed id' });
    next(error);
}

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log("Server is running in the server at " + PORT);
});
