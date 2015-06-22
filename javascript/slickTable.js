"use strict"; // strict mode syntax
var grid = null;

var ColumnWidth = 130; //** CHANGE THIS TO CHANGE COLUMN WIDTH! **

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
			width: ColumnWidth,
			editor: Slick.Editors.Text,
			minWidth: ColumnWidth, //sets range for width of columns
			maxWidth: ColumnWidth
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

	//Dynamic Container Width
	//NOTE: To change the Column Width of the table please change "ColumnWidth" at the top of the file!
	var container = document.getElementById('tblContainer');
	var maxCol = Math.floor(800/ColumnWidth); //800 is maximum acceptable size for the table's container
	var maxContainerWidthNum = ColumnWidth * maxCol;
	var ContainerWidthNum;

	//Logic for Dynamic Container Width
    if (fileData[0].length < maxCol)
    	ContainerWidthNum = fileData[0].length * ColumnWidth; // max/min width (130)
    else if (fileData[0].length >= maxCol)
    	ContainerWidthNum = maxContainerWidthNum;
    var ContainerWidthString = ContainerWidthNum + "px";
   	container.setAttribute("style", "width:" + ContainerWidthString);

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
			}
			setTimeout(function(){ checkRemove(); }, 1);
		}

		// not a label - check to see if it's a number.
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
		// If not, revert to old value (from chart)
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
			if(confirm("Delete column " + i + "?")){	//Confirm with user
				removeColumns(i,1);	//Remove is confirmed
				if(grid.getCellNode(0,i)!= null)
					grid.gotoCell(0,i);
				else{
					grid.gotoCell(0,i-1);
				}
			}
			else
				grid.getData()[0][i] = i;	//Set back to default value if not
		}
	}
	//Check for rows to remove
	for(var i = 0; i < grid.getData().length; i++){
		if(grid.getData()[i][0]===""){
			if(confirm("Delete row " + i + "?")){	//Confirm with user
				removeRows(i,1);	//Remove if confirmed
				if(grid.getCellNode(i,0)!= null)
					grid.gotoCell(i,0);
				else{
					grid.gotoCell(i-1,0);
				}
			}
			else
				grid.getData()[i][0] = i;	//Set back to default value if not
		}
	}
	document.getElementById('tblContainer').style.width="100%";
}
