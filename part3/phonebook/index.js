const express = require("express")
const app = express()
let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
]
app.get("/api/persons",(req,res) => {
    res.json(persons)
})
app.get("/info", (req,res) => {
    const current_time = new Date().toString()
    const numberPerson = persons.length
    res.send(`Phonebook has info for ${numberPerson} people \n${current_time}`)
})
app.get("/api/persons/:personId", (req,res) => {
    const person = persons.find(person => person.id === Number(req.params.personId))
    if (!person) {
        return res.status(404).json({error:"content missing"})
    } 
    res.json(person)
})
app.delete("/api/persons/:personId",(req,res) => {
    const deleteId = req.params.personId
    persons = persons.filter(person => person.id !== Number(deleteId))
    res.status(204).end()
})

const PORT = 3001
app.listen(PORT,  () => {
    console.log(`Server running on port ${PORT}`);
})