"use strict"; // strict mode syntax
var loadChart = function(data){
  /*
    Using Chart.js
  */
  var data1 = data;

  var data = {
    labels: data1[0],
    datasetFill: false,
    datasets: dataset(data1)
  };
  var ctx = document.getElementById("myChart").getContext("2d");
  var myLineChart = new Chart(ctx).Line(data);
  document.getElementById("myChart").setAttribute("title","chart read out"); // by setting the attribute we can make the chart accessible
  return myLineChart;
}

// sets the data for the chart in a selection of generated colors
function dataset(data) {
  var dataArray = [];
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
    //TODO:Text input needs an attribute where onInput calls a function that references
    //which list item your on and updates the color and the chart
    //pass the event through in a function
    colorBlock.setAttribute("style", "background:rgb(" + color + ")");
    colorBlock.setAttribute("class", "colorblock");
    entry.appendChild(colorBlock);
    entry.appendChild(textInput);
    document.getElementById('colors').appendChild(entry);


    red += colorIncrease + 15;
    green += colorIncrease;
    blue += colorIncrease - 15;
  }
  return dataArray;
}

// deques elements off the array
function deque(array) {
  var ele = array[0];
  array.splice(0,1);
  return ele;
}
