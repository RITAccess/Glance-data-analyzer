var updateRowDropDown = function(){
	var dropdownString = "";
	for(var i = 0; i < chart.datasets.length; i++) {
		var rowName = grid.getData()[i+1][0];
		if(rowName.indexOf("Row") > -1){
			dropdownString += "<option value="+(i+1)+">"+(i+1)+"</option>"
		}
		else {
			dropdownString += "<option value="+(rowName)+">"+(rowName)+"</option>"
		}
	}
	//if(document.getElementById("lineDropdown").innerHTML.length != dropdownString.length)
	  document.getElementById("lineDropdown").innerHTML = dropdownString;
}

//checks and clears color boxes when firefox caches
var checkColorBoxes = function(){
  var siteEl = document.getElementById("siteColorInput");
  var graphEl = document.getElementById("graphColorInput");
  var textEl = document.getElementById("textColorInput");
  siteEl.value = "";
  graphEl.value = "";
  textEl.value = "";
}


// Opens the color editor
var openColorEditor = function () {
    var editor = document.getElementById('colors');
    editor.style.display = editor.style.display == 'inline' ? 'none' : 'block';
}

var focusElement = function(elementClass) {
  document.getElementsByClassName(elementClass)[0].style.backgroundColor = "#000";
  document.getElementsByClassName(elementClass)[0].style.color = "#FFF";
}

var blurElement = function(elementClass) {
  document.getElementsByClassName(elementClass)[0].style.backgroundColor = "#FFF";
  document.getElementsByClassName(elementClass)[0].style.color = "#000";
}
//Make column selector if play by columns play type in bar graph is chosen
var makeColSelector = function(){
  if(document.getElementById("barGraphAudioOptions").selectedIndex === 1 && !document.getElementById("colSelector") && type==="bar"){
    var selector = document.createElement("select");
    selector.setAttribute("id", "colSelector");
    selector.setAttribute("class","drop-down");
    for(var i = 0; i < chart.datasets[0].bars.length; i ++){
      var option = document.createElement("option");
      option.setAttribute("value", i);
      option.innerHTML = chart.datasets[0].bars[i].label;
      selector.appendChild(option);
    }
    var label = document.createElement("label");
    label.setAttribute("id","colNumLabel");
    label.innerHTML = " Column ";
    document.getElementById("audioSpanBar").appendChild(label);
    document.getElementById("audioSpanBar").appendChild(selector);
  }
  else if(document.getElementById("colSelector")){
    var c = document.getElementById('colSelector');
    var p =  c.parentNode;
    p.removeChild(c);
    var c = document.getElementById("colNumLabel");
    p.removeChild(c);
  }
}
