self.onmessage = messageHandler;
// or,
//addEventListener("message", messageHandler, true);

// var counter = 1;

function messageHandler(e) {

  // computes sum of all integers from the start value to the end value
  var numStart = parseInt(e.data.add.numStart);
  var numEnd = parseInt(e.data.add.numEnd);

  var sum = 0;
  for (var i=numStart; i <= numEnd; i++) {
    console.log('i', i);
    sum += i;
    console.log(sum);
  }
  // postMessage("Worker echos " + low +""+ high +
  //               " too #" + counter);
  // counter++;
}


