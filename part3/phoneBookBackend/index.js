const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    },
    {
        "id": "100",
        "name": "the one that will be deleted",
        "number": "000000000000"
    }
]

const idGenerator = () => String(Math.floor(Math.random() * 1000 + 1));

app.use(cors());
app.use(express.json());
morgan.token('newPerson', function (req, res) { return JSON.stringify(req.body) });
app.use(morgan(`:method :url :status :res[content-length] - :response-time ms :newPerson`));

// Get all person
app.get("/api/persons", (req, res) => {
    res.send(persons);
})

// add new person
app.post("/api/persons", (req, res) => {
    const { name, number } = req.body;

    if (!name || !number) {
        console.log("[POST][ERR] missing content");
        return res.status(400).json({ error: 'content missing' })
    }

    if (persons.find(p => p.name === name)) {
        console.log("[POST][ERR] name already exist");
        return res.status(409).json({ error: "name must be unique" })
    }
    const person = { id: idGenerator(), name, number };
    persons = persons.concat(person);
    res.status(201).json(person);
})

// Get person by ID
app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    const person = persons.find(per => per.id === id);
    if (!person) {
        console.log("[GET][ERR] getting specific person");
        return res.status(404).send({ error: "person not found" });
    }
    res.json(person);
})

// Delete person by ID
app.delete("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    const person = persons.find(per => per.id === id);
    if (!person) {
        console.log("[DEL][ERR] person not found");
        return res.status(404).json({ error: "person not found" })
    }
    persons = persons.filter(per => per.id !== id);
    res.status(204).end();
})

app.get("/info", (req, res) => {
    const info = `<div>Phonebook has info for ${persons.length} people</div><br><div>${new Date()}</div>`
    res.send(info);
})

// TODO: update person

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})