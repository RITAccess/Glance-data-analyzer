// Move the Left and Right boundaries of the box to form the selection
function moveLeftMarginLeft(){
  modifyAttribute(getSelection(),'x',-10);
  modifyAttribute(getSelection(),'width',10,0);
}
function moveLeftMarginRight(){
  modifyAttribute(getSelection(),'x',10);
  modifyAttribute(getSelection(),'width',-10,0);
}
function moveRightMarginLeft(){
  modifyAttribute(getSelection(),'width',-10,0);
}
function moveRightMarginRight(){
  modifyAttribute(getSelection(),'width',10);
}

function makeSVG(previousNode, type, attributes){
  // makes svg elements and inserts them as siblings of the node (previousNode) provided.
  var svgElement = document.createElementNS("http://www.w3.org/2000/svg",type);
  for (i in attributes){
    svgElement.setAttribute(i,attributes[i]);
  }
  previousNode.parentNode.insertBefore(svgElement,previousNode.nextElementSibling);
}

// modifies an attribute of an element (to a number value).
// min and max are optional values
function modifyAttribute(element,attribute,modification,min,max){
  var value = Number(element.getAttribute(attribute)) + modification;
  if (min !== undefined) {value = Math.max(min,value)}
  if (max !== undefined) {value = Math.min(max,value)}
  element.setAttribute(attribute,value);
}

function getSelection(){return document.getElementById("selection")}
var key = [];
onkeydown = onkeyup = function(e){
  e = e || event;
  key[e.keyCode] = e.type == 'keydown';
  if (key[72]){ // hit h
    moveLeftMarginLeft();
  }
  if (key[74]) { // hit j
    moveLeftMarginRight();
  }
  if (key[75]) { // hit k
    moveRightMarginLeft();
  }
  if (key[76]) { // hit l
    moveRightMarginRight();
  }
}
