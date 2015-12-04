"use strict"; // strict mode syntax
// initial object for the overlay
var Overlay = function(data, graphType) {
  this.chart;
  if(graphType != "bar"){
    this.loadControls(data.data[0].length - 1);
    this.slider = [0,0];
  }
  else{
    this.loadControls(data.data[0].length);
    this.slider = [0,0];
  }
}

// makes svg elements and inserts them as siblings of the node (previousNode) provided.
Overlay.prototype.makeSVG = function(previousNode, type, attributes){
  var svgElement = document.createElementNS("http://www.w3.org/2000/svg",type);
  for (i in attributes){
    svgElement.setAttribute(i,attributes[i]);
  }
  previousNode.parentNode.insertBefore(svgElement,previousNode.nextElementSibling);
}

// functions to get document elements easily
Overlay.prototype.getSelection = function(){return document.getElementById("selection");}
Overlay.prototype.getBackground = function(){return document.getElementById("background");}
Overlay.prototype.getX = function(element){return Number(element.getAttribute("x"));}
Overlay.prototype.getWidth = function(element){return Number(element.getAttribute("width"));}


// takes the array size, and returns a tuple of the end and start of selected points
Overlay.prototype.getSelectedPoints = function(arraySize){
  var start = Math.ceil((getX(this.getSelection()) - getX(this.getBackground())) / (getWidth(this.getBackground()) / (arraySize - 1)));
  var end = Math.floor((getX(this.getSelection()) + getWidth(this.getSelection()) - getX(this.getBackground())) / (getWidth(this.getBackground()) / (arraySize - 1)));
  return {'start':start, 'end':end};
}

// updates the size of the overlay object
Overlay.prototype.updateSize = function(chart){
  this.chart=undefined;
  if(chart.scales['x-axis-0']){
    var myXAxis = chart.scales['x-axis-0'];
    var myYAxis = chart.scales['y-axis-0']; 
  }
  else{
    var myXAxis = chart.scales['x-axis-1'];
    var myYAxis = chart.scales['y-axis-1']; 
  }
  var resizeElements = [this.getSelection(), this.getBackground()];
  for (var ele in resizeElements){
    resizeElements[ele].setAttribute('x', myXAxis.left);
    var w = (myXAxis.width - myXAxis.paddingLeft - myXAxis.paddingRight) +" ";
    if(type==="scatter"){
      w = myXAxis.width;
    }
    resizeElements[ele].setAttribute('width', w);
    resizeElements[ele].setAttribute('y', 0);
    resizeElements[ele].setAttribute('height', myYAxis.bottom);
  }
  // resize slider
  document.getElementById('slider-range').setAttribute(
    'style', 'margin-left: ' + myXAxis.left + 'px; width: ' +
    (myXAxis.width - myXAxis.paddingRight) + 'px');
  if (document.getElementById("slider-range")) {
    var startData = document.getElementById("slider-range").getAttribute("data-start");
    var arraySize = document.getElementById("slider-range").getAttribute("data-size");
    var endData = document.getElementById("slider-range").getAttribute("data-end");
    if(endData == -1) {
      endData = arraySize;
    }
    var leftPadding = 0;//Number(this.getBackground().getAttribute('x'));
    var width = Number(this.getBackground().getAttribute('width'));
    this.getSelection().setAttribute("x",leftPadding + (startData * ( width / arraySize)));
    this.getSelection().setAttribute("width",(endData - startData) * (width / arraySize));
    var leftPadding = Number(this.getBackground().getAttribute('x'));
    var width = Number(this.getBackground().getAttribute('width'));
  }
  if(this.chart == undefined) {
    var leftPadding = Number(this.getBackground().getAttribute('x'));
    var width = Number(this.getBackground().getAttribute('width'));
    this.getSelection().setAttribute("x",leftPadding);
    this.getSelection().setAttribute("width",width);
    this.chart = chart;
  }
}

// provides a connection to the slider and the overlay
Overlay.prototype.loadControls = function(arraySize){
  var arraySize = --arraySize;
  document.getElementById("slider-range").setAttribute("data-size", arraySize);
  var self = this;
  jQuery(function ($) {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: arraySize,
      values: [ 0, arraySize ],
      slide: function(event, ui) {
        var arraySize = document.getElementById("slider-range").getAttribute("data-size");
        var startIndex = Number(ui.values[0]);
        var endIndex = Number(ui.values[1]);
        var leftPadding = Number(self.getBackground().getAttribute('x'));
        var width = Number(self.getBackground().getAttribute('width'));
        self.getSelection().setAttribute("x",leftPadding + (startIndex * ( width / arraySize)));
        self.getSelection().setAttribute("width",(endIndex - startIndex) * (width / arraySize));
        self.slider = ui.values;
        document.getElementById("slider-range").setAttribute("data-start", ui.values[0]);
        document.getElementById("slider-range").setAttribute("data-end", ui.values[1]);
      }
    });
  });
}
