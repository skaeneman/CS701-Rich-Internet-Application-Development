window.onload = init;

// variables for drag and drop actions
var src, target, msg, sourceId, republicans, democrats;

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

    // populate html elements with the senators who voted already
    senatorsWhoAlreadyVoted();    
  }

  src = document.getElementById("members");
  target = document.getElementById("dropLists");
  msg = document.getElementById("msg");
  republicans = document.getElementById("republicans");
  democrats = document.getElementById("democrats");

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

    // loop through array to format output and make dragable if 'voted' set to false
    senators.forEach(senator => {
        if (senator.voted == true) {
            // already voted so don't allow drag and drop
            output += `<li draggable='false' id="${senator.name}"><strike>` + senator.name + "</strike></li>"; 
        } else {
            output += `<li draggable='true' id="${senator.name}">` + senator.name + "</li>"; 
        }       
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
  msg.innerHTML = "Drag Entering " + e.target.id;
  e.preventDefault();
}

function dragOverHandler(e) {
  msg.innerHTML = "Drag Over " + e.target.id;
  e.preventDefault();  
}

function dropHandler(e) {
  console.log("Drop on " + e.target.id + 
           " source is " + e.dataTransfer.getData("Text")) ;
 
  var sourceElement = document.getElementById(sourceId);
  var newElement = sourceElement.cloneNode(true); // show in legend
  
  var senator = findSenator(sourceId);
  var politicalParty = e.target.id;
  
  // make sure they can only cast a vote in their own party
  var isCorrectParty = checkPoliticalParty(politicalParty, senator);

  if (isCorrectParty == true) {    
    // set the senators vote to true in localStorage and JSON
    updateLocalStorage(senator);

    // dragging from the legend is not allowed after a vote is cast
    newElement.setAttribute("draggable", "false");
    // prevent a senator from voting twice
    sourceElement.setAttribute("draggable", "false");   
    // strike the source element to show it can't be dragged again 
    sourceElement.style.setProperty("text-decoration", "line-through");

    // record the senators vote
    senatorCastVote(politicalParty, senator, newElement); 

    e.preventDefault();
  } 
  else if (isCorrectParty == false) {
    // they tried to vote in the wrong political party
    // msg.innerHTML = sourceId + " tried to vote in the wrong party...";
    console.log(`Wrong party...vote not counted for: ${senator.name}`);
  }

}

// lookup a senator by name
function findSenator(name) {
  // get localStorage
  var localStorageSenators = localStorage.getItem("senators");
  var senators = JSON.parse(localStorageSenators);

  // lookup a senators name
  for (var i = 0; i < senators.length; i++) {
    if (senators[i].name == name) {   
      return senators[i];
    }
  };
}

// check a senators political party
function checkPoliticalParty(politicalParty, senator) {
  // make dropzone name match JSON party name
  if (politicalParty == 'republicans') {
    politicalParty = 'Republican';
  } 
  else if (politicalParty == 'democrats') {
    politicalParty = 'Democrat';
  }
  // check if senator is voting in his\her party
  if (senator.party == politicalParty) {
      return true;
  } else {
      return false;
  }
}

// update localStorage after a vote is cast
function updateLocalStorage(senator) {
  // get data from localStorage in browser
  var localStorageSenators = localStorage.getItem("senators");
  var senators = JSON.parse(localStorageSenators);
  
  // update vote to true, save back to localStorage
  for (var i=0; i < senators.length; i++) {
    if (senators[i].name == senator.name) {
        senators[i].voted = true;
        localStorage.setItem('senators', JSON.stringify(senators));
    }
  }  
}

// allows senator to vote if they're in the correct party
function senatorCastVote(politicalParty, senator, newElement) {
  // if party matches then accept the vote
  if (politicalParty == 'republicans') {
    if (senator.party == 'Republican') {
      console.log(`Added ${senator.name} to republicans...`);
      republicans.appendChild(newElement);
    }      
  }
  if (politicalParty == 'democrats') {
    if (senator.party == 'Democrat') {
      console.log(`Added ${senator.name} to democrats...`);
      democrats.appendChild(newElement);
    }      
  }   
}

// check local storage to see who already voted and populate the div's
function senatorsWhoAlreadyVoted() {
  var senators = localStorage.getItem('senators');
  var senatorsArr = JSON.parse(senators);
  var votedAlready = [];
  var republicans = document.getElementById("republicans");
  var democrats = document.getElementById("democrats");
  var repubOutput = republicans.innerHTML;
  var demOutput = democrats.innerHTML;
 
  // find the senators that have voted
  for (var i = 0; i < senatorsArr.length; i++) {
    if (senatorsArr[i].voted == true) {
      // create array of JSON objects to hold senators who voted
      votedAlready.push({
        name: senatorsArr[i].name,
        party: senatorsArr[i].party
      });
    }
  }

  // populate the html elements with the senators names
  for (var x = 0; x < votedAlready.length; x++) {
    if (votedAlready[x].party == 'Republican') {
      repubOutput += `<li draggable='false' id="${votedAlready[x].name}">` + votedAlready[x].name + "</li>";        
      republicans.innerHTML = repubOutput;
    }
    if (votedAlready[x].party == 'Democrat') {
      demOutput += `<li draggable='false' id="${votedAlready[x].name}">` + votedAlready[x].name + "</li>";        
      democrats.innerHTML = demOutput;
    }    
  }

}