"use strict"; // strict mode syntax

// initial table properties, after getting the data from the file.
var loadSlickTable = function(fileData){
	var c1 = document.getElementById('slickTable');
	var grid;
	var data = [];
	var columns = [];
	var w = parseInt(800 / (fileData[0].length)); //width divided between columns
	console.log(w);
	//now we push the values of the columns into the grid
	for(var i = 0; i < fileData[0].length; i++){
		columns.push({
			id: i,
			name: fileData[0][i],
			field: i,
			width: 66,
			editor: Slick.Editors.Integer
		
		});
	}

  // set options for the table
  var options = {
	editable: true, //allows the table to be edited
    enableCellNavigation: true, //tabbable
    enableColumnReorder: false
  };

  $(function () {
	
    for (var i = 0; i < fileData.length-1; i++) {
			console.log(fileData[i+1]);
			var d = (data[i] = {});
			d["id"] = i;
			for(var j = 0; j < columns.length; j++){
				//console.log(fileData[i+1][j]);
				d[j] = parseInt(fileData[i+1][j]);
			}
	}
    grid = new Slick.Grid(c1, data, columns, options);
  });
  return grid;
}