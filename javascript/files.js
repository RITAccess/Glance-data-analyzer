"use strict"; // strict mode syntax
// Opens a file
var ev;
var openFile = function(openfile) {
  ev = openfile;
  Alert.render("Choose a type of graph: ");
};

var newFile = function(newFile) {
  ev = newFile;
  Alert2.render("Choose a type of graph: ")
}

function loadFile(){
  var input = ev.target;
  var colorlist = document.getElementById("colors");
  while(colorlist.firstChild){
    colorlist.removeChild(colorlist.firstChild);
  }
  // use PapaParse for handing the csv file
  var results = Papa.parse(input.files[0], {
  	complete: function(results) {
      var resData = results.data;
      if((resData[resData.length-1].length == 1) && (resData[resData.length-1][0] == "")){
        results.data.pop();
      }
  		loadData(results);
  	}
  });
}

// provides the openFile function call to the DOM
var loadListener = function(){
  document.getElementById('files').addEventListener('change', openFile, false);
}

var createListener = function() {
  document.getElementById('newTable').addEventListener('click', newFile, false);
}

// Creates empty table value
var createFile = function(rows, columns) {

  // Reset color list(?)
  var colorlist = document.getElementById("colors");
  while(colorlist.firstChild){
    colorlist.removeChild(colorlist.firstChild);
  }

  // Used to create appropriately formated object to be passed in
  var emptyArray = [];
  var emptyObject = { };
  var rowArray = new Array(parseInt(rows));

  for (var i = 0; i < rowArray.length; i++) {
    rowArray[i] = new Array(parseInt(columns));

    for (var j = 0; j < rowArray[i].length; j++) {
      rowArray[i][j] = 0;
    }
  } 

  for (var i = 0; i < rowArray[0].length; i++) {
    rowArray[0][i] = "Label " + i;
  }

  // Create object
  var newTable = {data: rowArray, errors: emptyArray, meta: emptyObject };

  // Load new table :)
  loadData(newTable);
}
