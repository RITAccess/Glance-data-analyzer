"use strict"; // strict mode syntax
var grid = null;
var oldGrid = null;
var dataCount = 0;
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
	// if(data && data[0][0]!=" "){
 //   		for(var key in data[0]){
 //   			//data[0].insert(0," ");
 //   			data[0][key +1] = data[0][key];
 //   		}
 //   		data[0][0] = " ";
 //   		for(var i = 1; i<data.length; i++){
 //   			for(var key in data[i]){
 //   				//data[i].insert(0,"Row " + i);
 //   				data[i][key +1] = data[i][key];
 //   			}
 //   			data[i][0] = "Row " + i;
 //   		}
 //   	}
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
		if(oldGrid[row][col] != newVal){
		// if a label
		if (row == 0 || col == 0){
			if(newVal.length > 22){
				newVal = newVal.substring(0,19)+"...";
			}
			chart.data.labels[col -1] = newVal;
			if(type === "scatter" ){
				//need to change all labels in the dataset
				for(var i = 0; i < chart.data.datasets.length; i++){
					chart.data.datasets[i].points[col-1].label = newVal;
				}
			}
			if(row === 0 && document.getElementById("colSelector")){
				var childrenArray = $('#colSelector').children().toArray();
				childrenArray[col-1].innerHTML = newVal;
			}
			if (col === 0) {
				grid.getData()[0][0] = " ";
			}
			updateRowDropDown();
			setTimeout(function(){ checkRemove(); }, 1);
		}

		// not a label - check to see if it's a number.
		else if (((!isNaN(newVal)) || newVal.charAt(0) == '=') && (newVal != "")){
			if(newVal.charAt(0) == '='){
				var str = newVal.slice(1);
				newVal = evaluate(str);
				if(!isNaN(newVal) && isFinite(newVal)){ //a legit result is returned....
					grid.getData()[row][col] = newVal;
				}
				else{ //revert back to old value
					newVal = chart.data.datasets[row-1].data[col - 1];
					grid.getData()[row][col] = newVal;
				}
			}

			//Update audio with new value
			player.changeLine(row-1,col - 1,newVal);
			// change value in chart
			if(type ==="scatter"){
				if(chart.data.datasets[row-1].data)
					chart.data.datasets[row-1].data[col - 1].y = parseFloat(newVal);
				else
					oldData[row-1].data[col-1].y = parseFloat(newVal);
			}
			else{
				if(chart.data.datasets[row-1].data)
					chart.data.datasets[row-1].data[col - 1] = parseFloat(newVal);
				else
					oldData[row-1].data[col-1] = parseFloat(newVal);
			}
			
		}
		// If not, revert to old value (from chart)
		else {
			if(type === "scatter"){
				var oldVal = chart.data.datasets[row-1].data[col - 1];
				grid.getData()[row][col] = oldVal.y;
			}
			else{
				var oldVal = chart.data.datasets[row-1].data[col - 1];
				grid.getData()[row][col] = oldVal;
			}
		}

		// If there is a change to the table, the next redos are no longer valid
		totalData.splice(dataCount, totalData.length - dataCount - 1);

		//update chart and overlay
		updateGrid();
		holdData(oldGrid);
	    dataCount++;
		chart.update();
		overlay.updateSize(chart);
		summary.update();
		overlay.updateSize(chart);
		overlay.updateSize(chart);
		overlay.updateSize(chart);
		overlay.updateSize(chart);
	}
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
					grid.getData()[0][i] = totalData[totalData.length-2][0][i];	//Set back to default value if not
					chart.scale.xLabels[i-1] = totalData[totalData.length-2][0][i];
					totalData.pop();
					totalData.splice(totalData.length-1, 1);
				}
			}
		}
		// Reset column label if the graph isn't big
		else if (grid.getData()[0][i] === "") {
			alert("Not enough columns to remove!"); // Error message for when there aren't enough columns
			grid.gotoCell(0, i);
			grid.getData()[0][i] = totalData[totalData.length-2][0][i];
			chart.scale.xLabels[i-1] = totalData[totalData.length-2][0][i];
			totalData.pop();
			totalData.splice(totalData.length-1, 1);
		}
	}

	//Check for rows to remove
	for(var i = 1; i < grid.getData().length; i++){
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
					grid.getData()[i][0] = totalData[totalData.length-2][i][0];	//Set back to default value if not
					totalData.pop();
					totalData.splice(totalData.length-1, 1);
				}
			}
		}
		// Reset row label if the graph isn' big enough
		else if (grid.getData()[i][0] === "") {
			alert("Not enough rows to remove!");
			grid.gotoCell(i, 0);
			grid.getData()[i][0] = totalData[totalData.length-2][i][0];
			totalData.pop();
			totalData.splice(totalData.length-1, 1);
		}
	}

	holdData(oldGrid);
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
	if (totalData.length <= 14) {
		totalData.push(newData);
	}
	else {
		totalData.splice(0, 1);
		totalData.push(newData);
	}
}

// Goes back one in the totaldata set
function undo() {
	if (dataCount > 14) {
		dataCount = 14;
	}
	//Checks if there is a previous value
	if (dataCount >= 1) {
		var prevData = totalData[dataCount-1];
		var dataBack = {
			data: [],
			errors: [],
			meta: {}
		};
		// Reset for a change in number of rows
		if (oldGrid.length != prevData.length) {
			dataBack.data = prevData;
			loadData(dataBack);
			totalData.pop();
		}
		else {
			for (var i = 0; i < prevData.length; i++) {
				// Reset for a change in number of columns
				if (oldGrid[i].length != prevData[i].length) {
					dataBack.data = prevData;
					loadData(dataBack);
					totalData.pop();
					break;
				}
				// Resets any value changes back one set of data
				else {
					for (var j = 0; j < prevData[i].length; j++) {
						grid.getData()[i][j] = prevData[i][j];
						if (i === 0) {
							chart.data.labels[j-1] = grid.getData()[0][j];
						}
						else if (i >= 1 && j >= 1) {
							player.changeLine(i-1,j - 1, grid.getData()[i][j]);
								if(type ==="scatter")
									chart.data.datasets[i - 1].data[j - 1].y = grid.getData()[i][j];
								else
									chart.data.datasets[i - 1].data[j - 1] = grid.getData()[i][j];
							}
						// Tabs through all the cells to visually reset data
						grid.gotoCell(i, j);
					}
				}
			}
		}
		// Places focus back into the table
		grid.gotoCell(0, 0);
		dataCount--;
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
	var nextData = totalData[dataCount + 1];

	//Check if there is a value in the next index to revert to
	if (dataCount + 1 <= totalData.length-1) {
		var dataBack = {
			data: [],
			errors: [],
			meta: {}
		};
		// Reset for a change in number of table rows
		if (oldGrid.length != nextData.length) {
			dataBack.data = nextData;
			loadData(dataBack);
			totalData.pop();
		}
		else {
			for (var i = 0; i < nextData.length; i++) {
				// Reset for a change in number of table columns
				if(oldGrid[i].length != nextData[i].length) {
					dataBack.data = nextData;
					loadData(dataBack);
					totalData.pop();
					break;
				}
				// Reset a changed table value
				else {
					for (var j = 0; j < nextData[i].length; j++) {
						grid.getData()[i][j] = nextData[i][j];
						if (i === 0) {
							chart.data.labels[j-1] = grid.getData()[0][j];
						}
						else if(i >= 1 && j >= 1) {
							player.changeLine(i-1, j-1, grid.getData()[i][j]);
							if (type==="scatter")
								chart.data.datasets[i-1].data[j-1].y = grid.getData()[i][j];
							else
								chart.data.datasets[i-1].data[j-1] = grid.getData()[i][j];
						}
						grid.gotoCell(i, j);
					}
				}
			}
		}

		dataCount++;
		grid.gotoCell(0, 0);
	}
	// Let's user know that they have redo as far as possible
	else {
		alert("No more redos!");
	}
	// Updates everything
	updateGrid();
	chart.update();
	summary.update();
	document.getElementById('tblContainer').style.width = "100%";
}

// regex evaluation for table
// @author erl7902
function evaluate(x) {
	// rm spaces
    x = x.replace(/ /g, "");
	x = x.split(/([-+/*^()])/g);
    x = x.filter(function(value){ return value !== ''; });
	// search for negative signs vs minus
	// no cleaner way of doing it
	for(var i = 0; i < x.length; i++){
		if(x[i] === '-'){
			if((isNaN(x[i-1]) && x[i-1] != ')') && !isNaN(x[i+1])){
				//prep the number
				var num = (parseFloat(x[i+1]) * -1);
				x = x.slice(0,i).concat([num].concat(x.slice(i+2, x.length)));
			}
		}
	}
    return (parseFloat(evall(x)[0]));
}

function evall(x) {
	var start = x.indexOf('(');
	var end = x.lastIndexOf(')');
	if (start != -1 && end != -1){
		var result = evall(x.slice(start+1,end));
		x = x.slice(0,start).concat(result.concat(x.slice(end+1, x.length)));
	}

	end = x.length;
	while((/[\^\+\-\/\*]/.test(x)) && x.length > 1){
		while(/\^/.test(x)){
			var op = x.indexOf('^');
			x = x.slice(0,(op-1 > 0 ? op-1 : 0)).concat([Math.pow(x[op-1],x[op+1])]).concat(x.slice(op+2,end));
			// console.log("exp");
			// console.log(x);
		}
		while(/\//.test(x)){
			var op = x.indexOf('/');
			x = x.slice(0,(op-1 > 0 ? op-1 : 0)).concat([(parseFloat(x[op-1]) / parseFloat(x[op+1]))].concat(x.slice(op+2,end)));
			// console.log("/");
			// console.log(x);
			if(x.indexOf(NaN)){
				return x;
			}
			}
		while(/\*/.test(x)){
			var op = x.indexOf('*');
			x = x.slice(0,(op-1 > 0 ? op-1 : 0)).concat([(parseFloat(x[op-1]) * parseFloat(x[op+1]))].concat(x.slice(op+2,end)));
			// console.log("*");
			// console.log(x);
		}
		while(/\+/.test(x)){
			var op = x.indexOf('+');
			x = x.slice(0,(op-1 > 0 ? op-1 : 0)).concat([(parseFloat(x[op-1]) + parseFloat(x[op+1]))].concat(x.slice(op+2,end)));
			// console.log("+");
			// console.log(x);
		}
		while(/\-/.test(x)  && /\-(?!\d+)/.test(x)){
			var op = x.indexOf('-');
			x = x.slice(0,(op-1 > 0 ? op-1 : 0)).concat([(parseFloat(x[op-1]) - parseFloat(x[op+1]))].concat(x.slice(op+2,end)));
			// console.log("-");
			// console.log(x);
		}
	}
  return x;
}

function tableReset() {
	if (dataCount != 0) {
		var reset = confirm("You cannot undo a reset!");
		if (reset === true) {
			var dataBack = {
				data: [],
				errors: [],
				meta: {}
			};
			dataBack.data = firstData;
			loadData(dataBack);
			dataCount = 0;
			totalData.splice(dataCount, totalData.length - dataCount - 1);
		}
	}
	else {
		alert("You cannot reset!");
	}
}
