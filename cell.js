/*
* Cell class which holds data related to one cell phone model.
*/
class Cell {
    /*
    * Construct a new cell object.
    */
    constructor(oem, 
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
            this.oem = oem;
            this.model = model;
            this.launch_announced = launch_announced;
            this.launch_status = launch_status;
            this.body_dimensions = body_dimensions;
            this.body_weight = body_weight;
            this.body_sim = body_sim;
            this.display_type = display_type;
            this.display_size = display_size;
            this.display_resolution = display_resolution;
            this.features_sensors = features_sensors;
            this.platform_os = platform_os;
          }
    
    /*
    * Returns a string with all cell information. 
    */
    toString(){
        return String(this.oem + ", " +
            this.model + ", " +
            this.launch_announced + ", " +
            this.launch_status + ", " +
            this.body_dimensions + ", " +
            this.body_weight + ", " +
            this.body_sim + ", " +
            this.display_type + ", " +
            this.display_size + ", " +
            this.display_resolution + ", " +
            this.features_sensors + ", " +
            this.platform_os);
    }
}

// Export class for use in main.
module.exports = Cell;