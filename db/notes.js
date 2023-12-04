// Module 11 Instructor 15 Body Parsing, gives each note saved an id that's randomized
const uuid = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
};

const notes = [
    {
        title: 'Groceries',
        text: 'eggs, milk, cheese',
        note_id: uuid(),
    }
]

module.exports = notes;