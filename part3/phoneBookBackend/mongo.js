const mongoose = require("mongoose");

if (process.argv.length < 3) {
    console.log("give password as an argument");
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://jayant:${password}@cluster0.g4u9r3o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
    console.log('phonebook:');
    Person.find({}).then(result => {
        result.forEach(person => {
            const { name, number } = person;
            console.log(name + ' : ' + number);
            mongoose.connection.close();
        })
    })
}

else {
    const name = process.argv[3];
    const number = process.argv[4];

    const person = new Person({ name, number });

    person.save().then(() => {
        console.log(`added ${name} number ${number} to phonebook`);
        mongoose.connection.close();
    })
}