// Split and combine the selection into multiple parts to create multiple parts listen to
function split(rect){
  // split the current rectangle in half (width), then copy it and place to to the right
  // if rect is empty, do split on selection element
  if (rect === undefined){ rect = getSelection() }
  rect.setAttribute('width',rect.getAttribute('width') / 2);
  var attributes = {
    'x':Number(rect.getAttribute('width')) + Number(rect.getAttribute('x')),
    'y':rect.getAttribute('y'),
    'width':rect.getAttribute('width'),
    'height':rect.getAttribute('height')
  };
  makeSVG(rect,'rect',attributes);
}

function union(rect1,rect2){
  // union rectangle 1 and 2, (they must be next to each other)
  if (rect1 === undefined) { rect1 = getSelection(); } // if rect1 is not defined, use selection
  if (rect2 === undefined) { rect2 = rect1.nextElementSibling; } // if rect2 is not defined, use rect1 sibling
  if (rect2 === null) { return } // if no elements on the left or right of rect1, do nothing
  rect1.setAttribute('id',rect1.getAttribute('id') || "" + rect2.getAttribute('id') || "");
  rect1.setAttribute('x',Math.min(rect1.getAttribute('x'),rect2.getAttribute('x')));
  rect1.setAttribute('width',Math.max(
    Number(rect1.getAttribute('x')) + Number(rect1.getAttribute('width')),
    Number(rect2.getAttribute('x')) + Number(rect2.getAttribute('width'))) -
    Math.min(rect1.getAttribute('x'), rect2.getAttribute('x'))
  );
  rect1.setAttribute('x',Math.min(rect1.getAttribute('x'),rect2.getAttribute('x')));
  rect2.parentNode.removeChild(rect2);
}

function moveSelectionRight(){
  // moves the selection one element to the right
  var selection = document.getElementById("selection");
  if (selection.nextElementSibling !== null){
    selection.setAttribute('id','');
    selection.nextElementSibling.setAttribute('id','selection');
  }
}

function moveSelectionLeft(){
  // moves the selection one element to the left
  var selection = document.getElementById("selection");
  if (selection.previousElementSibling !== null){
    selection.setAttribute('id','');
    selection.previousElementSibling.setAttribute('id','selection');
  }
}

function makeSVG(previousNode, type, attributes){
  // makes svg elements and inserts them as siblings of the node (previousNode) provided.
  var svgElement = document.createElementNS("http://www.w3.org/2000/svg",type);
  for (i in attributes){
    svgElement.setAttribute(i,attributes[i]);
  }
  previousNode.parentNode.insertBefore(svgElement,previousNode.nextElementSibling);
}

function getSelection(){return document.getElementById("selection")}

// Should key presses be assigned to h,l,k,j? (left, right, intersect, union)
var key = function (e) {
  e = e || window.event;
  var keyPress = e.keyCode || e.which;
  if (keyPress == 72) { // hit h
    moveSelectionLeft();
  };
  if (keyPress == 76) { // hit l
    moveSelectionRight();
  };
  if (keyPress == 75) { // hit k
    split();
  };
  if (keyPress == 74) { // hit j
    union();
  }
};
document.onkeydown = key;
