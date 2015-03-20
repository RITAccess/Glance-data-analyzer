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

function loadControls(arraySize){
  arraySize = arraySize -1;
  $(function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: arraySize,
      values: [ Math.ceil((1/3)*arraySize), Math.ceil((2/3)*arraySize) ],
      slide: function( event, ui ) {
        getSelection().setAttribute("x",22 + ui.values[0] * (getBackground().getAttribute("width")/arraySize));
        getSelection().setAttribute("width",(ui.values[1] - ui.values[0]) * (getBackground().getAttribute("width")/arraySize));
      }
    });
  });
}
