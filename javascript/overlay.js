function split(rect){
  // split the current rectangle in half (width), then copy it and place to to the right
  rect.setAttribute('width',rect.getAttribute('width') / 2);
  var attributes = {
    'x':parseInt(rect.getAttribute('width')) + parseInt(rect.getAttribute('x')),
    'y':rect.getAttribute('y'),
    'width':rect.getAttribute('width'),
    'height':rect.getAttribute('height')
  };
  makeSVG(rect,'rect',attributes);
}

function moveSelectionRight(){
  var selection = document.getElementById("selection");
  selection.setAttribute('id','');
  selection.nextElementSibling.setAttribute('id','selection');
}

function moveSelectionLeft(){
  var selection = document.getElementById("selection");
  selection.setAttribute('id','');
  selection.previousElementSibling.setAttribute('id','selection');
}

function makeSVG(brother, type, attributes){
  var svgElement = document.createElementNS("http://www.w3.org/2000/svg",type);
  for (i in attributes){
    svgElement.setAttribute(i,attributes[i]);
  }
  brother.parentNode.insertBefore(svgElement,brother.nextElementSibling);
}

function getSelection(){return document.getElementById("selection")}
 
