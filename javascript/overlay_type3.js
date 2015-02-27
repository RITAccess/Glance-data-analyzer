// Move the middle cursor, and expand the selection
function moveCursorLeft(){
  modifyAttribute(getSelection(),'x',-10);
  modifyAttribute(getCursor(),'x1',-10);
  modifyAttribute(getCursor(),'x2',-10);
}
function moveCursorRight(){
  modifyAttribute(getSelection(),'x',10);
  modifyAttribute(getCursor(),'x1',10);
  modifyAttribute(getCursor(),'x2',10);
}
function decreaseSelection(){
  modifyAttribute(getSelection(),'width',-10);
  modifyAttribute(getSelection(),'x',5);
}
function increaseSelection(){
  modifyAttribute(getSelection(),'width',10);
  modifyAttribute(getSelection(),'x',-5);
}

function makeSVG(previousNode, type, attributes){
  // makes svg elements and inserts them as siblings of the node (previousNode) provided.
  var svgElement = document.createElementNS("http://www.w3.org/2000/svg",type);
  for (i in attributes){
    svgElement.setAttribute(i,attributes[i]);
  }
  previousNode.parentNode.insertBefore(svgElement,previousNode.nextElementSibling);
}

function modifyAttribute(element,attribute,modification){
  element.setAttribute(attribute,Number(element.getAttribute(attribute)) + modification);
}

function getSelection(){return document.getElementById("selection")}
function getCursor(){return document.getElementById("cursor")}

// Should key presses be assigned to h,l,k,j? (left, right, intersect, union)
var key = function (e) {
  e = e || window.event;
  var keyPress = e.keyCode || e.which;
  if (keyPress == 72) { // hit h
    moveCursorLeft();
  };
  if (keyPress == 74) { // hit j
    moveCursorRight();
  };
  if (keyPress == 75) { // hit k
    decreaseSelection();
  };
  if (keyPress == 76) { // hit l
    increaseSelection();
  }
};
document.onkeydown = key;
