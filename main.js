// Imports
const cellParser = require('./cellParser');

// Read in CSV data
const filePath = './resources/cells.csv'
const parser = new cellParser(filePath);

// Output
console.log("Average phone weight: " + parser.getAvgWeight() + "\n");
console.log("Oem with highest average phone weight: " + parser.getHighestAvgOemWeight() + "\n");
console.log("Average display size: " + parser.getAvgSize() + "\n");

