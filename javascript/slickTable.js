"use strict"; // strict mode syntax
var grid = null;
var oldGrid = null;
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

    // Copy of data in the grid as an array
	updateGrid();
	holdData(oldGrid);
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
			chart.scale.xLabels[col -1] = newVal;
			if(type === "scatter" ){
				//need to change all labels in the dataset
				for(var i = 0; i < chart.datasets.length; i++){
					chart.datasets[i].points[col-1].label = newVal;
				}
			}
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
			if(type ==="bar"){
				if(chart.datasets[row-1].bars)
					chart.datasets[row-1].bars[col - 1].value = newVal;
				else
					oldData[row-1].bars[col-1].value = newVal;
			}
			else{
				if(chart.datasets[row-1].points)
					chart.datasets[row-1].points[col - 1].value = newVal;
				else
					oldData[row-1].points[col-1].value = newVal;
			}
		}
		// If not, revert to old value (from chart)
		else {
			var oldVal = chart.datasets[row-1].points[col - 1].value;
			grid.getData()[row][col] = oldVal;
		}

		//update chart and overlay

	    holdData(oldGrid);
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
		if (k > 3) { // Check if there are enough columns to have one removed
			if(grid.getData()[0][i]===""){
				if(confirm("Delete column " + i + "?")){	//Confirm with user
					removeColumns(i,1);	//Remove if confirmed
					totalData.pop();
					totalData.splice(totalData.length-2, 1);
					if(grid.getCellNode(0,i)!= null)
						grid.gotoCell(0,i);
					else{
						grid.gotoCell(0,i-1);
					}
				}
				else{
					grid.gotoCell(0, i);
					grid.getData()[0][i] = oldGrid[0][i];	//Set back to default value if not
					chart.scale.xLabels[i-1] = oldGrid[0][i];
					totalData.pop();
				}
			}
		} 
		// Reset column label if the graph isn't big 
		else if (grid.getData()[0][i] === "") {
			alert("Not enough columns to remove!"); // Error message for when there aren't enough columns
			grid.gotoCell(0, i);
			grid.getData()[0][i] = oldGrid[0][i];
			chart.scale.xLabels[i-1] = oldGrid[0][i];
			totalData.pop();
		}
	}

	//Check for rows to remove
	for(var i = 0; i < grid.getData().length; i++){ 
		if(grid.getData().length - 1 >= 2) { // Check if there are enough rows to have one removed
			if(grid.getData()[i][0]===""){
				if(confirm("Delete row " + i + "?")){	//Confirm with user
					removeRows(i,1);	//Remove if confirmed
					totalData.pop();
					totalData.splice(totalData.length-2, 1);
					if(grid.getCellNode(i,0)!= null)
						grid.gotoCell(i,0);
					else{
						grid.gotoCell(i-1,0);
					}
				}
				else{
					grid.gotoCell(i, 0);
					grid.getData()[i][0] = oldGrid[i][0];	//Set back to default value if not
					totalData.pop()
				}
			}
		} 
		// Reset row label if the graph isn' big enough
		else if (grid.getData()[i][0] === "") {
			alert("Not enough rows to remove!");
			grid.gotoCell(i, 0);
			grid.getData()[i][0] = oldGrid[i][0];
			totalData.pop();
		}
	}
	
	updateGrid();
    chart.update();
	document.getElementById('tblContainer').style.width="100%";
}

// Update data grid array
function updateGrid() {
	oldGrid = [];
	for(var i = 0; i < grid.getData().length; i++){
		oldGrid[i] = [];
		for(var key in grid.getData()[i]){
			oldGrid[i].push(grid.getData()[i][key]);
		}
		oldGrid[i].pop();
	}
}

// Holds old data going back five times plus the most recent data
function holdData(newData) {
	if (totalData.length <= 9) {
		totalData.push(newData);
	}
	else {
		totalData.splice(0, 1);
		totalData.push(newData);
	}
}

// Goes back one in the totaldata set
function undo() {
	// Checks if any changes have been recorded
	if (totalData.length > 1) {
		var prevData = totalData[totalData.length-2];
		var dataBack = {
			data: [],
			errors: [],
			meta: {}
		};

		// Add row back into the table
		if (oldGrid.length < prevData.length) {
			dataBack.data = prevData;
			updateGrid();
			loadData(dataBack);
			totalData.pop();
		}
		// Subtract bottom row from table
		else if (oldGrid.length > prevData.length) {
			subtractRow();
			updateGrid();
			totalData.pop();
		}
		else {
			// Resets any value changes back one set of data
			for (var i = 0; i < prevData.length; i++) {
				// Add column back into table
				if (oldGrid[i].length < prevData[i].length) {
					dataBack.data = prevData;
					updateGrid();
					loadData(dataBack);
					totalData.pop();
					break;
				} 
				else if (oldGrid[i].length > prevData[i].length) {
					subtractColumn();
					updateGrid();
					totalData.pop();
					break;
				}
				else {
					for (var j = 0; j < prevData[i].length; j++) {
						grid.getData()[i][j] = prevData[i][j];
						updateGrid();
						if (i === 0) {
							chart.scale.xLabels[j-1] = grid.getData()[0][j];
						} 
						else if (i >= 1 && j >= 1) {
							player.changeLine(i-1,j - 1, grid.getData()[i][j]);
								if(type ==="bar")
									chart.datasets[i - 1].bars[j - 1].value = grid.getData()[i][j];
								else
									chart.datasets[i - 1].points[j - 1].value = grid.getData()[i][j];
							}
						// Tabs through all the cells to visually reset data
						grid.gotoCell(i, j);
					}
				}
			}
		}
		// Gets rid of the data set reverted from 
		totalData.pop();
		// Places focus back into the table
		grid.gotoCell(0, 0);
	} 
	// Lets the user know that they have undone as far as they can
	else {
		alert("No more undos!");
	}

	// Updates everything
	updateGrid();
	chart.update();
	summary.update();
	document.getElementById('tblContainer').style.width = "100%";
} 

function redo() {
	// Find the data next in the list to the current data
	var nextData = totalData[totalData.length-1];

	// Add row back to table

	// Add column back to table

	// Subtract row from table

	// Subtract column from table

	// Check number values and reset
}











