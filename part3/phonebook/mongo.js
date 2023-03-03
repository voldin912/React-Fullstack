const mongoose = require("mongoose")

const listAllEntry = async(PhonebookModel)  => {
    let displayText = "phonebook:\n"
    try {
        const persons = await PhonebookModel.find({})
        persons.forEach(person => {
            displayText += `${person.name} ${person.number}\n`
        });
    } catch(error) {
        console.log("Error in list all entries",error);
    }
    mongoose.connection.close()
    return displayText
}

const addEntry = async(name,number,PhonebookModel) => {
    try {
        const result = await PhonebookModel.create({name:name,number:number})
        console.log(`added ${result.name} number ${result.number} to phonebook`);
    } catch (error) {
        console.log("Error in adding data entry",error);
    }
    mongoose.connection.close()
}

if(process.argv.length < 3) {
    console.log("Please provide the password as an argument: node mongo.js <password>");
    process.exit(1)
} else if(process.argv.length >= 3 && process.argv.length <=5) {
    const password = process.argv[2]
    const url = `mongodb+srv://fullstackGiao:${password}@cluster0.ziicfbb.mongodb.net/?retryWrites=true&w=majority`
    const phonebookSchema = new mongoose.Schema({
        name:String,
        number:String
    })
    const Phonebook = mongoose.model("Phonebook",phonebookSchema)
    mongoose.connect(url)
    .then(result => console.log("Database connected"))
    .catch(error => console.log("Error in connecting database",error))

    switch(process.argv.length) {
        case 3:
            listAllEntry(Phonebook)
            .then(result => console.log(result))
            break;
        case 5:
            const name = process.argv[3]
            const number = process.argv[4]
            addEntry(name,number,Phonebook)
            break;
        default:
            console.log("wrong input");
            mongoose.connection.close()
    }
}


