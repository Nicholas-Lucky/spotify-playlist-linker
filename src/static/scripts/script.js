const MIN_RGB_VALUE = 0;
const MAX_RGB_VALUE = 255;

function changeDivBackgroundColor(div, newBackgroundColor) {
    console.log(`The background color of ${div.id} has been set to ${newBackgroundColor}`);
    div.style.backgroundColor = newBackgroundColor;
}

function randomizeDivBackgroundColor(div) {
    // NL 12/31/25 - We want each RGB value to be between 150 and 255 inclusive
    let lowestRGBValue = 150;
    let highestRGBValue = 255;

    // NL 12/31/25 - Get the numeric RGB values
    let rValue = getRandomRGBInclusive(lowestRGBValue, highestRGBValue);
    let gValue = getRandomRGBInclusive(lowestRGBValue, highestRGBValue);
    let bValue = getRandomRGBInclusive(lowestRGBValue, highestRGBValue);

    // NL 12/31/25 - Convert the numeric RGB values into a hex string that we can pass into changeDivBackgroundColor()
    let rHex = RGBToHex(rValue);
    let gHex = RGBToHex(gValue);
    let bHex = RGBToHex(bValue);

    let fullColorHexString = "#" + rHex + gHex + bHex;

    console.log(`Random color with hex value ${fullColorHexString} selected`);
    changeDivBackgroundColor(div, fullColorHexString);
}

function getRandomRGBInclusive(low = MIN_RGB_VALUE, high = MAX_RGB_VALUE) {
    let difference = high - low;

    let value = Math.floor((Math.random() * difference) + low);

    // NL 12/31/25 - Make sure the RGB value is between 0 and 255 inclusive
    if (value < MIN_RGB_VALUE) {
        value = MIN_RGB_VALUE;
    }
    if (value > MAX_RGB_VALUE) {
        value = MAX_RGB_VALUE;
    }

    return value;
}

function RGBToHex(value) {
    // NL 12/31/25 - Make sure the RGB value is between 0 and 255 inclusive
    if (value < MIN_RGB_VALUE) {
        console.log(`RGBToHex: value parameter = ${value} < ${MIN_RGB_VALUE}`);
        return "";
    }

    if (value > MAX_RGB_VALUE) {
        console.log(`RGBToHex: value parameter = ${value} > ${MAX_RGB_VALUE}`);
        return "";
    }

    // NL 12/31/25 - Assuming that value is between 0-255 inclusive
    let hexString = "";

    const hexValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
    const NUM_HEX_DIGITS = 16;

    let currentNumber = value;

    let firstHexDigit = Math.floor(currentNumber / NUM_HEX_DIGITS);
    let secondHexDigit = currentNumber % NUM_HEX_DIGITS;

    hexString += hexValues[firstHexDigit];
    hexString += hexValues[secondHexDigit];

    return hexString;
}

// NL 12/31/25 - Clicking on div-1 will change it's background color to lightblue
const styledDivOne = document.getElementById("div-1");
styledDivOne.addEventListener("click", function(){changeDivBackgroundColor(styledDivOne, "lightblue")});

// NL 12/31/25 - Clicking on div-2 will change it's background color to a random-ish color
const styledDivTwo = document.getElementById("div-2");
styledDivTwo.addEventListener("click", function(){randomizeDivBackgroundColor(styledDivTwo)});