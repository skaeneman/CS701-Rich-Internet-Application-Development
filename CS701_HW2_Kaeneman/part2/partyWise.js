window.onload = init;

// called on page load
function init() {
	loadFromXml();
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

// craetes JSON objects and stores the xml data locally
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
        output += "<li draggable='true'>" + senator.name + "</li>";        
    });
    // console.log(output);

    // send formatted output to an html element
    document.getElementById("members").innerHTML = output;

    // save as JSON to local storage in the browser
    localStorage.setItem('senators', JSON.stringify(senatorArr));    
}
