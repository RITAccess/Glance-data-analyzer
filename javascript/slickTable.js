"use strict"; // strict mode syntax
var grid = null; 
// initial table properties, after getting the data from the file.
var loadSlickTable = function(fileData){
	var c1 = document.getElementById('slickTable');
	//console.log(c1);
	//var grid;
	var data = [];
	var columns = [];
	var w = 66 //default width
	//console.log(w);
	//now we push the values of the columns into the grid
	for(var i = 0; i < fileData[0].length; i++){
		columns.push({
			id: i,
			name: fileData[0][i],
			field: i,
			width: w,
			editor: Slick.Editors.Integer,
			minWidth: 60,
			maxWidth: 80
		});
	}

  // set options for the table
  var options = {
	editable: true, //allows the table to be edited
    enableCellNavigation: true, //tabbable
    enableColumnReorder: false,
	autoHeight: true,
	forceFitColumns: true,
	fullWidthRows: true
  };

  $(function () {
	
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
		var row = args.row;
		var col = args.cell;
		var newVal = grid.getData()[row][col];
		//console.log(row + "," + col + ":" + newVal);
		
		//Update audio with new value
		//AudioPlayer.prototype.changeLine = function(line, index, newValue)
		//calls arrayCollection.changeLine(line,index,newValue);
		//'rows' in the audio player include the labels? 
        player.changeLine(row,col,newVal);
        // change value in chart
        chart.datasets[row].points[col].value = newVal;
		
		chart.update();
        overlay.updateSize(chart);
        
	});
}