const cellParser = require('../main/cellParser');
const Cell = require('../main/cell');

// Run "npm test" in terminal.

test('Test reading file and attribute types', () => {
    const filePath = './resources/test.csv'
    const parser = new cellParser(filePath);
    expect(String(parser.cells[0])).toBe(`Google, Pixel 4 XL, 2019, Available. Released 2019, 160.4 x 75.1 x 8.2 mm (6.31 x 2.96 x 0.32 in), 193 g, Nano-SIM card & eSIM, "P-OLED capacitive touchscreen, 16M colors", 6.3, "1440 x 3040 pixels, 19:9 ratio (~537 ppi density)", "Face ID, accelerometer, gyro, proximity, compass, barometer", Android 10`);
    expect(typeof(parser.cells[0].oem)).toBe("string");
    expect(typeof(parser.cells[0].model)).toBe("string");
    expect(typeof(parser.cells[0].launch_announced)).toBe("number");
    expect(typeof(parser.cells[0].launch_status)).toBe("string");
    expect(typeof(parser.cells[0].body_dimensions)).toBe("string");
    expect(typeof(parser.cells[0].body_weight)).toBe("number");
    expect(typeof(parser.cells[0].body_sim)).toBe("string");
    expect(typeof(parser.cells[0].display_type)).toBe("string");
    expect(typeof(parser.cells[0].display_size)).toBe("number");
    expect(typeof(parser.cells[0].display_resolution)).toBe("string");
    expect(typeof(parser.cells[0].features_sensors)).toBe("string");
    expect(typeof(parser.cells[0].platform_os)).toBe("string");
});

test('Test reading empty file', () => {
    const filePath = './resources/emptyTest.csv'
    expect(() => new cellParser(filePath)).toThrow("Invalid file.");
});

test('Test if '-' is replaced with null', () => {
    const filePath = './resources/nullData.csv'
    const parser = new cellParser(filePath);
    expect(parser.cells[2].body_dimensions).toBe(null);
    expect(parser.cells[2].body_weight).toBe(null);
});

test('Test get average display size', () => {
    const filePath = './resources/test.csv'
    const parser = new cellParser(filePath);
    expect(parser.getAvgSize()).toBe("6.94 inches");
})

test('Test get average weight', () => {
    const filePath = './resources/test.csv'
    const parser = new cellParser(filePath);
    expect(parser.getAvgWeight()).toBe("243.18 grams");
})

test('Test oem with highest average weight', () => {
    const filePath = './resources/test.csv'
    const parser = new cellParser(filePath);
    expect(parser.getHighestAvgOemWeight()).toBe("Lenovo, 420.00 grams");
});

test('Test adding a cell', () => {
    const filePath = './resources/test.csv'
    const parser = new cellParser(filePath);
    parser.addCell("Honor", 
        "9X (China)", 
        2019, 
        "Available. Released 2019", 
        "163.1 x 77.2 x 8.8 mm (6.42 x 3.04 x 0.35 in)", 
        206, 
        "Single SIM (Nano-SIM) or Hybrid Dual SIM (Nano-SIM, dual stand-by)", 
        "LTPS IPS LCD capacitive touchscreen, 16M colors", 
        6.59, 
        "1080 x 2340 pixels, 19.5:9 ratio (~391 ppi density)", 
        "Fingerprint (side-mounted), accelerometer, gyro, proximity, compass", 
        "Android 9.0 (Pie)");
    expect(parser.cells[13].oem).toBe("Honor");
    expect(parser.cells[13].model).toBe("9X (China)");
});

test('Test getting phones released in a year different from launch', () => {
    const filePath = './resources/test.csv'
    const parser = new cellParser(filePath);
    expect(parser.getReleasedYearDifference()).toBe("Motorola, One Hyper\n");
});

test('Test getting phones with one feature', () => {
    const filePath = './resources/test.csv'
    const parser = new cellParser(filePath);
    expect(parser.getOneFeature()).toBe(2);
});

test('Test getting most launches after a certain year', () => {
    const filePath = './resources/test.csv'
    const parser = new cellParser(filePath);
    expect(parser.getMostLaunches(1999)).toBe("2020, 5");
});