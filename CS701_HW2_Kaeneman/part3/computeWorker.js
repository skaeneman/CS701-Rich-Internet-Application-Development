self.onmessage = messageHandler;
// or,
//addEventListener("message", messageHandler, true);

// var counter = 1;

function messageHandler(e) {

  // computes sum of all integers from the start value to the end value
  var numStart = parseInt(e.data.numStart);
  var numEnd = parseInt(e.data.numEnd);
  var workerNum = parseInt(e.data.workerNum);

  var sum = getSum(numStart, numEnd);
  var result = {index: workerNum, start: numStart, end: numEnd, result: sum};
  // result is sent as a JSON object having start, end, and result properties
  postMessage(result);
}

// adds every integer together from numStart to numEnd
function getSum(numStart, numEnd) {
  var sum = 0;
  for (var i=numStart; i <= numEnd; i++) {
    sum += i;
    // console.log(sum);
  }
  return sum;
}