var robot = require("robotjs");

// Speed up the mouse.

var gameSens = 2.0;

var screenSize = robot.getScreenSize();
var ourScreen = robot.screen;

var center = {
	height: (screenSize.height / 2) - 55,
	width : (screenSize.width / 2) - 55 
}

var actualCenter = {
	height: (screenSize.height / 2),
	width : (screenSize.width / 2)
}

// Need to calibrate more colors.
var targetColorProcessed = [[242,54,27],[239,53,25],[238,65,49],[237,66,51],[238,64,49]]

while (1){

	var img = ourScreen.capture(center.width, center.height, 110, 110);

	for (x = 0 ; x < 110; x++) { // left to right

		for (y = 0; y < 110; y++) {
			var hex = img.colorAt(x, y);

			if (similar(hex, 5)) {

				robot.mouseClick();

				console.log("Found ya")
			} 
		}
	}
}

function convertHex(hex){
    r = parseInt(hex.substring(0,2), 16);
    g = parseInt(hex.substring(2,4), 16);
    b = parseInt(hex.substring(4,6), 16);

    result = {
    	red : r,
    	green : g,
    	blue : b
    }
    return result;
}

function similar(aneighbor, atolerance) {
	if(atolerance == undefined) 
	{
        atolerance = 10;
    }

	var results = convertHex(aneighbor),
		redFound, greenFound, blueFound;

	for(k = 0; k < targetColorProcessed.length; k++)
	{
		redFound = Math.abs(targetColorProcessed[k][0] - results.red);
		greenFound = Math.abs(targetColorProcessed[k][1] - results.green);
		blueFound = Math.abs(targetColorProcessed[k][2] - results.blue);

		if ((redFound <= atolerance) && (greenFound <= atolerance) && (blueFound <= atolerance))
		{
			return true;
		}
	}
	return false; 
}


function calculateMovement(x, y) {

	if (Math.abs(x) <= 5){
		x = 0;
	} else {
		x = x - actualCenter.width;
		x = x / (gameSens / 0.116);
	}

	if (Math.abs(y) <= 5){
		y = 0;
	} else {
		y = y - actualCenter.height;
		y = y / (gameSens / 0.1111116);
	}

	return [x, y]
}