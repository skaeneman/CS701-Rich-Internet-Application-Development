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

        // check if the new circle is overlapping existing circles
        checkForOverlappingCircles(circlesArray, circleCircumference, x, y, context, canvas) 

        // generate a random color
        var createColor = randomColor();

        // push the new circle into an array
        circlesArray.push({ x: x, y: y, color: createColor, isOverlapping: false })

        // create the circles on the canvas
        generateCircles(circlesArray, context, circleCircumference);
    }      
}

// find the distance between 2 circles
// distance formula is squareRoot( (x2-x1)^2 + (y2-y1)^2 )
function findDistance(x1, y1, x2, y2) {
    distance = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
    return distance;
}

// check to see if a new circle is overlapping an existing circle
function checkForOverlappingCircles(circlesArray, circleCircumference, x, y, context, canvas) {
    // loop through existing circles in the array
    circlesArray.forEach(circle => {
        // find distance between current circle and exitsing ones
        var distance = findDistance(circle.x, circle.y, x, y);
        // if there is an overlap, set circle isOverlapping attribute to true
        if (distance < (circleCircumference * 2)) {
            circle.isOverlapping = true;
            console.log('overlapping circle: ', circle);
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
    });
}

// create the circles on the canvas
function generateCircles(circlesArray, context, circleCircumference) {
    // loop through all circles in the array
    circlesArray.forEach(circle => {
        // if there is no overlap then create the circle
        if (circle.isOverlapping != true) {
            context.beginPath();
            context.fillStyle = circle.color;
            context.arc(circle.x, circle.y, circleCircumference, 0, Math.PI * 2);
            context.fill();
            context.closePath();
        }
    });
}





