const express = require("express");
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

const idGenerator = () => {
    return Math.floor(Math.random() * 1000 + 1);
}

app.use(express.json());

app.get("/api/persons", (req, res) => {
    console.log("[GET] all persons");
    res.send(persons);
})
app.post("/api/persons", (req, res) => {
    const personData = req.body;
    if (!personData.name || !personData.number) {
        console.log('[POST][ERR] missing content');
        return res.status(400).json({ error: 'content missing' });
    }
    const person = {
        id: idGenerator(),
        name: personData.name,
        number: personData.number,
    }
    console.log("[POST] Person Added successfully")
    persons = persons.concat(person);
    res.json(person);

})

app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    const person = persons.find(per => per.id === id);
    if (!person) {
        console.log("[GET][ERR] getting specific person");
        return res.status(400).send({ error: "person not found" });
    }
    console.log("[GET] getting specific person");
    res.send(person);
})

app.delete("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    const person = persons.find(per => per.id === id);
    if (!person) {
        console.log("[DEL][ERR] person not found");
        return res.status(404).send({ error: "person not found" })
    }
    console.log("[DEL] deleting id: ", id);
    persons = persons.filter(per => per.id !== id);
    res.status(204).end();
})


app.get("/info", (req, res) => {
    const info = `<div>Phonebook has info for ${persons.length} people</div><br><div>${new Date()}</div>`
    console.log("[GET] Info");
    res.send(info);
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})