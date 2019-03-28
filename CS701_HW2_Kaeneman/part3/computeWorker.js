self.onmessage = messageHandler;
// or,
//addEventListener("message", messageHandler, true);

var counter = 1;

function messageHandler(e) {

console.log(e.numWorkers);
// console.log(e.high);


  // var low = parseInt(e.low);
  // var high = parseInt(e.high);

  // postMessage("Worker echos " + low +""+ high +
  //               " too #" + counter);
  // counter++;
}

