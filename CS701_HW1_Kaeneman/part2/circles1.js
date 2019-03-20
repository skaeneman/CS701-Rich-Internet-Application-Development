window.onload = init;

function init() {
    // access the canvas element and its context
    var canvas = document.getElementById("circles1Canvas");
    var context = canvas.getContext("2d");

    // mouse down event handler
    canvas.onmousedown = function (e) {

        // mouse x and y relative to canvas
        x = e.clientX - e.target.offsetLeft;
        y = e.clientY - e.target.offsetTop;

        // generate a random color
        var createColor = randomColor();
        
        // create the circles with random colors
        context.fillStyle = createColor;
        context.beginPath();
        context.arc(x, y, 30, 0, Math.PI * 2);
        context.fill();
        context.closePath();
    }

}










