// Move the Left and Right boundaries of the box to form the selection
function moveLeftMargin(value){
  modifyAttribute(getSelection(),'x',value);
  modifyAttribute(getSelection(),'width',-value,0);
}
function moveRightMargin(value){
  modifyAttribute(getSelection(),'width',value,0);
}

function updateCursor1(value){
  console.log(value);
  moveLeftMargin(value);
}
function updateCursor2(value){
  console.log(value);
  moveRightMargin(value);
}

// makes svg elements and inserts them as siblings of the node (previousNode) provided.
function makeSVG(previousNode, type, attributes){
  var svgElement = document.createElementNS("http://www.w3.org/2000/svg",type);
  for (i in attributes){
    svgElement.setAttribute(i,attributes[i]);
  }
  previousNode.parentNode.insertBefore(svgElement,previousNode.nextElementSibling);
}

// modifies an attribute of an element (to a number value).
// min and max are optional values
function modifyAttribute(element,attribute,modification,min,max){
  var value = Number(element.getAttribute(attribute)) - (-modification);
  if (min !== undefined) {value = Math.max(min,value)}
  if (max !== undefined) {value = Math.min(max,value)}
  element.setAttribute(attribute,value);
}

function getSelection(){return document.getElementById("selection");}
function getBackground(){return document.getElementById("background");}
function getX(element){return Number(element.getAttribute("x"));}
function getWidth(element){return Number(element.getAttribute("width"));}


// takes the array size, and returns a tuple of the end and start of selected points
function getSelectedPoints(arraySize){
  var start = Math.ceil((getX(getSelection()) - getX(getBackground())) / (getWidth(getBackground()) / (arraySize - 1)));
  var end = Math.floor((getX(getSelection()) + getWidth(getSelection()) - getX(getBackground())) / (getWidth(getBackground()) / (arraySize - 1)));
  return {'start':start, 'end':end};
}

function updateOverlaySize(chart){
  resizeElements = [getSelection(), getBackground()];
  for (ele in resizeElements){
    resizeElements[ele].setAttribute('x', chart.scale.xScalePaddingLeft);
    resizeElements[ele].setAttribute('width', chart.scale.width - chart.scale.xScalePaddingLeft - chart.scale.xScalePaddingRight);
    resizeElements[ele].setAttribute('y', chart.scale.startPoint);
    resizeElements[ele].setAttribute('height', chart.scale.endPoint - chart.scale.startPoint);
  }
  // resize slider
  document.getElementById('slider-range').setAttribute(
    'style', 'margin-left: ' + chart.scale.xScalePaddingLeft + 'px; width: ' +
    (chart.scale.width - chart.scale.xScalePaddingLeft - chart.scale.xScalePaddingRight) + 'px');
}

function loadControls(arraySize){
  arraySize = arraySize -1;
  $(function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: arraySize,
      values: [ 0, arraySize ],
      slide: function( event, ui ) {
        var startIndex = Number(ui.values[0]);
        var endIndex = Number(ui.values[1]);
        var leftPadding = Number(getBackground().getAttribute('x'));
        var width = Number(getBackground().getAttribute('width'));
        getSelection().setAttribute("x",leftPadding + (startIndex * ( width / arraySize)));
        getSelection().setAttribute("width",(endIndex - startIndex) * (width / arraySize));
      }
    });
  });
}
