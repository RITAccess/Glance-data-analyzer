"use strict"; // strict mode syntax
var grid = null; 
// initial table properties, after getting the data from the file.
var loadSlickTable = function(fileData){
	var c1 = document.getElementById('slickTable');
	console.log(c1);
	//var grid;
	var data = [];
	var columns = [];
	var w = 66//parseInt(800 / (fileData[0].length)); //width divided between columns
	console.log(w);
	//now we push the values of the columns into the grid
	for(var i = 0; i < fileData[0].length; i++){
		columns.push({
			id: i,
			name: fileData[0][i],
			field: i,
			width: w,
			editor: Slick.Editors.Integer
		});
	}

  // set options for the table
  var options = {
	editable: true, //allows the table to be edited
    enableCellNavigation: true, //tabbable
    enableColumnReorder: false,
	autoHeight: true
  };

  $(function () {
	
	/*for(var i = 1; i < fileData.length-1; i++){
			for(var j = 0; j < columns.length; j++){
				data[i*columns.length + j] = fileData[i][j];
			}
	}*/
	
    for (var i = 0; i < fileData.length-1; i++) {
			//console.log(fileData[i+1]);
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

var linkSlickTable = function(chart, player, overlay, summary){
	grid.onCellChange.subscribe(function (e, args) {
		/*
		console.log(args) prints out....
		Object {row: (row #) , cell: (column #), item: Object, grid: SlickGrid}
		*/
		//need the +1 because the chart has the labels in the dataset (maybe?)
		var row = args.row + 1;
		var col = args.cell;
		var newVal = grid.getData()[row-1][col];
		console.log(row + "," + col + ":" + newVal);
		
		//changes[changeNum] = [row, col, old, new]
		
		//Update audio with new value
		//AudioPlayer.prototype.changeLine = function(line, index, newValue)
        //player.changeLine(row,col,newVal);
        // change value in chart
        chart.datasets[row].points[col].value = newVal;
		
		chart.update();
        overlay.updateSize(chart);
        
	});
}