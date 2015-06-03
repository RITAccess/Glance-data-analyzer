"use strict"; // strict mode syntax
var loadChart = function(data){
  /*
    Using Chart.js
  */
  var data1 = data;
  var chartdata = dataset(data1);
  var data = {
    labels: data1[0],
    datasetFill: false,
    datasets: chartdata.data
  };
  var ctx = document.getElementById("myChart").getContext("2d");
  var myLineChart = new Chart(ctx).Line(data);
  document.getElementById("myChart").setAttribute("title","chart read out"); // by setting the attribute we can make the chart accessible
  for(var i =0; i<data.datasets.length;i++){
	chartdata.inputboxes[i].oninput = function(){
					     var index = chartdata.inputboxes.indexOf(this);
					     var newcolor = this.value;
					       if(/^#[0-9A-F]{6}$/i.test(newcolor)){
					         var r = parseInt(newcolor.substring(1,3), 16);
					         var g = parseInt(newcolor.substring(3,5), 16);
					         var b = parseInt(newcolor.substring(5), 16);
					         var color = [r, g, b].join(", ");
						if(this.nextSibling.checked){
						 chart.datasets[index].strokeColor = "rgba("+ color +", 1)";
					         chart.datasets[index].pointColor = "rgba("+ color +", 1)";
					         chart.datasets[index].pointHighlightStroke = "rgba("+ color +", 1)";
						 for(var i = 0; i<chart.datasets[index].points.length;i++){
						   chart.datasets[index].points[i].fillColor= "rgba("+ color +", 1)";
						   //chart.datasets[index].points[i].highlightFill= "rgba("+ color +", 1)";
					          // chart.datasets[index].points[i].highlightStroke= "rgba("+ color +", 1)";
						 }
						 chart.update();						 
						 }
					         this.parentNode.firstChild.setAttribute("style", "background:rgb(" + color + ")");
					       }
					       else if(/^#[0-9A-F]{6}$/i.test(colors[newcolor.toLowerCase().split(' ').join('')])){
					         var rgb = colors[newcolor.toLowerCase().split(' ').join('')];
					         var r = parseInt(rgb.substring(1,3), 16);
					         var g = parseInt(rgb.substring(3,5), 16);
					         var b = parseInt(rgb.substring(5), 16);
					         var color = [r, g, b].join(", ");
						 if(this.nextSibling.checked){
						 chart.datasets[index].strokeColor = "rgba("+ color +", 1)";
					         chart.datasets[index].pointColor = "rgba("+ color +", 1)";
					         chart.datasets[index].pointHighlightStroke = "rgba("+ color +", 1)";
						 for(var i = 0; i<chart.datasets[index].points.length;i++){
						   chart.datasets[index].points[i].fillColor= "rgba("+ color +", 1)";
						 }
						 chart.update();						 
						 }
					         this.parentNode.firstChild.setAttribute("style", "background:rgb(" + color + ")");
					       }
					     
					     };
	chartdata.inputboxes[i].nextSibling.onclick = function(){
						var index = chartdata.inputboxes.indexOf(this.previousSibling);
			   			if(!this.checked){
                               			  var transparent = [0,0,0].join(", ");
			       			  transparent = "rgba(" + transparent +", 0)";
			       			  chart.datasets[index].strokeColor = transparent;
					          chart.datasets[index].pointColor = transparent;
					          chart.datasets[index].pointHighlightStroke = transparent;
						  for(var i = 0; i<chart.datasets[index].points.length;i++){
						   chart.datasets[index].points[i].fillColor= transparent;
						  }
						  chart.update();						 
			   			  }
						else{
                               			  var color = this.previousSibling.previousSibling.style.background;
						  color = color.substring(0,3) + "a(" + color.substring(4,(color.indexOf(")"))) + ", 1)";
			       			  chart.datasets[index].strokeColor = color;
					          chart.datasets[index].pointColor = color;
					          chart.datasets[index].pointHighlightStroke = color;
						  for(var i = 0; i<chart.datasets[index].points.length;i++){
						   chart.datasets[index].points[i].fillColor= color;
						  }
						  chart.update();
						}
						}; 
  }
  return myLineChart;
}

// sets the data for the chart in a selection of generated colors
function dataset(data) {
  var dataArray = [];
  var inputBoxArray = [];
  var red, green, blue;
  red = green = blue = 0;
  var colorIncrease = parseInt((255/ data.length).toFixed(0));

  for (var i = 1; i < data.length; i++) {
    var color = [red, green, blue].join(", ");
    var line =
    {
      fillColor: "rgba(220, 220, 220, 0)",
      strokeColor: "rgba("+ color +", 1)",
      pointColor: "rgba("+ color +", 1)",

      //pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba("+ color +", 1)",
      data: data[i]
    }
    dataArray.push(line);
    // log color into color editor
    var entry = document.createElement('li');
    var colorBlock = document.createElement('span');
    var textInput = document.createElement('input');
    var toggleBox = document.createElement('input');
    inputBoxArray.push(textInput);
    colorBlock.setAttribute("style", "background:rgb(" + color + ")");
    colorBlock.setAttribute("class", "colorblock");
    toggleBox.setAttribute("type", "checkbox");
    toggleBox.setAttribute("checked", "checked");
    entry.appendChild(colorBlock);
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
