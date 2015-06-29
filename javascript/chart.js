"use strict"; // strict mode syntax
var hidden = [];
var oldData = [];
var loadChart = function(data, type, collection){
	/*
	Using Chart.js
	*/
	var data1 = data;
	data1[0].splice(0, 1);
	var chartdata = dataset(data1, collection);
	var data = {
		labels: data1[0],
		datasetFill: false,
		datasets: chartdata.data
	};

	var ctx = document.getElementById("myChart").getContext("2d");
	var myLineChart;
	if(type === "scatter")
		myLineChart = new Chart(ctx).ScatterPlot(data);
	else if(type === "bar")
		myLineChart = new Chart(ctx).Bar(data);
	else
	  myLineChart = new Chart(ctx).Line(data);
	document.getElementById("myChart").setAttribute("title","image of graph"); // by setting the attribute we can make the chart accessible
	for(var i =0; i<data.datasets.length;i++){
		//Setting input functions for each line in order to set new colors
		chartdata.inputboxes[i].oninput = function(){
			var index = chartdata.inputboxes.indexOf(this);
			var newcolor = this.value;
				//Regex check for correctly formatted RGB color value
				if(/^#[0-9A-F]{6}$/i.test(newcolor)){
					//If test passes, parse out red, green, and blue.
					var r = parseInt(newcolor.substring(1,3), 16);
					var g = parseInt(newcolor.substring(3,5), 16);
					var b = parseInt(newcolor.substring(5), 16);
					//Combine them to make a new color
					var color = [r, g, b].join(", ");
					lineColors[index] = "rgba("+ color +", 1)";
					if(this.nextSibling.checked){
						//Set necessary color values based on graph type
						if(type==="line" || type==="scatter")
							chart.datasets[index].strokeColor = "rgba("+ color +", 1)";
							chart.datasets[index].pointColor = "rgba("+ color +", 1)";
							chart.datasets[index].pointHighlightStroke = "rgba("+ color +", 1)";
						if(type==="line"|| type==="scatter"){
							for(var i = 0; i<chart.datasets[index].points.length;i++){
								chart.datasets[index].points[i].fillColor= "rgba("+ color +", 1)";
							}
						}
						else if(type==="bar"){
							for(var i = 0; i<chart.datasets[index].bars.length;i++){
								chart.datasets[index].bars[i].fillColor= "rgba("+ color +", 1)";
								chart.datasets[index].bars[i].strokeColor= "rgba("+ color +", 1)";
							}
						}
						//Redraw graph
						chart.update();
					}
					//Set Graph data color indication color to match new color
					if(type === "line" || type === "scatter")
						this.parentNode.firstChild.nextSibling.nextSibling.setAttribute("style", "color:rgb(" + color + "); display: inline; margine-right: 5px;");
					else if(type === "bar")
						this.parentNode.firstChild.nextSibling.nextSibling.firstChild.setAttribute("style", "background:rgb(" + color + "); display: inline; margine-right: 5px;");
				}
				//Check color list for name match
				else if(/^#[0-9A-F]{6}$/i.test(colors[newcolor.toLowerCase().split(' ').join('')])){
					//If there is a match, get red, green, and blue values from the corresponding color
					var rgb = colors[newcolor.toLowerCase().split(' ').join('')];
					var r = parseInt(rgb.substring(1,3), 16);
					var g = parseInt(rgb.substring(3,5), 16);
					var b = parseInt(rgb.substring(5), 16);
					//Using red, green, and blue values, make a new color.
					var color = [r, g, b].join(", ");
          			lineColors[index] = "rgba("+ color +", 1)";
					if(this.nextSibling.checked){
						//Set necessary colors based on graph type
            			if(type==="line")
            			chart.datasets[index].strokeColor = "rgba("+ color +", 1)";
						chart.datasets[index].pointColor = "rgba("+ color +", 1)";
						chart.datasets[index].pointHighlightStroke = "rgba("+ color +", 1)";
						if(type==="line" || type==="scatter"){
							for(var i = 0; i<chart.datasets[index].points.length;i++){
								chart.datasets[index].points[i].fillColor= "rgba("+ color +", 1)";
							}
						}
						else if(type==="bar"){
							for(var i = 0; i<chart.datasets[index].bars.length;i++){
								chart.datasets[index].bars[i].fillColor= "rgba("+ color +", 1)";
								chart.datasets[index].bars[i].strokeColor= "rgba("+ color +", 1)";
							}
						}
						//Redraw graph
						chart.update();
					}
					//Set graph data color indicator
					if(type === "line" || type==="scatter")
						this.parentNode.firstChild.nextSibling.nextSibling.setAttribute("style", "color:rgb(" + color + "); display: inline; margine-right: 5px;");
					else if(type === "bar")
						this.parentNode.firstChild.nextSibling.nextSibling.firstChild.setAttribute("style", "background:rgb(" + color + "); display: inline; margine-right: 5px;");
          }
			};
		//Setting behavior for all toggleboxes
		chartdata.inputboxes[i].nextSibling.onclick = function(){
			var index = chartdata.inputboxes.indexOf(this.previousSibling);
			//If not hidden, hide
			if(!this.checked){
				if(hidden[index]!= false){
					hidden[index] = false;
					var transparent = [0,0,0].join(", ");
					transparent = "rgba(" + transparent +", 0)";
					chart.datasets[index].strokeColor = transparent;
					chart.datasets[index].pointColor = transparent;
					chart.datasets[index].pointHighlightStroke = transparent;
					if(type==="line"){
						if(!oldData[index])
							oldData[index] = {};
	          			oldData[index].points = chart.datasets[index].points;
	          			chart.datasets[index].points = undefined;
					}
					else if(type === "bar"){
						if(!oldData[index])
							oldData[index] = {};
	          			oldData[index].bars = chart.datasets[index].bars;
	          			chart.datasets[index].bars = undefined;
					}
					else{
						if(!oldData[index])
							oldData[index] = {};
	          			oldData[index].scatter = chart.datasets[index].points;
	          			chart.datasets[index].points = undefined;
					}
					chart.update();
					overlay.updateSize(chart);
					linkSlickTable(chart,player,overlay,summary);
				}
			}
			//If hidden, bring the line back
			else{
				if(hidden[index]!= true){
					hidden[index]= true;
					if(type === "bar")
						var color = this.previousSibling.previousSibling.firstChild.style.background;
					else
						var color = this.previousSibling.previousSibling.style.color;
					color = color.substring(0,3) + "a(" + color.substring(4,(color.indexOf(")"))) + ", 1)";
					chart.datasets[index].strokeColor = color;
					chart.datasets[index].pointColor = color;
					chart.datasets[index].pointHighlightStroke = color;
					if(type === "line"){
	          			chart.datasets[index].points = oldData[index].points;
	          			//oldData[index].points = undefined;
					}
					else if(type === "bar"){
	          			chart.datasets[index].bars = oldData[index].bars;
	          			//oldData[index].bars= undefined;
					}
					else{
						chart.datasets[index].points = oldData[index].scatter;
					}
					chart.update();
					overlay.updateSize(chart);
					linkSlickTable(chart,player,overlay,summary);
					}
			}
		};
	}
	return myLineChart;
}

// sets the data for the chart in a selection of generated colors
function dataset(data, collection) {
	var dataArray = [];
	var inputBoxArray = [];
	var red, green, blue;
	red = green = blue = 0;
	var colorIncrease = parseInt((255/ data.length).toFixed(0));
	document.getElementById('colors').innerHTML= "";
	for (var i = 1; i < data.length; i++) {
		var color = [red, green, blue].join(", ");
		data[i].splice(0, 1);
		var line =
		{
		fillColor: "rgba(220, 220, 220, 0)",
		strokeColor: "rgba("+ color +", 1)",
		pointColor: "rgba("+ color +", 1)",
		label: i,

      //pointStrokeColor: "#fff",
		pointHighlightFill: "#fff",
		pointHighlightStroke: "rgba("+ color +", 1)",
		data: data[i]
		}
    //Fill Bar Color
		if(type === "bar"){
			line.fillColor = line.strokeColor;
		}
    //Put line into data Array
    	//console.log(line);
    	if(hidden[i-1]===false){
    		oldData[i-1].data = line;
    		line.data = undefined;
    	}
		dataArray.push(line);
    //Chech if previous line color existed
    if(lineColors.length<i){
      //If not, add it
      lineColors.push(line.strokeColor);
    }
    else{
      //If so, inherit previous color
      line.strokeColor = lineColors[i-1];
      line.pointColor= lineColors[i-1];
      line.pointHighlightStroke = lineColors[i-1];
      if(type === "bar"){
        //Bar will inherit fill color as well
        line.fillColor = lineColors[i-1];
      }
    }
		// log color into color editor
    var newColor = lineColors[i-1];
		var entry = document.createElement('li');
		var textInput = document.createElement('input');
		var toggleBox = document.createElement('input');
		var keyValue = document.createElement('p');
		//var removeButton = document.createElement('button');
    if(type === "line")
		var keyLabel = document.createTextNode(shapes[(i-1)%6]);
	else if(type === "scatter"){
		var keyLabel = document.createTextNode(shapes[0]);
		}
    else if(type === "bar"){
		keyLabel = document.createElement('span');
		keyLabel.setAttribute("style", "background:"+newColor);
		keyLabel.setAttribute("class", "colorblock");
		}
		if(hidden.length<= i-1){
			hidden.push(true);
		}
		inputBoxArray.push(textInput);
		textInput.setAttribute("title", "Enter color");
		toggleBox.setAttribute("type", "checkbox");
		if(hidden[i-1]===true)
			toggleBox.setAttribute("checked", "checked");
		toggleBox.setAttribute("title", "Display Data Set " + i);
		keyValue.setAttribute('style', 'color:' + newColor +'; display: inline; margin-right: 5px;');
		keyValue.appendChild(keyLabel);
		entry.appendChild(keyValue);
		entry.appendChild(textInput);
		entry.appendChild(toggleBox);
		document.getElementById('colors').appendChild(entry);
		red += colorIncrease + 15;
		green += colorIncrease;
		blue += colorIncrease - 15;

	}
	var returndata = new Object();
	returndata.data = dataArray;
	returndata.inputboxes = inputBoxArray;
	return returndata;
}

// deques elements off the array
function deque(array) {
	var ele = array[0];
	array.splice(0,1);
	return ele;
}

function convertPointsToBars(){
	var datasetLen = chart.datasets.length;
	var chartBase = chart.scale.endPoint;
	for(var i = 0; i < chart.datasets.length; i ++){
		if(chart.datasets[i].points){
			chart.datasets[i].bars = [];
			for(var j = 0; j <chart.datasets[i].points.length; j++){
				var point = chart.datasets[i].points[j];
				var bar = new chart.BarClass();
				bar.base = chart.scale.endPoint;
				bar.datasetLabel = point.datasetLabel;
				bar.fillColor = point.fillColor;
				bar.highlightFill = point.fillColor;
				bar.highlightStroke = point.fillColor;
				bar.label = point.label;
				bar.strokeColor = point.fillColor;
				bar.value = point.value;
				bar.width = chart.scale.calculateBarWidth(chart.datasets.length);
				bar.x = chart.scale.calculateBarX(datasetLen,i,j);
				bar.y = point.y;
				chart.datasets[i].bars.push(bar);
			}
		}
		else{
			if(oldData[i] && oldData[i].points){
				oldData[i].bars = [];
				for(var j = 0; j <oldData[i].points.length; j++){
					var point = oldData[i].points[j];
					var bar = new chart.BarClass();
					bar.base = chart.scale.endPoint;
					bar.datasetLabel = point.datasetLabel;
					bar.fillColor = point.fillColor;
					bar.highlightFill = point.fillColor;
					bar.highlightStroke = point.fillColor;
					bar.label = point.label;
					bar.strokeColor = point.fillColor;
					bar.value = point.value;
					bar.width = chart.scale.calculateBarWidth(chart.datasets.length);
					bar.x = chart.scale.calculateBarX(datasetLen,i,j);
					bar.y = point.y;
					oldData[i].bars.push(bar);
				}
			}
			else if(oldData[i] && oldData[i].scatter){
				oldData[i].bars = [];
				for(var j = 0; j <oldData[i].scatter.length; j++){
					var point = oldData[i].scatter[j];
					var bar = new chart.BarClass();
					bar.base = chart.scale.endPoint;
					bar.datasetLabel = point.datasetLabel;
					bar.fillColor = point.fillColor;
					bar.highlightFill = point.fillColor;
					bar.highlightStroke = point.fillColor;
					bar.label = point.label;
					bar.strokeColor = point.fillColor;
					bar.value = point.value;
					bar.width = chart.scale.calculateBarWidth(chart.datasets.length);
					bar.x = chart.scale.calculateBarX(datasetLen,i,j);
					bar.y = point.y;
					oldData[i].bars.push(bar);
				}
			}
		}
	}
}

function convertPointsToScatter(){
	var datasetLen = chart.datasets.length;
	var chartBase = chart.scale.endPoint;
	console.log("to Scatter");
	for(var i = 0; i < chart.datasets.length; i ++){
		if(chart.datasets[i].points && chart.datasets[i].points.length >0){
			console.log("if");
			chart.datasets[i].scatterpoints = [];
			for(var j = 0; j <chart.datasets[i].points.length; j++){
				var point = chart.datasets[i].points[j];
				var scatterPoint = new chart.PointClass({
				datasetLabel: point.datasetLabel,
				fillColor: point.fillColor,
				highlightFill: point.highlightFill,
				highlightStroke: point.highlightStroke,
				label: point.label,
				strokeColor: point.strokeColor,
				value: point.value,
				x: chart.scale.calculateX(j),
				y: chart.scale.calculateY(point.value)
				});
				chart.datasets[i].scatterpoints.push(scatterPoint);
			}
			chart.datasets[i].points = [];
			for(var j = 0; j <chart.datasets[i].scatterpoints.length; j++){
				chart.datasets[i].points[j] = chart.datasets[i].scatterpoints[j];
			}
		}
		else{
			console.log("else");
			if(oldData[i] && oldData[i].points){
				console.log("P");
				oldData[i].scatter = [];
				for(var j = 0; j <oldData[i].points.length; j++){
					var point = oldData[i].points[j];
					var scatterPoint = new chart.PointClass({
						datasetLabel: point.datasetLabel,
						fillColor: point.fillColor,
						highlightFill: point.highlightFill,
						highlightStroke: point.highlightStroke,
						label: point.label,
						strokeColor: point.strokeColor,
						value: point.value,
						x: point.x,//parseFloat(chart.scale.calculateX(j)+""),
						y: point.y//parseFloat(chart.scale.calculateY(point.value)+"")
					});
					oldData[i].scatter.push(scatterPoint);
				}
			}
			else{
				console.log("B");
				oldData[i].scatter = [];
				for(var j = 0; j <oldData[i].bars.length; j++){
					var point = oldData[i].bars[j];
					var scatterPoint = new chart.PointClass({
						datasetLabel: point.datasetLabel,
						fillColor: point.fillColor,
						highlightFill: point.highlightFill,
						highlightStroke: point.highlightStroke,
						label: point.label,
						strokeColor: point.strokeColor,
						value: point.value,
						x: parseFloat(chart.scale.calculateX(j)+""),
						y: point.y
					});
					oldData[i].scatter.push(scatterPoint);
				}	
			}
		}
	}
}