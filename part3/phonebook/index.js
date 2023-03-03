const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const Phonebook = require("./models/phonebook");
const { findByIdAndRemove } = require("./models/phonebook");

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
app.use(express.json());



morgan.token("tiny", function (req, res) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :tiny")
);
app.use(cors());
app.use(express.static("build"));

app.get("/api/persons", async (req, res) => {
  try {
    const phonebookList = await Phonebook.find({});
    return res.json(phonebookList);
  } catch (error) {
    console.error("getPhonebookListError", error);
    return res.status(404).json({ error: "error getting all phonebooks" });
  }
});

app.get("/info", (req, res) => {
  const current_time = new Date().toString();
  const numberPerson = persons.length;
  res.send(`Phonebook has info for ${numberPerson} people \n${current_time}`);
});

app.get("/api/persons/:personId", async (req, res, next) => {
  try {
    const result = await Phonebook.findById(req.params.personId);
    if (result) {
      res.json(result);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

app.delete("/api/persons/:personId", async (req, res, next) => {
  try {
    const result = await Phonebook.findByIdAndRemove(req.params.personId);
    if (result) {
      res.status(201).json({ message: "deleted successfully" });
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

app.post("/api/persons", async (req, res, next) => {
  const data = req.body;
  console.log("sent data is ", data);
  if (!Object.keys(data).length) {
    return res.status(404).json({ error: "content missing" });
  }
  const phonebook = new Phonebook({
    name: data.name,
    number: data.number,
  });
  try {
    const savedPhoneBook = await phonebook.save();
    res.status(201).json(savedPhoneBook);
  } catch (error) {
    next(error);
  }
});


const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return res.status(400).json({ error: "malformatted id" });
  }

  next(error);
};
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
