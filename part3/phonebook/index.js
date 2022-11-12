const express = require("express")
const app = express()
const morgan = require("morgan")
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

app.use(express.json())
morgan.token('tiny', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :tiny"))

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
app.post("/api/persons",(req,res) => {
    const data = req.body
    const startId = Math.max(...persons.map(person => person.id))
    const randomId = Math.floor(Math.random() * 50) + startId
    const nameExist = persons.some(person => person.name === data.name)
    if(!data.name || !data.number) {
        return res.status(400).json({error:"data is missing"})
    } else if(nameExist) {
        return res.status(400).json({error:"name must be unique"})
    }
    persons = [...persons,{id:randomId,name:data.name,number:data.number}]
    res.json(persons)
})


const PORT = 3001
app.listen(PORT,  () => {
    console.log(`Server running on port ${PORT}`);
})
