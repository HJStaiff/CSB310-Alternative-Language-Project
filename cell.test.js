const Cell = require('./cell');

test('Test toString output', () => {
    let testCell = new Cell("Honor", 
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
    expect(testCell.toString()).toBe(`Honor, 9X (China), 2019, Available. Released 2019, 163.1 x 77.2 x 8.8 mm (6.42 x 3.04 x 0.35 in), 206 g, Single SIM (Nano-SIM) or Hybrid Dual SIM (Nano-SIM, dual stand-by), LTPS IPS LCD capacitive touchscreen, 16M colors, 6.59, 1080 x 2340 pixels, 19.5:9 ratio (~391 ppi density), Fingerprint (side-mounted), accelerometer, gyro, proximity, compass, Android 9.0 (Pie)`.toString());
});