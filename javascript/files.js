"use strict"; // strict mode syntax
// Opens a file
var openFile = function(event) {
  var input = event.target;
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
};

// provides the openFile function call to the DOM
var loadListener = function(){
  document.getElementById('files').addEventListener('change', openFile, false);

}

var createListener = function() {
  document.getElementById('newTable').addEventListener('click', createFile);
}

// Creates empty table value
var createFile = function() {

  // Reset color list(?)
  var colorlist = document.getElementById("colors");
  while(colorlist.firstChild){
    colorlist.removeChild(colorlist.firstChild);
  }

  // Prompt user for size wanted
  var rows = parseInt(prompt("How many rows", "0"));
  var columns = parseInt(prompt("How many columns", "0"));

  // Used to create appropriately formated object to be passed in
  var emptyArray = [];
  var emptyObject = { };
  var rowArray = new Array(rows);

  for (var i = 0; i < rowArray.length; i++) {
    rowArray[i] = new Array(columns);

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