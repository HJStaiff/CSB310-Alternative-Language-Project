/*
* Stores cell data and performs calculations on data.
*/
const fs = require('fs');
const cell = require('./cell');
class CellParser {
    /*
    * Create a Cell Parser with data from a file.
    */
    constructor(filePath) {
        this.cells = CellParser.parseCells(filePath);
    }

    /*
    * Add a new Cell object to the array given data.
    */
    addCell(oem, 
                model, 
                launch_announced, 
                launch_status,
                body_dimensions, 
                body_weight, 
                body_sim, 
                display_type,
                display_size, 
                display_resolution, 
                features_sensors, 
                platform_os) {
        var cellObj = new cell(oem, 
                model, 
                launch_announced, 
                launch_status,
                body_dimensions, 
                body_weight, 
                body_sim, 
                display_type,
                display_size, 
                display_resolution, 
                features_sensors, 
                platform_os);

        this.cells.push(cellObj);
    }

    /*
    * Calculates and returns the average of all non null weights.
    */
    getAvgWeight(){
        var totalWeight = 0;
        var totalCells = 0;
        for (let cell of this.cells){
            if (cell.body_weight != null){
                totalWeight += Number(parseFloat(cell.body_weight));
                totalCells++;
            }
        }
        return (totalWeight / totalCells).toFixed(2) + " grams";
    }

    /*
    * Returns a string containing the oem with the highest average cellphone body weight.
    */
    getHighestAvgOemWeight(){
        var oemWeightHashMap = new Map(); // Key: Oem string, Value: Float total weight of Oem phones (non null weight)
        var oemCountHashMap = new Map(); // Key: Oem string, Value: Int total count of Oem phones (non null weight)

        // Add total weight and count of oem phones.
        for (let i in this.cells){
            let oem = this.cells[i].oem;
            let weight = Number(parseFloat(this.cells[i].body_weight))
            if (weight != null && !isNaN(weight)){ // Exclude null weight phones from calculation.
                if (oemWeightHashMap.has(oem)){ // If oem exists in map increment its values.
                    oemWeightHashMap.set(oem, oemWeightHashMap.get(oem) + weight);
                    oemCountHashMap.set(oem, oemCountHashMap.get(oem) + 1);
                }
                else{ // If oem is new to map insert new value.
                    oemWeightHashMap.set(oem, weight);
                    oemCountHashMap.set(oem, 1);
                }
            }
        }

        // Calculate average weights.
        var oemAvgHashMap = new Map(); // Key: Oem string, Value: Float average of Oem phone non null weights.
        for (let oem of oemWeightHashMap.keys()){
            oemAvgHashMap.set(oem, oemWeightHashMap.get(oem) / oemCountHashMap.get(oem));
        }

        // Find highest of the averages.
        let maxOem = "Oem";
        let maxAvg = 0;
        for (let oem of oemAvgHashMap.keys()){
            if (oemAvgHashMap.get(oem) > maxAvg) {
                maxOem = oem;
                maxAvg = oemAvgHashMap.get(oem);
            }
        }
        return maxOem + ", " + maxAvg.toFixed(2) + " grams";
    }

    /*
    * Calculates and returns the display size of all non null sizes.
    */
    getAvgSize(){
        var totalSize = 0;
        var totalCells = 0;
        for (let cell of this.cells){
            if (cell.display_size != null){
                totalSize += Number(parseFloat(cell.display_size));
                totalCells++;
            }
        }
        return (totalSize / totalCells).toFixed(2) + " inches";
    }
    
    /*
    * Returns an array of Cell objects containing data from file.
    */
    static parseCells(filePath) {
        /*
        * readFileSync blocks until the file is finished reading.
        * In this case cells.csv is small, so there is no noticeable delay.
        * For larger data, this could be done asynchronously.
        */
        console.log("Reading file...\n");
        const file = fs.readFileSync(filePath, 'utf8', (err, data) => {
          if (err) throw err;
        });

        // Regex: Split CSV file by newline characters
        console.log("Parsing cellphone data...\n");
        var fileLines = file.split('\n');
        // Skip header line.
        fileLines.shift();
        // Remove duplicate rows.
        var fileSet = new Set(fileLines);

        // Create Cell objects.
        console.log("Indexing cellphone data...\n");
        var cells = [];
        for (let value of fileSet) {
            cells.push(CellParser.cleanCellData(value));
        }
        console.log("Successfuly parsed cellphone data.\n");
        return cells;
    }

    /*
    * Parses and cleans all data in a line.
    * Returns a Cell object with the data.
    */
    static cleanCellData(line){ 
        //Regex: Split line at commas, ignoring commas inside quotes.
        var cellData = line.split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/);

        // [0] oem
        var oem = String(cellData[0]).trim();
        if (oem == "" || oem == '-'){
            oem = null;
        }

        // [1] model
        var model = String(cellData[1]).trim();
        if (model == "" || model == '-'){
            model = null;
        }

        // [2] launch_announced
        var launch_announced = String(cellData[2]).trim();
        var launch_announced_pattern = /\b\d{4}\b/; // Regex: four digit number
        if (launch_announced_pattern.test(launch_announced)) {
            launch_announced = Number(launch_announced.match(launch_announced_pattern));
        }
        else {
            launch_announced = null;
        }

        // [3] launch_status
        var launch_status = String(cellData[3]).trim();
        var launch_status_pattern = /\b\d{4}\b/; // Regex: four digit year
        if (launch_status.includes("Available") && launch_status_pattern.test(launch_status)){
            launch_status = "Available. Released " + launch_status.match(launch_status_pattern);
        }
        else if (launch_status.includes("Discontinued")){
            launch_status = "Discontinued";
        }
        else if (launch_status.includes("Cancelled")){
            launch_status = "Cancelled";
        }
        else {
            launch_status = null;
        }

        // [4] body_dimensions
        var body_dimensions = String(cellData[4]).trim();
        if (body_dimensions == "" || body_dimensions == '-'){
            body_dimensions = null;
        }

        // [5] body_weight
        var body_weight = String(cellData[5]).trim();
        var body_weight_pattern = /\d+\s?g/; // Regex number followed by 'g' representing grams, optional space between
        if (body_weight_pattern.test(body_weight)) {
            body_weight = String(body_weight.match(body_weight_pattern));
        }
        else {
            body_weight = null;
        }

        // [6] body_sim
        var body_sim = String(cellData[6]).trim();
        if (body_sim == "" || body_sim == '-' || body_sim == "No" || body_sim == "Yes"){
            body_sim = null;
        }

        // [7] display_type
        var display_type = String(cellData[7]).trim();
        if (display_type == "" || display_type == '-'){
            display_type = null;
        }

        // [8] display_size
        var display_size = String(cellData[8]).trim();
        var display_size_pattern = /\d+.\d+\s?inches/; // Regex: Number followed by "inches", optional space between
        if (display_size_pattern.test(display_size)) {
            display_size = Number(parseFloat(display_size.match(display_size_pattern)));
        }
        else {
            display_size = null;
        }

        // [9] display_resolution
        var display_resolution = String(cellData[9]).trim();
        if (display_resolution == "" || display_resolution == '-'){
            display_resolution = null;
        }

        // [10] features_sensors
        var features_sensors = String(cellData[10]).trim();
        if (features_sensors == "" || features_sensors == '-' || !isNaN(features_sensors)){ // Numbers like 12 or 20.1 not allowed.
            features_sensors = null;
        }

        // [11] platform_os
        var platform_os = String(cellData[11].match(/^[^,]*/)).trim(); // Regex: Keep everything up to first comma
        if (platform_os == "" || platform_os == '-' || !isNaN(platform_os)){ // Numbers like 12 or 20.1 not allowed.
            platform_os = null;
        }
        else if (platform_os.indexOf('"') == 0 && platform_os.charAt(platform_os.length) != '"'){ // Add quote to end if it was cut off.
            platform_os += "\"";
        }


        var cellObj = new cell(oem, 
                model, 
                launch_announced, 
                launch_status,
                body_dimensions, 
                body_weight, 
                body_sim, 
                display_type,
                display_size, 
                display_resolution, 
                features_sensors, 
                platform_os);

        return cellObj;
    }
}

// Export class for use in main.
module.exports = CellParser;