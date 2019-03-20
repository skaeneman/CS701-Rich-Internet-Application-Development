var sliderModule = (function (win, doc) {

    win.onload = init;

    // canvas and context variables
    var canvas;
    var context;

    // center of the pattern
    var centerX, centerY;


    function init() {
        canvas = doc.getElementById("bullsEyeCanvas");
        context = canvas.getContext("2d");

        centerX = canvas.width / 2;
        centerY = canvas.height / 2;

        // draw the initial pattern
        drawPattern();
    }


    // called whenever the slider value changes
    function drawPattern() {
        // clear the drawing area
        context.clearRect(0, 0, canvas.width, canvas.height);

        // get the current radius
        var bandWidth = doc.getElementById("bandWidth").value;
        // display the radius
        doc.getElementById("displayBandWidth").innerHTML = bandWidth;
        
        var radius = 200;
        var ringCount = 0;        
        
        while (radius > 0) {
            // if it's an odd ring count number make it blue
            if (ringCount % 2 != 0) {
                context.fillStyle = '#0000FF';
            } else {
                // else set fill color to red if the count is even
                context.fillStyle = '#FF0000';               
            }
            console.log(ringCount);

            // draw the pattern
            context.beginPath();
            context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            context.fill();
            context.closePath(); 

            ringCount += 1; // increment the count
            radius = radius - bandWidth; // subtract bandwidth from the radius
        }

    }
    return {
        drawPattern: drawPattern
    };

})(window, document);
