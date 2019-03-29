self.onmessage = messageHandler;
// or,
//addEventListener("message", messageHandler, true);

function messageHandler(e) {
  var numStart = parseInt(e.data.numStart);
  var numEnd = parseInt(e.data.numEnd);
  var index = parseInt(e.data.index);

  console.log('worker received:', JSON.stringify(e.data));

  var sum = getSum(numStart, numEnd);
  var result = {index: index, start: numStart, end: numEnd, result: sum};
  // result is sent as a JSON object having start, end, and result properties
  postMessage(result);
}

// computes sum of all integers from the start value to the end value
function getSum(numStart, numEnd) {
  var sum = 0;
  for (var i=numStart; i <= numEnd; i++) {
    sum += i;
    // console.log(sum);
  }
  return sum;
}