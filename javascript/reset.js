//Reset text color and border outline color
var resetText= function(){
  document.getElementsByTagName("body")[0].style.color = "#000000";
  document.getElementById("textColorInput").value= "";
  document.getElementById("continuosBox").style.border = "3px solid black";
  document.getElementById("audioSpanSec").style.borderBottom = "3px solid black";
  document.getElementById("summaryBox").style.borderTop="3px solid black";
  document.getElementById("bgColorChange").style.borderTop="3px solid black";
  if(document.getElementById("textContrast").checked){
    document.getElementsByTagName("body")[0].style.background = "url('stylesheets/halftone/halftone.png')";
  }
}

//Reset site background. If high contrast is checked, reset text color as well.
//Also resets border outline color
var resetSiteBg = function(){
  var black = "#000000";
  document.getElementsByTagName("body")[0].style.background = "url('stylesheets/halftone/halftone.png')";
  if(document.getElementById("siteContrast").checked)
    resetText();
  else{
    document.getElementById("continuosBox").style.border = "3px solid black";
    document.getElementById("audioSpanSec").style.borderBottom = "3px solid black";
    document.getElementById("summaryBox").style.borderTop="3px solid black";
    document.getElementById("bgColorChange").style.borderTop="3px solid black";
  }
  document.getElementById("siteColorInput").value = "";
}

//Resets graph background color as well as graph label text color
var resetGraphBg = function(){
  document.getElementById("graphCC").style.background = "url('stylesheets/halftone/halftone.png')";
  chart.options.scaleFontColor = findContrastor("#FFFFFF");
  chart.buildScale(chart.scale.xLabels);
  chart.update();
  document.getElementById("graphColorInput").value="";
  if(!checkWarningLabels()){
    alert("Some dataset colors may be difficult to see due to low color contrast");
  }   
}

//Check for reset text button event
var textKeyUp = function(event){
  event = event || window.event;
  if(event){
    if (event.keyCode === 32 || event.keyCode===13) {
      resetText();
    }
  }
}

//Check for reset graph button event
var graphKeyUp = function(event){
  event = event || window.event;
  if(event){
    if (event.keyCode === 32 || event.keyCode===13) {
      resetGraphBg();
    }
  }
}

//Check for reset site background button event
var siteKeyUp = function(event){
    event = event || window.event;
    if(event){
      if (event.keyCode === 32 || event.keyCode===13) {
        resetSiteBg();
      }
    }
}

//Change site background color based on input value
var changeSiteBg = function(){
  var newColor = document.getElementById("siteColorInput").value;
  if(/^#[0-9A-F]{6}$/i.test(newColor)){
    document.getElementsByTagName("body")[0].style.background = newColor;
    if(document.getElementById("siteContrast").checked){
      var contrastor = findContrastor(newColor);
      document.getElementsByTagName("body")[0].style.color = contrastor;
      document.getElementById("continuosBox").style.border = "3px solid " + contrastor;
      document.getElementById("audioSpanSec").style.borderBottom = "3px solid " + contrastor;
      document.getElementById("summaryBox").style.borderTop="3px solid " +contrastor;
      document.getElementById("bgColorChange").style.borderTop="3px solid " + contrastor;
    }
  }
  else if(/^#[0-9A-F]{6}$/i.test(colors[newColor.toLowerCase().split(' ').join('')])){
    document.getElementsByTagName("body")[0].style.background = colors[newColor.toLowerCase().split(' ').join('')];
    if(document.getElementById("siteContrast").checked){
      var contrastor = findContrastor(colors[newColor.toLowerCase().split(' ').join('')]);
      document.getElementsByTagName("body")[0].style.color = contrastor;
      document.getElementById("continuosBox").style.border = "3px solid " + contrastor;
      document.getElementById("audioSpanSec").style.borderBottom = "3px solid " + contrastor;
      document.getElementById("summaryBox").style.borderTop="3px solid " +contrastor;
      document.getElementById("bgColorChange").style.borderTop="3px solid " + contrastor;
    }
  }
}

//Change graph background based on input value
var changeGraphBg = function(){
  var newColor = document.getElementById("graphColorInput").value;
  var contrast = true;
  if(/^#[0-9A-F]{6}$/i.test(newColor)){
    document.getElementById("graphCC").style.background = newColor;
    if(document.getElementById("graphContrast").checked){
      chart.options.scaleFontColor = findContrastor(newColor);
      chart.buildScale(chart.scale.xLabels);
      chart.update();
    }
    if(!checkWarningLabels()){
      alert("Some dataset colors may be difficult to see due to low color contrast");
    }
  }
  else if(/^#[0-9A-F]{6}$/i.test(colors[newColor.toLowerCase().split(' ').join('')])){
    document.getElementById("graphCC").style.background = colors[newColor.toLowerCase().split(' ').join('')];
    if(document.getElementById("graphContrast").checked){
      chart.options.scaleFontColor = findContrastor(colors[newColor.toLowerCase().split(' ').join('')]);
      chart.buildScale(chart.scale.xLabels);
      chart.update();
    }
    if(!checkWarningLabels()){
      alert("Some dataset colors may be difficult to see due to low color contrast");
    }
  }
}

//Change text color based on input value
var changeTextColor = function(){
  var newColor = document.getElementById("textColorInput").value;
  if(/^#[0-9A-F]{6}$/i.test(newColor)){
    document.getElementsByTagName("body")[0].style.color = newColor;
    document.getElementById("continuosBox").style.border = "3px solid " + newColor;
    document.getElementById("audioSpanSec").style.borderBottom = "3px solid " + newColor;
    document.getElementById("summaryBox").style.borderTop="3px solid " +newColor;
    document.getElementById("bgColorChange").style.borderTop="3px solid " + newColor;
    if(document.getElementById("textContrast").checked)
      document.getElementsByTagName("body")[0].style.background = findContrastor(newColor);
  }
  else if(/^#[0-9A-F]{6}$/i.test(colors[newColor.toLowerCase().split(' ').join('')])){
    newColor = colors[newColor.toLowerCase().split(' ').join('')]
    document.getElementsByTagName("body")[0].style.color = newColor;
    document.getElementById("continuosBox").style.border = "3px solid " + newColor;
    document.getElementById("audioSpanSec").style.borderBottom = "3px solid " + newColor;
    document.getElementById("summaryBox").style.borderTop="3px solid " +newColor;
    document.getElementById("bgColorChange").style.borderTop="3px solid " + newColor;
    if(document.getElementById("textContrast").checked)
      document.getElementsByTagName("body")[0].style.background = findContrastor(newColor);
  }
}

//Check and update warning labels on colors
var checkWarningLabels = function(){
  var graphBg = document.getElementById("graphCC").style.background;
  graphBg = convertRGBtoHex(graphBg.substring(0,graphBg.indexOf(")")+1));
  if(isNaN(calcContrast(graphBg,"#000000"))){
    graphBg = "#F4F2E9";
  }
  var noWarnings = true;
  for(var i = 0; i < chart.datasets.length; i++){
    var a = document.getElementById("colors").firstChild;
    var warning = document.getElementById("warning"+i);
    var color = chart.datasets[i].strokeColor;
    color = convertRGBtoHex(color);
    if(calcContrast(graphBg,color)>1.5){
      if(warning){
        warning.style = "display:none;";
      }
    }
    else{
      noWarnings = false;
      if(warning){
        warning.style = "position: relative; left: -6.2%; color: red;";
      }
      else{
        for(var j = 0; j<i; j ++){
          a = a.nextSibling;
        }
        var input = a.firstChild.nextSibling.nextSibling.nextSibling;
        var newElem = document.createElement('i');
        newElem.setAttribute("id","warning" + i);
        newElem.setAttribute("class","fa fa-exclamation-triangle");
        newElem.style = "position: relative; left: -6.2%; color: red;";
        newElem.setAttribute("aria-label", "Caution line color may not be visible on graph");
        newElem.setAttribute("tab-index", "0");
        input.parentNode.insertBefore(newElem,input.nextSibling);
      }
    }
  }
  return noWarnings;
}