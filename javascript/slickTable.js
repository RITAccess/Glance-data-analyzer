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
			minWidth: 80, //sets range for width of columns
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
	rowHeight: 28
  };

  $(function () {
	// adding in the data to the grid
    for (var i = 0; i < fileData.length; i++) {
			var d = (data[i] = {});
			d["id"] = i;
			for(var j = 0; j < columns.length; j++){
				if(i > 0 && j > 0){
						d[j] = parseFloat(fileData[i][j]);
				}
				else {
					d[j] = fileData[i][j];
				}
			}
	}

	//Dynamic container width
	var container = document.getElementById('tblContainer')
	var cwidthNum;
    if (fileData[0].length < 9)
    	cwidthNum = fileData[0].length * 80; // max/min width (80)
    else if (fileData[0].length >= 9)
    	cwidthNum = 100
    var cwidthString = cwidthNum + "%";
   	container.setAttribute("style", "width:" + cwidthString);

   	//Grid creation
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
		if (row == 0 || col == 0){
			chart.scale.xLabels[col - 1] = newVal;
			if (col === 0) {
				grid.getData()[0][0] = " ";
				//console.log("Hi there");
			}
			setTimeout(function(){ checkRemove(); }, 1);	
		}

		// not a label - check to see if it's a number.
		// If not, do nothing
		else if ((!isNaN(newVal)) && (newVal != "")){
			newVal = parseFloat(newVal);
			//Update audio with new value
			player.changeLine(row-1,col - 1,newVal);
			// change value in chart
			if(type ==="bar")
				chart.datasets[row-1].bars[col - 1].value = newVal;
			else
				chart.datasets[row-1].points[col - 1].value = newVal;
		}
		else {
			var oldVal = chart.datasets[row-1].points[col - 1].value;
			grid.getData()[row][col] = oldVal;
			console.log(grid.getData()[row][col]);
		}

		//update chart and overlay
		chart.update();
		summary.update();
	});
}

//Hides slick grid header bars
function fixSlick(){
	var e = document.getElementById('slickTable').firstChild.nextSibling.firstChild;
	var c = e.firstChild;
	//Loop through slickgrid headers
	while(c){
		c.style.display="none";
		c = c.nextSibling;
	}
}

/*Checks first elements of rows and columns to see if there are any
* blank labels, indicating removal.
*/
function checkRemove(){
	var k = 0;
	//Get number of keys in grid data item
	for(var key in grid.getData()[0]){
		if(key != "id")
		k++;
	}
	//Check for columns to remove
	for(var i = 1; i < k; i++){
		if(grid.getData()[0][i]===""){
			if(confirm("Delete column " + i + "?"))	//Confirm with user
				removeColumns(i,1);	//Remove is confirmed
			else
				grid.getData()[0][i] = i;	//Set back to default value if not
		}
	}
	//Check for rows to remove
	for(var i = 0; i < grid.getData().length; i++){
		if(grid.getData()[i][0]===""){
			if(confirm("Delete row " + i + "?"))	//Confirm with user
				removeRows(i,1);	//Remove if confirmed
			else
				grid.getData()[i][0] = i;	//Set back to default value if not
		}
	}
}