window.onload = init;

function init() {
    // access the canvas element and its context
    var canvas = document.getElementById("circles2Canvas");
    var context = canvas.getContext("2d");

    var circlesArray = []; // array to hold circles
    var circleRadius = 30;

    // mouse down event handler
    canvas.onmousedown = function (e) {

        // mouse x and y relative to canvas
        x = e.clientX - e.target.offsetLeft;
        y = e.clientY - e.target.offsetTop;

        // check if the new circle is overlapping existing circles
        // if an overlap exists all circles will be removed from the canvas
        checkForOverlappingCircles(circlesArray, circleRadius, x, y, context, canvas) 

        // generate a random color
        var createColor = randomColor();

        // push the new circle into an array
        circlesArray.push({ x: x, y: y, color: createColor, isOverlapping: false })

        // re-draw only the circles that have isOverlapping attribute set to false.
        generateCircles(circlesArray, context, circleRadius);
    }      
}

// find the distance between 2 circles
// distance formula is squareRoot( (x2-x1)^2 + (y2-y1)^2 )
function findDistance(x1, y1, x2, y2) {
    distance = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
    return distance;
}

// check to see if a new circle is overlapping an existing circle
function checkForOverlappingCircles(circlesArray, circleRadius, x, y, context, canvas) {
    // loop through existing circles in the array
    circlesArray.forEach(circle => {
        // find distance between current circle and exitsing ones
        var distance = findDistance(circle.x, circle.y, x, y);
        var circleDiameter = circleRadius * 2;
        // if there is an overlap, set circle isOverlapping attribute to true
        if (distance < circleDiameter) {
            circle.isOverlapping = true;
            console.log('overlapping circle: ', circle);
            // there was an overlap so remove all circles from the canvas
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
    });
}

// create the circles on the canvas
function generateCircles(circlesArray, context, circleRadius) {
    // loop through all circles in the array
    circlesArray.forEach(circle => {
        // if there is no overlap then create the circle
        if (circle.isOverlapping != true) {
            context.beginPath();
            context.fillStyle = circle.color;
            context.arc(circle.x, circle.y, circleRadius, 0, Math.PI * 2, true);
            context.fill();
            context.closePath();
        }
    });
}





