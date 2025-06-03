// Imports
const cellParser = require('./cellParser');

// Read in CSV data
const filePath = './resources/cells.csv'
const parser = new cellParser(filePath);

// Output
console.log("Average phone weight: " + parser.getAvgWeight() + "\n");
console.log("Average display size: " + parser.getAvgSize() + "\n");
console.log("Oem with highest average phone weight: " + parser.getHighestAvgOemWeight() + "\n");
console.log("Phones announced in one year and released in another: \n" + parser.getReleasedYearDifference());
console.log("Phones with only one feature: " + parser.getOneFeature() + "\n");
console.log("Year with most launches after 1999: " + parser.getMostLaunches(1999) + "\n");