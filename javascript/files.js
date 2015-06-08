"use strict"; // strict mode syntax
// Opens a file
var ev;
var openFile = function(openfile) {
  ev = openfile;
  //event = jQuery.extend(true,{},openFile);
  console.log(ev);
  Alert.render("Choose a type of graph: ");
};

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
