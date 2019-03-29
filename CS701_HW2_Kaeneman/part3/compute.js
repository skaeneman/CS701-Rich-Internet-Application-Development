window.onload = init;

// the worker
var myWorker;
var localStorageArr = [];
var total = 0;

function init() {
	var startButton = document.getElementById("startButton");
    startButton.onclick = startWorker;
}

// start the Web Worker and register the event handler
function startWorker(e) {
    // get input value
    var numOfWorkers = document.getElementById("numWorkers").value;
    var range = document.getElementById("range").value;
    var numOfWorkers = parseInt(numOfWorkers);
    var range = parseInt(range);

    // check if the input was an integer
    if (isNaN(numOfWorkers) || isNaN(range)) {
        var error = document.getElementById("error");
        error.innerHTML = "Error...please enter an integer."
    } else {
        // else an integer was received so kick off the web worker
        if (myWorker == null) {
            // split up the range by the number of workers
            var numMax = range / numOfWorkers;
            var numLow = 1;  // starting number
            var numHigh = numMax;  // ending number

            // loop to create each web worker
            for (var i = 0; i < numOfWorkers; i++) {
                myWorker = new Worker("computeWorker.js");
                myWorker.addEventListener("message", handleReceipt, false);
                
                sendMessageToWorker(e, numLow, numHigh, i);
                // increment to create the next block of numbers 
                numLow += numMax;
                numHigh += numMax;
            }
        }	
    }
}

// Handle messages received from the Web Worker
function handleReceipt(event) {
    // save result to local storage 1 at a time
    localStorageArr.push(event.data);
    localStorage.setItem('HW2-Part3', JSON.stringify(localStorageArr));    

    // display web worker
    var item = document.createElement("li");
    item.innerHTML = JSON.stringify(event.data);
    items.appendChild(item);

    // retrieve data from localStorage to display in browser
    var localStorageItem = document.createElement("li");
    localStorageItem.innerHTML = localStorage.getItem('HW2-Part3');
    localStorageItems.appendChild(localStorageItem);

    // show the result total
    var rslt = event.data.result;
    total += rslt;
    document.getElementById("totalResult").innerHTML = total;
}

// send message to the Web Worker
function sendMessageToWorker(e, numLow, numHigh, count) {
    // JSON object to pass high and low numbers to worker
    numberBlock = {index: count, numStart: numLow, numEnd: numHigh};

    if (myWorker != null) {
        myWorker.postMessage(numberBlock);
    }    
 }

// terminate the Web Worker
function stopWorker(e) {
    if (myWorker != null) {
        myWorker.terminate();
        myWorker = null;
    }  
}
