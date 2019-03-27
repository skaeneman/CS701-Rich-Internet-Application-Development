window.onload = init;

// the worker
var myWorker;
var numOfWorkers;

function init() {
	var startButton = document.getElementById("startButton");
    startButton.onclick = startWorker;
    numOfWorkers = document.getElementById("numWorkers");

	// var sendButton = document.getElementById("sendButton");
	// sendButton.onclick = sendMessageToWorker;
	// var stopButton = document.getElementById("stopButton");
	// stopButton.onclick = stopWorker;
}

// start the Web Worker and register the event handler
function startWorker(e) {
    // check if the input was a number
    if (isNaN(numOfWorkers)) {
        var error = document.getElementById("error");
        error.innerHTML = "Error...please enter an integer."
    } else {
        // else an integer was received so kick off the web worker
        if (myWorker == null) {
            myWorker = new Worker("computeWorker.js");
            myWorker.addEventListener("message", handleReceipt, false);
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
	var data = document.getElementById("msg").value;
    if (myWorker != null) {
        myWorker.postMessage(data);
    }    
 }

// terminate the Web Worker
function stopWorker(e) {
    if (myWorker != null) {
        myWorker.terminate();
        myWorker = null;
    }  
}
