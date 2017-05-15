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
	var currBgColor = document.getElementById("graphCC").style.background;
	var sfc = findContrastor(convertRGBtoHex(currBgColor.substring(0,currBgColor.indexOf(")")+1)));
	if(!sfc)
		sfc="#000000";
	var ctx = document.getElementById("myChart").getContext("2d");
	var myLineChart;
	if(type === "scatter"){
		myLineChart = new Chart(ctx).ScatterPlot(data,{scaleFontColor:sfc});
		myLineChart.animation = false;
	}
	else if(type === "bar"){
		myLineChart = new Chart(ctx).Bar(data,{scaleFontColor:sfc});
		myLineChart.animationSteps = 0;
	}
	else{
	  myLineChart = new Chart(ctx).Line(data,{scaleFontColor:sfc});
	  myLineChart.animation = false;
	}
	document.getElementById("myChart").setAttribute("title","image of graph"); // by setting the attribute we can make the chart accessible
    $(document).ready(function () {
        jscolor.installByClassName("jscolor");
    });
	for(var i =0; i<data.datasets.length;i++){
		//Setting input functions for each line in order to set new colors
        chartdata.inputboxes[i].onchange = function () {
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
					var continuePrompt = true;
					var graphBg = document.getElementById("graphCC").style.background;
					graphBg = convertRGBtoHex(graphBg.substring(0,graphBg.indexOf(")")+1));
					if(isNaN(calcContrast(graphBg,newcolor))){
						if(calcContrast(newcolor,"#F4F2E9")<=2){
							continuePrompt = confirm("Low color contrast may cause poor line visibility, continue anyways?");
						}
						continuePrompt = calcContrast(newcolor,"#F4F2E9")<=1.25;
					}
					else{
						if(calcContrast(graphBg,newcolor)<=2){
							continuePrompt = confirm("Low color contrast may cause poor line visibility, continue anyways?");
						}
						continuePrompt = calcContrast(graphBg,newcolor)<=1.25;
					}
					if(continuePrompt){
						var elem = document.getElementById("warning"+index);
						if(!elem){
							var newElem = document.createElement('i');
							newElem.setAttribute("id","warning" + index);
							newElem.setAttribute("class","fa fa-exclamation-triangle");
							newElem.setAttribute("style" ,"position: relative; left: -6.2%; color: red;");
							newElem.setAttribute("aria-label", "Caution: Current line color may not be visible on graph.");
							newElem.setAttribute("tab-index", "0");
							newElem.setAttribute("title","Caution: Current line color may not be visible on graph.");
							this.parentNode.insertBefore(newElem,this.nextSibling);
							var input = document.getElementById("warning"+index).nextSibling;
							input.style.left = "-20px";
						}
						else{
							elem.setAttribute("style" , "position: relative; left: -6.2%; color: red;");
							elem.nextSibling.style.left = "-20px";
						}
					}
					else{
						var elem = document.getElementById("warning"+index);
						if(elem){
							elem.setAttribute("style", "display:none");
							elem.nextSibling.style.left = "0px";
						}
					}
					if((this.nextSibling.firstChild!= null && this.nextSibling.firstChild.checked) ||this.nextSibling.nextSibling.firstChild.checked){
						//Set necessary color values based on graph type
						if(type==="line" || type==="scatter")
							chart.datasets[index].strokeColor = "rgba("+ color +", 1)";
							chart.datasets[index].pointColor = "rgba("+ color +", 1)";
							chart.datasets[index].pointHighlightStroke = "rgba("+ color +", 1)";
						if(type==="line"|| type==="scatter"){
							for(var i = 0; i<chart.datasets[index].points.length;i++){
								chart.datasets[index].points[i].fillColor= "rgba("+ color +", 1)";
							}
							if(oldData[index]){
									if(oldData[index].points){
										var len = oldData[index].points.length;
									}
									else if(oldData[index].bars){
										var len = oldData[index].bars.length;
									}
									else{
										var len = oldData[index].scatter.length;
									}
									for(var i = 0; i < len; i ++){
										if(oldData[index]){
											if(oldData[index].points){
												oldData[index].points[i].fillColor= "rgba("+ color +", 1)";
											}
											if(oldData[index].bars){
												oldData[index].bars[i].fillColor= "rgba("+ color +", 1)";
												oldData[index].bars[i].strokeColor= "rgba("+ color +", 1)";
											}
											if(oldData[index].scatter){
												oldData[index].scatter[i].fillColor= "rgba("+ color +", 1)";
											}
										}
									}
								}
						}
						else if(type==="bar"){
							for(var i = 0; i<chart.datasets[index].bars.length;i++){
								chart.datasets[index].bars[i].fillColor= "rgba("+ color +", 1)";
								chart.datasets[index].bars[i].strokeColor= "rgba("+ color +", 1)";
							}
							if(oldData[index]){
									if(oldData[index].points){
										var len = oldData[index].points.length;
									}
									else if(oldData[index].bars){
										var len = oldData[index].bars.length;
									}
									else{
										var len = oldData[index].scatter.length;
									}
									for(var i = 0; i < len; i ++){
										if(oldData[index]){
											if(oldData[index].points){
												oldData[index].points[i].fillColor= "rgba("+ color +", 1)";
											}
											if(oldData[index].bars){
												oldData[index].bars[i].fillColor= "rgba("+ color +", 1)";
												oldData[index].bars[i].strokeColor= "rgba("+ color +", 1)";
											}
											if(oldData[index].scatter){
												oldData[index].scatter[i].fillColor= "rgba("+ color +", 1)";
											}
										}
									}
								}
						}
						//Redraw graph
						chart.update();
					}
					else{
						if(oldData[index]){
									if(oldData[index].points){
										var len = oldData[index].points.length;
									}
									else if(oldData[index].bars){
										var len = oldData[index].bars.length;
									}
									else{
										var len = oldData[index].scatter.length;
									}
									for(var i = 0; i < len; i ++){
										if(oldData[index]){
											if(oldData[index].points){
												oldData[index].points[i].fillColor= "rgba("+ color +", 1)";
											}
											if(oldData[index].bars){
												oldData[index].bars[i].fillColor= "rgba("+ color +", 1)";
												oldData[index].bars[i].strokeColor= "rgba("+ color +", 1)";
											}
											if(oldData[index].scatter){
												oldData[index].scatter[i].fillColor= "rgba("+ color +", 1)";
											}
										}
									}
								}
					}
					//Set graph data color indicator
					if(type === "line" || type==="scatter"){
						var nColor = convertRGBtoHex(lineColors[index]);
						var contrastColor = findContrastor(nColor);
						this.parentNode.firstChild.nextSibling.nextSibling.setAttribute("style", "color:rgb(" + color + "); display: inline; background:" + contrastColor);
					}
					else if(type === "bar"){
						var nColor = convertRGBtoHex(lineColors[index]);
						var contrastColor = findContrastor(nColor);
						var block = document.getElementsByClassName("colorblock")[index];
						block.getContext("2d").fillStyle = nColor;
						block.getContext("2d").fillRect(0,0,9999,9999);
						block.style.border = "2px solid " + contrastColor;
					}
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
          			var continuePrompt = true;
					var graphBg = document.getElementById("graphCC").style.background;
					graphBg = convertRGBtoHex(graphBg.substring(0,graphBg.indexOf(")")+1));
					if(isNaN(calcContrast(graphBg,colors[newcolor.toLowerCase().split(' ').join('')]))){
						if(calcContrast(colors[newcolor.toLowerCase().split(' ').join('')],"#F4F2E9")<=1.25){
							continuePrompt = confirm("Low color contrast may cause poor line visibility, continue anyways?");
						}
						continuePrompt = calcContrast(colors[newcolor.toLowerCase().split(' ').join('')],"#F4F2E9")<=1.25;
					}
					else{
						if(calcContrast(graphBg,colors[newcolor.toLowerCase().split(' ').join('')])<=1.25){
							continuePrompt = confirm("Low color contrast may cause poor line visibility, continue anyways?");
						}
						continuePrompt = calcContrast(graphBg,colors[newcolor.toLowerCase().split(' ').join('')])<=1.25;
					}
					if(continuePrompt){
						var elem = document.getElementById("warning"+index);
						if(!elem){
							var newElem = document.createElement('i');
							newElem.setAttribute("id","warning" + index);
							newElem.setAttribute("class","fa fa-exclamation-triangle");
							newElem.setAttribute("style","position: relative; left: -6.2%; color: red;");
							newElem.setAttribute("aria-label", "Caution: Current line color may not be visible on graph.");
							newElem.setAttribute("tab-index", "0");
							newElem.setAttribute("title","Caution: Current line color may not be visible on graph.");
							this.parentNode.insertBefore(newElem,this.nextSibling);
							var input = document.getElementById("warning"+index).nextSibling;
							input.style.left = "-20px";
						}
						else{
							elem.setAttribute("style","position: relative; left: -6.2%; color: red;");
							elem.nextSibling.style.left = "-20px";
						}
					}
					else{
						var elem = document.getElementById("warning"+index);
						if(elem){
							elem.setAttribute("style", "display:none");
							elem.nextSibling.style.left = "0px";
						}
					}
					if((this.nextSibling.firstChild!= null && this.nextSibling.firstChild.checked) ||this.nextSibling.nextSibling.firstChild.checked){
						//Set necessary colors based on graph type
            			if(type==="line")
            			chart.datasets[index].strokeColor = "rgba("+ color +", 1)";
						chart.datasets[index].pointColor = "rgba("+ color +", 1)";
						chart.datasets[index].pointHighlightStroke = "rgba("+ color +", 1)";
						if(type==="line" || type==="scatter"){
							for(var i = 0; i<chart.datasets[index].points.length;i++){
								chart.datasets[index].points[i].fillColor= "rgba("+ color +", 1)";
							}
						if(oldData[index]){
									if(oldData[index].points){
										var len = oldData[index].points.length;
									}
									else if(oldData[index].bars){
										var len = oldData[index].bars.length;
									}
									else{
										var len = oldData[index].scatter.length;
									}
									for(var i = 0; i < len; i ++){
										if(oldData[index]){
											if(oldData[index].points){
												oldData[index].points[i].fillColor= "rgba("+ color +", 1)";
											}
											if(oldData[index].bars){
												oldData[index].bars[i].fillColor= "rgba("+ color +", 1)";
												oldData[index].bars[i].strokeColor= "rgba("+ color +", 1)";
											}
											if(oldData[index].scatter){
												oldData[index].scatter[i].fillColor= "rgba("+ color +", 1)";
											}
										}
									}
								}
						}
						else if(type==="bar"){
							for(var i = 0; i<chart.datasets[index].bars.length;i++){
								chart.datasets[index].bars[i].fillColor= "rgba("+ color +", 1)";
								chart.datasets[index].bars[i].strokeColor= "rgba("+ color +", 1)";
							}
							if(oldData[index]){
									if(oldData[index].points){
										var len = oldData[index].points.length;
									}
									else if(oldData[index].bars){
										var len = oldData[index].bars.length;
									}
									else{
										var len = oldData[index].scatter.length;
									}
									for(var i = 0; i < len; i ++){
										if(oldData[index]){
											if(oldData[index].points){
												oldData[index].points[i].fillColor= "rgba("+ color +", 1)";
											}
											if(oldData[index].bars){
												oldData[index].bars[i].fillColor= "rgba("+ color +", 1)";
												oldData[index].bars[i].strokeColor= "rgba("+ color +", 1)";
											}
											if(oldData[index].scatter){
												oldData[index].scatter[i].fillColor= "rgba("+ color +", 1)";
											}
										}
									}
								}
						}
						//Redraw graph
						chart.update();
					}
					else{
						if(oldData[index]){
									if(oldData[index].points){
										var len = oldData[index].points.length;
									}
									else if(oldData[index].bars){
										var len = oldData[index].bars.length;
									}
									else{
										var len = oldData[index].scatter.length;
									}
									for(var i = 0; i < len; i ++){
										if(oldData[index]){
											if(oldData[index].points){
												oldData[index].points[i].fillColor= "rgba("+ color +", 1)";
											}
											if(oldData[index].bars){
												oldData[index].bars[i].fillColor= "rgba("+ color +", 1)";
												oldData[index].bars[i].strokeColor= "rgba("+ color +", 1)";
											}
											if(oldData[index].scatter){
												oldData[index].scatter[i].fillColor= "rgba("+ color +", 1)";
											}
										}
									}
								}
					}
					//Set graph data color indicator
					if(type === "line" || type==="scatter"){
						var contrastColor = findContrastor(colors[newcolor.toLowerCase().split(' ').join('')]);
						this.parentNode.firstChild.nextSibling.nextSibling.setAttribute("style", "color:rgb(" + color + "); display: inline; background:" + contrastColor);
					}
					else if(type === "bar"){
						var contrastColor = findContrastor(colors[newcolor.toLowerCase().split(' ').join('')]);
						var nColor = convertRGBtoHex(lineColors[index]);
						var block = document.getElementsByClassName("colorblock")[index];
						block.getContext("2d").fillStyle = nColor;
						block.getContext("2d").fillRect(0,0,9999,9999);
						block.style.border = "2px solid " + contrastColor;
					}
        }
			};
		//Setting behavior for all toggleboxes
		var checkbox = chartdata.inputboxes[i].nextSibling.firstChild;
		if(checkbox.tagName === "I"){
			checkbox = chartdata.inputboxes[i].nextSibling.nextSibling.firstChild;
		}
		checkbox.onclick = function(){
			var index = chartdata.inputboxes.indexOf(this.parentNode.previousSibling);
			if(index === -1){
				index = chartdata.inputboxes.indexOf(this.parentNode.previousSibling.previousSibling);
			}
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
					if(type === "bar"){
						if(this.parentNode.previousSibling.previousSibling.firstChild)
						var color = this.parentNode.previousSibling.previousSibling.firstChild.getContext("2d").strokeStyle;
						else{
							color = this.parentNode.previousSibling.previousSibling.previousSibling.firstChild.getContext("2d").strokeStyle;
						}
					}
					else{
						var color = this.parentNode.previousSibling.previousSibling.style.color;
						if(color === ""){
							color = this.parentNode.previousSibling.previousSibling.previousSibling.style.color;
						}
					}
					color = color.substring(0,3) + "a(" + color.substring(4,(color.indexOf(")"))) + ", 1)";
					chart.datasets[index].strokeColor = color;
					chart.datasets[index].pointColor = color;
					chart.datasets[index].pointHighlightStroke = color;
					if(type === "line"){
						if(oldData[index].points)
	    	      			chart.datasets[index].points = oldData[index].points;
	        	  	else
	          			chart.datasets[index].points = oldData[index].scatter;
					}
					else if(type === "bar"){
			          chart.datasets[index].bars = oldData[index].bars;
					}
					else{
						chart.datasets[index].points = oldData[index].scatter;
						for(var i = 0; i < chart.datasets.length; i++){
							for(var j = 0; j<chart.datasets[i].points.length; j++){
								chart.datasets[i].points[j].y = chart.scale.calculateY(chart.datasets[i].points[j].value);
							}
						}
					}
					chart.update();
					overlay.updateSize(chart);
					linkSlickTable(chart,player,overlay,summary);
					chart.update();
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
		var entry1 = document.createElement('li');
        var script = document.createElement('script');
		var textInput = document.createElement('input');
		var toggleBox = document.createElement('input');
		var inputDiv = document.createElement('div');
		var inputLabel = document.createElement('label');
		var keyValue = document.createElement('p');
		//var removeButton = document.createElement('button');
    if(type === "line"){
			var keyLabel = document.createTextNode(shapes[(i-1)%6]);
		}
		else if(type === "scatter"){
			var keyLabel = document.createTextNode(shapes[0]);
		}
    else if(type === "bar"){
			var keyLabel = document.createElement('canvas');
			keyLabel.setAttribute("style","padding:0px; height:24px; width:65px;");
			var ctx = keyLabel.getContext("2d");
			ctx.fillStyle = newColor;
			ctx.fillRect(0,0,9999,9999);
			keyLabel.style.border = "2px solid " + findContrastor(convertRGBtoHex(newColor));
			//keyLabel.setAttribute("style", "background:" + newColor);
			keyLabel.setAttribute("class", "colorblock");
		}
		if(hidden.length<= i-1){
			hidden.push(true);
		} // this has to do with the check boxes for Graph rows
		inputBoxArray.push(textInput);
        script.setAttribute("src", "libs/jscolor/jscolor.js");
		toggleBox.setAttribute("id", "lineToggleBox" + i);
        textInput.setAttribute("class", "jscolor");
		textInput.setAttribute("type", "text");
		textInput.setAttribute("title", "Enter Color");
		textInput.setAttribute("aria-label", "Enter Color");
		inputDiv.setAttribute("class","squaredTwo");
		inputDiv.style.marginTop = "3%";
		inputLabel.setAttribute("for","lineToggleBox" + i);
		toggleBox.setAttribute("type", "checkbox");
		textInput.setAttribute("style","width:120px; font-size:20px;margin:3% 2% 0% 5%;");
		if(hidden[i-1]===true)
			toggleBox.setAttribute("checked", "checked");
		toggleBox.setAttribute("title", "Display Data Set " + i);
		inputLabel.setAttribute("title", "Display Data Set " + i);
		inputDiv.appendChild(toggleBox);
		inputDiv.appendChild(inputLabel);
		var conColor = lineColors[i-1];
		conColor = convertRGBtoHex(conColor);
		keyValue.setAttribute("style", "color:" + newColor +"; display: inline;");
		if(type != "bar"){
			keyValue.style.background=findContrastor(conColor);
		}
		else{
			keyValue.style.borderColor = findContrastor(conColor);
		}
		// Edit moved check boxes to new location
		keyValue.appendChild(keyLabel);
		//entry.appendChild(keyValue);
		//entry.appendChild(inputDiv);
        entry1.appendChild(inputDiv); // this is where the checked boxes are linked
        entry1.appendChild(textInput);// this will input txt first
		entry1.appendChild(keyValue); // this will place the color boxs for lines in table

		document.getElementById('colors').appendChild(entry);// this doesnt pass anything that i can see but
									           				// but if removed it renders the page blank more
															// on this later
        document.getElementById('colors1').appendChild(entry1);// this links data to graph rows table

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
//Convert points to bars for a bar graph
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

//Convert points to scatterplot points for scatterplot
function convertPointsToScatter(){
	var datasetLen = chart.datasets.length;
	var chartBase = chart.scale.endPoint;
	for(var i = 0; i < chart.datasets.length; i ++){
		if(chart.datasets[i].points && chart.datasets[i].points.length >0){
			chart.datasets[i].scatterpoints = [];
			for(var j = 0; j <chart.datasets[i].points.length; j++){
				var point = chart.datasets[i].points[j];
				if(!chart.numeric)
				var x = chart.scale.calculateX(j);
				else
				var x = chart.scale.calculateX(point.label-1);
				var y = point.y
				var scatterPoint = new chart.PointClass({
					datasetLabel: point.datasetLabel,
					fillColor: point.fillColor,
					highlightFill: point.highlightFill,
					highlightStroke: point.highlightStroke,
					label: point.label,
					strokeColor: point.strokeColor,
					value: point.value,
					x: x,
					y: y
				});
				chart.datasets[i].scatterpoints.push(scatterPoint);
			}
			chart.datasets[i].points = [];
			for(var j = 0; j <chart.datasets[i].scatterpoints.length; j++){
				chart.datasets[i].points[j] = chart.datasets[i].scatterpoints[j];
			}
		}
		else{
			if(oldData[i] && oldData[i].points){
				oldData[i].scatter = [];
				for(var j = 0; j <oldData[i].points.length; j++){
					var point = oldData[i].points[j];
					if(!chart.numeric)
					var x = chart.scale.calculateX(j);
					else
					var x = chart.scale.calculateX(point.label-1);
					var scatterPoint = new chart.PointClass({
						datasetLabel: point.datasetLabel,
						fillColor: point.fillColor,
						highlightFill: point.highlightFill,
						highlightStroke: point.highlightStroke,
						label: point.label,
						strokeColor: point.strokeColor,
						value: point.value,
						x: x,
						y: point.y
					});
					oldData[i].scatter.push(scatterPoint);
				}
			}
			else{
				oldData[i].scatter = [];
				for(var j = 0; j <oldData[i].bars.length; j++){
					var point = oldData[i].bars[j];
					if(!chart.numeric)
					var x = chart.scale.calculateX(j);
					else
					var x = chart.scale.calculateX(parseFloat(point.label)-1);
					var scatterPoint = new chart.PointClass({
						datasetLabel: point.datasetLabel,
						fillColor: point.fillColor,
						highlightFill: point.highlightFill,
						highlightStroke: point.highlightStroke,
						label: point.label,
						strokeColor: point.strokeColor,
						value: point.value,
						x: x,
						y: point.y
					});
					oldData[i].scatter.push(scatterPoint);

				}
			}
		}
	}
}
