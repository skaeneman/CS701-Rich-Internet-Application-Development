window.onload = init;

// the worker
var myWorker;
// var numOfWorkers;

function init() {
	var startButton = document.getElementById("startButton");
    startButton.onclick = startWorker;

	// var sendButton = document.getElementById("sendButton");
	// sendButton.onclick = sendMessageToWorker;
	// var stopButton = document.getElementById("stopButton");
	// stopButton.onclick = stopWorker;
}

// start the Web Worker and register the event handler
function startWorker(e) {
    // get input value
    var numOfWorkers = document.getElementById("numWorkers").value;
    var range = document.getElementById("range").value;

    console.log('numOfWorkers', numOfWorkers);
    console.log('range', range);

    var numOfWorkers = parseInt(numOfWorkers);
    var range = parseInt(range);

    // check if the input was an integer
    if (isNaN(numOfWorkers) || isNaN(range)) {
        var error = document.getElementById("error");
        error.innerHTML = "Error...please enter an integer."
    } else {
        // else an integer was received so kick off the web worker
        if (myWorker == null) {
            myWorker = new Worker("computeWorker.js");
            myWorker.addEventListener("message", handleReceipt, false);
            
            var numMax = range / numOfWorkers;
            var numLow = 1;
            var numHigh = numMax;

            // loop to create each web worker
            for (var i = 0; i < numOfWorkers; i++) {
                sendMessageToWorker(numLow, numHigh);
                numLow += numMax;
                numHigh += numMax;
            }

        }	
    }
}

// Handle messages received from the Web Worker
function handleReceipt(event) {
    var itemsList = document.getElementById("items");
    var item = document.createElement("li");
    item.innerHTML = event.data;
    items.appendChild(item);
}

// send message to the Web Worker
function sendMessageToWorker(e) {
    var numWorkers = document.getElementById("numWorkers").value;  
    // var range = document.getElementById("range").value;
    // var low = parseInt(low);
    // var high = parseInt(high);

    if (myWorker != null) {
        myWorker.postMessage(numWorkers);
    }    
 }

// terminate the Web Worker
function stopWorker(e) {
    if (myWorker != null) {
        myWorker.terminate();
        myWorker = null;
    }  
}
