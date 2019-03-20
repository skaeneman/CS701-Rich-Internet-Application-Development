window.onload = init;

function init() {
    // access the canvas element and its context
    var canvas = document.getElementById("circles2Canvas");
    var context = canvas.getContext("2d");

    var circlesArray = []; // array to hold circles
    var circleCircumference = 30;

    // mouse down event handler
    canvas.onmousedown = function (e) {

        // mouse x and y relative to canvas
        x = e.clientX - e.target.offsetLeft;
        y = e.clientY - e.target.offsetTop;

        // loop through existing circles
        circlesArray.forEach(circle => {
            var distance = findDistance(circle.x, circle.y, x, y);

            console.log('distance', distance);

            // generate a random color
            var createColor = randomColor();

            if (distance < (circleCircumference * 2)) {
                // mark circle as overlapping
                // circle.isOverlapping = true;
                console.log('overlapping', circle)

                circlesArray.push({
                    x: x,
                    y: y,
                    color: createColor,
                    isOverlapping: true
                })
            } else {

                // add circle to array
                circlesArray.push({
                    x: x,
                    y: y,
                    color: createColor,
                    isOverlapping: false
                })

                // // create the circles with random colors
                // context.fillStyle = createColor;
                // context.beginPath();
                // context.arc(x, y, circleCircumference, 0, Math.PI * 2);
                // context.fill();
                // context.closePath();

            }     
        }); // forEach

        generateCircles(circlesArray);
        console.log('circlesArray', circlesArray);

    }
}

// find the distance between 2 circles
// distance = squareRoot( (x2-x1)^2 + (y2-y1)^2 )
function findDistance(x1, y1, x2, y2) {
    distance = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
    return distance;
}


function generateCircles(circlesArray) {
    for (var i = 0; i < circlesArray.length; i++) {

        if (circlesArray[i].isOverlapping != true) {
            context.beginPath();
            context.fillStyle = circlesArray[i].color;
            context.arc(circlesArray[i].x, circlesArray[i].y, circleCircumference, 0, Math.PI * 2);
            context.fill();
            context.closePath();
        }
    }
}





