"use strict"; // strict mode syntax
// initial object for the overlay
var Overlay = function(data) {
  this.loadControls(data.data[0].length);
  this.slider = [0,0];
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
  var resizeElements = [this.getSelection(), this.getBackground()];
  for (var ele in resizeElements){
    resizeElements[ele].setAttribute('x', chart.scale.xScalePaddingLeft);
    resizeElements[ele].setAttribute('width', chart.scale.width - chart.scale.xScalePaddingLeft - chart.scale.xScalePaddingRight);
    resizeElements[ele].setAttribute('y', chart.scale.startPoint);
    resizeElements[ele].setAttribute('height', chart.scale.endPoint - chart.scale.startPoint);
  }
  // resize slider
  document.getElementById('slider-range').setAttribute(
    'style', 'margin-left: ' + chart.scale.xScalePaddingLeft + 'px; width: ' +
    (chart.scale.width - chart.scale.xScalePaddingLeft - chart.scale.xScalePaddingRight) + 'px');
  if (document.getElementById("slider-range")) {
    var startData = document.getElementById("slider-range").getAttribute("data-start");
    var arraySize = document.getElementById("slider-range").getAttribute("data-size");
    var endData = document.getElementById("slider-range").getAttribute("data-end");
    if(endData == -1) {
      endData = arraySize;
    }
    var leftPadding = Number(this.getBackground().getAttribute('x'));
    var width = Number(this.getBackground().getAttribute('width'));
    this.getSelection().setAttribute("x",leftPadding + (startData * ( width / arraySize)));
    this.getSelection().setAttribute("width",(endData - startData) * (width / arraySize));
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
