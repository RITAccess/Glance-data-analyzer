"use strict"; // strict mode syntax
var grid = null; 
// initial table properties, after getting the data from the file.
var loadSlickTable = function(fileData){
	var c1 = document.getElementById('slickTable');
	var data = [];
	var columns = [];
	var w = 66 //default width
	//now we push the values of the columns into the grid
	for(var i = 0; i < fileData[0].length; i++){
		columns.push({
			id: i,
			name: '',
			field: i,
			width: w,
			editor: Slick.Editors.Text,
			minWidth: 60, //sets range for width of columns
			maxWidth: 80
		});
	}

  // set options for the table
  var options = {
	editable: true, //allows the table to be edited
    enableCellNavigation: true, //tabbable
    enableColumnReorder: false,
	autoHeight: true, //these three just make the
	forceFitColumns: true, //table look nice/fit
	fullWidthRows: true,
  };

  $(function () {
	// adding in the data to the grid
    for (var i = 0; i < fileData.length; i++) {
			var d = (data[i] = {});
			d["id"] = i;
			for(var j = 0; j < columns.length; j++){
				if(i > 0){
					d[j] = parseInt(fileData[i][j]);
				}
				else {
					d[j] = fileData[i][j];
				}
			}
	}
    grid = new Slick.Grid(c1, data, columns, options);
  });
  return grid;
}

var linkSlickTable = function(chart, player, overlay, summary){
	grid.onCellChange.subscribe(function (e, args) {
		//args = Object {row: (row #) , cell: (column #), item: Object, grid: SlickGrid}
		var row = args.row;
		var col = args.cell;
		var newVal = grid.getData()[row][col];
		
		// if a label 
		if (row == 0){			
			chart.scale.xLabels[col] = newVal;
		}
		// not a label - check to see if it's a number. 
		// If not, do nothing
		else if ((!isNaN(newVal)) && (newVal != "")){
			newVal = parseInt(newVal);
			//Update audio with new value
			player.changeLine(row-1,col,newVal);
			// change value in chart
			chart.datasets[row-1].points[col].value = newVal;
		}
		//update chart and overlay
		chart.update();
		summary.update();
        	//overlay.updateSize(chart); 
	});
}
