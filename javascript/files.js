"use strict"; // strict mode syntax
// Opens a file
var ev;
var totalData = [];
var firstData = [];

var openFile = function(openfile) {
  ev = openfile;
  if(ev.target.files[0]!=null)
  Alert.render("Choose a type of graph: ");
};

var newFile = function(newFile) {
  ev = newFile;
  Alert2.render("Choose a type of graph: ")
}

function loadFile(){
  if(player && player.playing && !uncheckCalled){
    if(isSafari){
      player.stop();
    }
    else{
      if(player.t){
        player.t.stop();
      }
    }
  }
  var input = ev.target;
  var colorlist = document.getElementById("colors");
  oldData = [];
  lineColors = [];
  while(colorlist.firstChild){
    colorlist.removeChild(colorlist.firstChild);
  }
  // use PapaParse for handing the csv file
    var results = Papa.parse(input.files[0], {
    	complete: function(results) {
        var resData = results.data;

       // Check for if there are blank lines at the end of the data set
       for (var i = 0; i < results.data.length; i++) {

        if(results.data[results.data.length-1].join().split(" ").join("") === "") {
          results.data.pop();
        }
       }

       // Check for if there are any blank lines in the data set
       for (var i = 0; i < results.data.length; i++) {

        if (results.data[i].join().split(" ").join("") === "") {
          results.data.splice(i, 1);
        } 

        for (var j = 1; j < results.data[i].length; j++) {
          if (isNaN(results.data[i][j]) && i >= 1 || results.data[i][j].split(" ").join("") === "") {
            results.data[i][j] = 0;
          }
        }
       }

       // Check for if the CSV already has designated column labels or not
      if (results.data[0][0].split(' ').join('') != '') {

        // If not, it adds column labels onto the table
        for (var i = 0; i < results.data.length; i++) {
          var firstCol = results.data[i][0];
          results.data[i].splice(0, 1, "Row " + i, firstCol);
        }
        results.data[0][0] = " ";
      }

     if((resData[resData.length-1].length == 1) && (resData[resData.length-1][0] == "")){
        results.data.pop();
      }
     totalData = [];
     firstData = results.data;
	 	 loadData(results);
  	 }
    });
}

// provides the openFile function call to the DOM
var loadListeners = function(){
  var fileEl = document.getElementById('overlayBtn');
  var newTblEl = document.getElementById('newTable');

  if(fileEl){
    document.getElementById('files').addEventListener('change', openFile, false);
  }
  else{
    setTimeout(function(){document.getElementById('files').addEventListener('change', openFile, false);},1000);
  }

  if(newTblEl){
    document.getElementById('newTable').addEventListener('click', newFile, false);
  }
  else{
    setTimeout(function(){document.getElementById('newTable').addEventListener('click', newFile, false);},1000);
  }
}

// Creates empty table value
var createFile = function(rows, columns) {
  lineColors = [];
  if (rows < 1 && columns < 2) {
    rows = 1;
    columns = 2;
    alert("Table size not valid. A table of 1 by 2 will be created.")
  }
  else if (rows < 1) {
    rows = 1;
    alert("Number of rows not valid. A table with 1 row will be created.");
  }
  else if (columns < 2) {
    columns = 2;
    alert("Number of colums not valid. A table with 2 columns will be created.");
  }

  // Reset color list
  var colorlist = document.getElementById("colors");
  while(colorlist.firstChild){
    colorlist.removeChild(colorlist.firstChild);
  }

  // Used to create appropriately formated object to be passed in
  var emptyArray = [];
  var emptyObject = { };
  var rowArray = new Array(parseInt(rows) + 1);

  for (var i = 0; i < rowArray.length; i++) {
    rowArray[i] = new Array(parseInt(columns) + 1);

    for (var j = 0; j < rowArray[i].length; j++) {
      rowArray[i][j] = 0;
    }
    rowArray[i][0] = "Row " + i;
  }

  for (var i = 0; i < rowArray[0].length; i++) {
    rowArray[0][i] = "Label " + i;
  }
  rowArray[0][0] = " ";

  // Create object
  var newTable = {data: rowArray, errors: emptyArray, meta: emptyObject };
  firstData = rowArray;
  // Load new table :)
  totalData = [];
  loadData(newTable);
}
var changeType= function(){
  if(!isSafari){
    if(player.t)
    player.t.stop();
  }
  else{
    if(player.t_object)
    player.t_object.pause();
    if(player.t)
    player.t.stop();
  }
  var results = new Object();
  results.data= [];
  results.errors=[];
  var m ={
    aborted:false,
    cursor:94,
    delimiter: ",",
    linebreak: "",
    truncated: false
  }
  results.meta = m;
  var resData = grid.getData();
  for(var i = 0; i< resData.length; i++){
    results.data[i]= [];
    for(var key in resData[i]){
      if(key != "id")
      results.data[i].push(resData[i][key]);
    }
  }
  loadData(results);
}


// Place a new row on the end of the existing table
 var addRow = function() {
    dataCount++;

  // If there is a change to the table, the next redos are no longer valid
  totalData.splice(dataCount, totalData.length - dataCount - 1);

  // Reset color list
  var colorlist = document.getElementById("colors");
  while(colorlist.firstChild){
    colorlist.removeChild(colorlist.firstChild);
  }

  // Create new table object
  var currTable = new Object();
  currTable.data = [];
  currTable.errors = [];
  var resData = grid.getData();

  for(var i = 0; i< resData.length; i++){
    currTable.data[i]= [];
    for(var key in resData[i]){
      if(key != "id")
      currTable.data[i].push(resData[i][key]);
    }
  }

  // Create new blank row
  var newRow = new Array(currTable.data[0].length);
  for (var i = 0; i < newRow.length; i++) {
    newRow[i] = 0;
  }

  // Make sure first box of table is empty and pushes new row to table
  currTable.data[0][0] = " ";
  currTable.data.push(newRow);

  // Changes the first cell of each row into a labeled cell
  for (var i = 1; i < currTable.data.length; i++) {
    var tempInt =  (currTable.data.length-1);
    currTable.data[currTable.data.length-1][0] = "Row " + tempInt.toString();
  }

  // Creates a copy of the table
  oldGrid = [];
      for(var i = 0; i < grid.getData().length; i++){
        oldGrid[i] = [];
        for(var key in grid.getData()[i]){
          oldGrid[i].push(grid.getData()[i][key]);
        }
      }

  // Loads new table
  loadData(currTable);
  document.getElementById('tblContainer').style.width="100%";
 }

// Place a new column on the end of the existing table
var addColumn = function() {
  dataCount++;

  // If there is a change to the table, the next redos are no longer valid
  totalData.splice(dataCount, totalData.length - dataCount - 1);

  // Reset color list
  var colorlist = document.getElementById("colors");
  while(colorlist.firstChild){
    colorlist.removeChild(colorlist.firstChild);
  }

  // Creates new table object
  var currTable = new Object();
  currTable.data = [];
  currTable.errors = [];

  var resData = grid.getData();
    for(var i = 0; i< resData.length; i++){
      currTable.data[i]= [];
      for(var key in resData[i]){
        if(key != "id")
        currTable.data[i].push(resData[i][key]);
      }
    }

   // Creates a new column by adding one cell on the end of each row
  for (var i = 0; i < currTable.data.length; i++) {
    currTable.data[i].push(0);
  }

  // Changes any cell at the top of the table into a labeled cell
  currTable.data[0][currTable.data[0].length - 1] = "Label " + (currTable.data[0].length - 1);

  // Creates a copy of the table
  oldGrid = [];
    for(var i = 0; i < grid.getData().length; i++){
      oldGrid[i] = [];
      for(var key in grid.getData()[i]){
        oldGrid[i].push(grid.getData()[i][key]);
    }
  }

  // Loads new table
  loadData(currTable);
  document.getElementById('tblContainer').style.width="100%";

 }

 // Removes a row from the bottom of the table
var subtractRow = function() {
  dataCount++;

  // If there is a change to the table, the next redos are no longer valid
  totalData.splice(dataCount, totalData.length - dataCount - 1);

  // Reset color list
  var colorlist = document.getElementById("colors");
  while(colorlist.firstChild){
    colorlist.removeChild(colorlist.firstChild);
  }

  // Creates new table object
  var currTable = new Object();
  currTable.data = [];
  currTable.errors = [];

  var resData = grid.getData();
      for(var i = 0; i< resData.length; i++){
        currTable.data[i]= [];
        for(var key in resData[i]){
          if(key != "id")
          currTable.data[i].push(resData[i][key]);
        }
      }

  // Checks if the table is big enough to have a row removed without breaking the table and graph
  if (currTable.data.length > 2) {
    currTable.data.pop();
  }
  else {
    alert("No more rows can be deleted");
  }

  // Creates a copy of the table
  oldGrid = [];
  for(var i = 0; i < grid.getData().length; i++){
    oldGrid[i] = [];
    for(var key in grid.getData()[i]){
      oldGrid[i].push(grid.getData()[i][key]);
    }
  }

  // Loads new table
  loadData(currTable);
  document.getElementById('tblContainer').style.width="100%";
 }

var subtractColumn = function() {
  dataCount++;

  // If there is a change to the table, the next redos are no longer valid
  totalData.splice(dataCount, totalData.length - dataCount - 1);

  // Reset color list
  var colorlist = document.getElementById("colors");
  while(colorlist.firstChild){
    colorlist.removeChild(colorlist.firstChild);
  }

  // Creates new table object
  var currTable = new Object();
  currTable.data = [];
  currTable.errors = [];

  var resData = grid.getData();
      for(var i = 0; i< resData.length; i++){
        currTable.data[i]= [];
        for(var key in resData[i]){
          if(key != "id")
          currTable.data[i].push(resData[i][key]);
        }
      }

  // Subtracts a column by popping off the last cell of each row
  for (var i = 0; i < currTable.data.length; i++) {
    // Checks that there are enough columns to subtract from
    if (currTable.data[i].length > 3) {
      currTable.data[i].pop();
    }
    else {
      alert("No more columns can be deleted");
      break;
    }
  }

  // Creates a copy of the table
  oldGrid = [];
  for(var i = 0; i < grid.getData().length; i++){
    oldGrid[i] = [];
    for(var key in grid.getData()[i]){
      oldGrid[i].push(grid.getData()[i][key]);
    }
  }

  // Loads new table
  loadData(currTable);
  document.getElementById('tblContainer').style.width="100%";
 }


//Download CSV file of current chart
function download() {
var s;
//retrieve chart data and put into a csv file
if(type === "line" || type === "scatter"){
for (var i = 0; i < chart.data.datasets.length; i++) {
        for (var j = 0; j < chart.data.datasets[i].points.length; j++) {
            if (i === 0 && j === 0) {
                for (var k = 0; k < chart.data.datasets[i].points.length; k++) {
                    s += chart.data.datasets[i].points[k].label;
                    if (k + 1 < chart.data.datasets[i].points.length) s += ",";
                }
                s += "\n";
            }
            s += chart.data.datasets[i].points[j].value;
            if (j + 1 < chart.data.datasets[i].points.length) s += ",";
        }
        s += "\n";
    }
}
else if (type === "bar") {
    for (var i = 0; i < chart.data.datasets.length; i++) {
        for (var j = 0; j < chart.data.datasets[i].bars.length; j++) {
            if (i === 0 && j === 0) {
                for (var k = 0; k < chart.data.datasets[i].bars.length; k++) {
                    s += chart.data.datasets[i].bars[k].label;
                    if (k + 1 < chart.data.datasets[i].bars.length) s += ",";
                }
                s += "\n";
            }
            s += chart.data.datasets[i].bars[j].value;
            if (j + 1 < chart.data.datasets[i].bars.length) s += ",";
        }
        s += "\n";
    }

}
s = s.substring(9); //Do this to remove strange 'undefined' that is appended to beginning of file
var ajaxurl = 'php/ajax.php',
data = {'action':s};
//Post request to generate csv file
$.post(ajaxurl,data,function (response){
console.log("hello");
//Open new window which will commence download of generated file
console.log(response);
window.open('php/'+response);
});
return s;
}

//Delete a certain number (skip) of columns in the graph starting at a certain point (start)
function removeColumns(start,skip){
  if (start === 0 || skip === 0) {
    return;
  }
  var currTable = new Object();
  currTable.data = [];
  currTable.errors = [];
  var tempData = [];
  var resData = grid.getData();
  var k = 0;
  for(var key in resData[0]){
    k++;
  }
 for(var i = 0; i< resData.length; i++){
    currTable.data[i] = [];
    for(var j = 0; j<k; j++){
      if(j>=start){
        if(j=== start){
          j += skip;
        }
        var key = (j-skip).toString();
        currTable.data[i].push(resData[i][j]);
      }
      else{
        var key = j.toString();
        currTable.data[i].push(resData[i][j]);
      }
    }
  }
  currTable.data[0].pop();

   for(var i = start; i < currTable.data[0].length;i++) {
    if (currTable.data[0][i].substring(0, 6) === ("Label ")) {
      currTable.data[0][i] = "Label " + i;
    }
   }

  loadData(currTable);
  changeType();
  document.getElementById('tblContainer').style.width = "100%";
}
//Delete a certain number (skip) of rows in the graph starting at a certain point (start)
function removeRows(start,skip){
  if(start === 0 || skip ===0){
    return;
  }
  hidden.splice(start,skip);
  oldData.splice(start,skip);
  var currTable = new Object();
  currTable.data = [];
  currTable.errors = [];
  var tempData = [];
  var resData = grid.getData();
  var k = 0;
  for(var key in resData[0]){
    k++;
  }
  currTable.data[0] = [];
  for(var key in resData[0]){
    currTable.data[0].push(resData[0][key]);
  }
  currTable.data[0].pop();
  if(start === resData.length-1){
    resData.length-=1;
  }
 for(var i = 1 ; i< resData.length; i++){
    if(i < start){
      currTable.data[i] = [];
    }
    else{
      if(i === start){
          i += skip;
        }
      currTable.data[i-skip] = [];
    }
    for(var j = 0; j<k; j++){
      if(i>=start){
        if(resData[i][j]!= undefined)
        currTable.data[i-skip].push(resData[i][j]);
      }
      else{
        if(resData[i][j] != undefined)
        currTable.data[i].push(resData[i][j]);}
      }
    }

    for(var i = start; i < currTable.data.length; i++) {
      if (currTable.data[i][0].substring(0, 4) === ("Row ")) {
        currTable.data[i][0] = "Row " + i;
      }
    }
  loadData(currTable);
  changeType();
}
