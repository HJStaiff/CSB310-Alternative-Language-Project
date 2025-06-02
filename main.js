// Imports
const cellParser = require('./cellParser');

// Read in CSV data
const filePath = './resources/cells.csv'
const parser = new cellParser(filePath);

// Display data.
for (let i = 0; i < parser.cells.length; i++) {
    console.log(parser.cells[i].toString() + '\n');
}

console.log(parser.cells.length);

