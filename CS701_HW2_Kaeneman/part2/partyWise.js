window.onload = init;

// variables for drag and drop actions
var src, target, msg, sourceId;

// called on page load
function init() {
  // get local storage data or null value
  var localStorageSenators = localStorage.getItem("senators");
  console.log('localStorageSenators', localStorageSenators);

  // if data is not already in browsers local storage get from xml
  if (localStorageSenators == null) {
    loadFromXml();
  } else {
    // else data aleady in local storage, convert it into a JavaScript object
    var senators = JSON.parse(localStorageSenators);
    loadFromLocalStorage(senators);
  }

  src = document.getElementById("members");
  target = document.getElementById("dropLists");
  msg = document.getElementById("msg");

  // Add event handlers for the source
  src.ondragstart = dragStartHandler;
  src.ondragend = dragEndHandler;
  src.ondrag = dragHandler;

  // Add event handlers for the target
  target.ondragenter = dragEnterHandler;
  target.ondragover = dragOverHandler;
  target.ondrop = dropHandler;

}

// get the xml list of senators
function loadFromXml() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        // call function to process senator data  
        processXml(this);
      }
    };
    xhttp.open("GET", "partyList.xml", true);
    xhttp.send();
}

// creates JSON objects and stores the xml data locally
function processXml(xml) {
    var senatorArr = [];
    var senatorXml = xml.responseXML;
    var senators = senatorXml.getElementsByTagName("senator");
    var output = '';

    // loop through xml data and get each senator
    for (var i = 0; i < senators.length; i++) { 
      var name = senators[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
      var party = senators[i].getElementsByTagName("party")[0].childNodes[0].nodeValue;

      // create JSON object and populate the array with it
      senatorArr.push({
            name: name,
            party: party,
            voted: false
      });
    }   

    // loop through array to format output and make dragable
    senatorArr.forEach(senator => {
        output += `<li draggable='true' id="${senator.name}">` + senator.name + "</li>";        
    });

    // send formatted output to an html element
    document.getElementById("members").innerHTML = output;

    document.getElementById("msg").innerHTML = "From AJAX Loaded " +
    senatorArr.length + " senators";
   
    // save as JSON to local storage in the browser
    localStorage.setItem('senators', JSON.stringify(senatorArr));    
}

// processes local storage data
function loadFromLocalStorage(senators) {
    var output = '';

    // loop through array to format output and make dragable
    senators.forEach(senator => {
        output += `<li draggable='true' id="${senator.name}">` + senator.name + "</li>"; 
    });

    // send formatted output to an html element
    document.getElementById("members").innerHTML = output;

    document.getElementById("msg").innerHTML = "From LocalStorage Loaded " +
    senators.length + " senators";
};



/**********************************
 * Drag and drop functions
 **********************************/

function dragStartHandler(e) {
  e.dataTransfer.setData("Text", e.target.id);
  sourceId = e.target.id;     // explicitly for some browsers
  e.target.classList.add("dragged");
}

function dragEndHandler(e) {
  msg.innerHTML = "Drag ended";
  var elems = document.querySelectorAll(".dragged");
  for(var i = 0; i < elems.length; i++) {
      elems[i].classList.remove("dragged");
  }
}

function dragHandler(e) {
  msg.innerHTML = "Dragging " + e.target.id;
}

function dragEnterHandler(e) {
    e.preventDefault();  
}

function dragOverHandler(e) {
  msg.innerHTML = "Drag over " + e.target.id;
  e.preventDefault();
}

function dropHandler(e) {
  console.log("Drop on " + e.target.id + 
           " source is " + e.dataTransfer.getData("Text")) ;
 
  var id = e.dataTransfer.getData("text") || sourceId;
  var sourceElement = document.getElementById(id);
  var newElement = sourceElement.cloneNode(false);               
  target.innerHTML = "";
  target.appendChild(newElement);
  e.preventDefault();
}

