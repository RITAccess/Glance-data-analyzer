"use strict"; // strict mode syntax

// initial table properties, after getting the data from the file.
var loadSlickTable = function(fileData){
	var c1 = document.getElementById('slickTable');
	var grid;
	var data = [];
	var columns = [];
	//now we push the values of the columns into the grid
	for(var i = 0; i < fileData[0].length; i++){
		columns.push({
			id: i,
			name: fileData[0][i],
			field: i,
			width: 60,
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
			for(var j = 0; j < columns.length-1; j++){
				console.log(fileData[i+1][j]);
				d[j] = parseInt(fileData[i+1][j]);
			}
	  }
    grid = new Slick.Grid(c1, data, columns, options);
  });
  return grid;
}