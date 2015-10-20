var updateRowDropDown = function(){
	var dropdownString = "";
	for(var i = 0; i < chart.data.datasets.length; i++) {
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
    for(var i = 0; i < chart.data.datasets[0].bars.length; i ++){
      var option = document.createElement("option");
      option.setAttribute("value", i);
      option.innerHTML = chart.data.datasets[0].bars[i].label;
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

var initUI = function(data){
  document.getElementById('tableCount').innerHTML = "[ Total Row: " + (data.data.length - 1) + " ] [ Total Column: " + (data.data[0].length - 1) + " ]";
    document.getElementById('remInstruction').innerHTML = "*To remove specific row or column: delete the contents in the chosen label cells.";
    if(chart && type === "bar"){
      if(document.getElementById('barGraphAudioOptions')){
        var c = document.getElementById('barGraphAudioOptions');
        var p =  c.parentNode;
        p.removeChild(c);
        var c = document.getElementById('playModeLabel');
        p.removeChild(c);
        if(document.getElementById("colSelector")){
          var c = document.getElementById('colSelector');
          var p =  c.parentNode;
          p.removeChild(c);
          var c = document.getElementById("colNumLabel");
          p.removeChild(c);
          }
        }
      convertPointsToBars();
      if(!document.getElementById("barGraphAudioOptions")){
        var newddm = document.createElement("select");
        newddm.setAttribute("id","barGraphAudioOptions");
        newddm.setAttribute("class","drop-down");
        var option = document.createElement("option");
        option.setAttribute("value","0");
        option.innerHTML = "Normal";
        newddm.appendChild(option);
        option = document.createElement("option");
        option.setAttribute("value","1");
        option.innerHTML = "Play by column";
        newddm.appendChild(option);
        if(!isSafari){
          option = document.createElement("option");
          option.setAttribute("value","2");
          option.innerHTML = "Play columns as chords";
          newddm.appendChild(option);
        }
        var label = document.createElement("label");
        label.innerHTML = "Play mode ";
        label.setAttribute("id","playModeLabel");
        document.getElementById("audioSpanBar").appendChild(label);
        document.getElementById("audioSpanBar").appendChild(newddm);
        newddm.setAttribute("onchange", "makeColSelector()");
      }
    }
    else if(type === "line"){
      if(document.getElementById('barGraphAudioOptions')){
        var c = document.getElementById('barGraphAudioOptions');
        var p =  c.parentNode;
        p.removeChild(c);
        var c = document.getElementById('playModeLabel');
        p.removeChild(c);
        if(document.getElementById("colSelector")){
          var c = document.getElementById('colSelector');
          var p =  c.parentNode;
          p.removeChild(c);
          var c = document.getElementById("colNumLabel");
          p.removeChild(c);
        }
      }
      convertPointsToScatter();

    }
    else{
      convertPointsToScatter();
      if(!document.getElementById("barGraphAudioOptions")){
        var newddm = document.createElement("select");
        newddm.setAttribute("id","barGraphAudioOptions");
        newddm.setAttribute("class","drop-down");
        var option = document.createElement("option");
        option.setAttribute("value","0");
        option.innerHTML = "Normal";
        newddm.appendChild(option);
        option = document.createElement("option");
        option.setAttribute("value","1");
        option.innerHTML = "Play Regression Line";
        newddm.appendChild(option);
        var label = document.createElement("label");
        label.innerHTML = "Play mode ";
        label.setAttribute("id","playModeLabel");
        document.getElementById("audioSpanBar").appendChild(label);
        document.getElementById("audioSpanBar").appendChild(newddm);
        newddm.setAttribute("onchange", "makeColSelector()");
      }
      else{
       if(document.getElementById('barGraphAudioOptions')){
        var c = document.getElementById('barGraphAudioOptions');
        var p =  c.parentNode;
        p.removeChild(c);
        var c = document.getElementById('playModeLabel');
        p.removeChild(c);
        if(document.getElementById("colSelector")){
          var c = document.getElementById('colSelector');
          var p =  c.parentNode;
          p.removeChild(c);
          var c = document.getElementById("colNumLabel");
          p.removeChild(c);
          }
        }
        var newddm = document.createElement("select");
        newddm.setAttribute("id","barGraphAudioOptions");
        newddm.setAttribute("class","drop-down");
        var option = document.createElement("option");
        option.setAttribute("value","0");
        option.innerHTML = "Normal";
        newddm.appendChild(option);
        option = document.createElement("option");
        option.setAttribute("value","1");
        option.innerHTML = "Play Regression Line";
        newddm.appendChild(option);
        var label = document.createElement("label");
        label.innerHTML = "Play mode ";
        label.setAttribute("id","playModeLabel");
        document.getElementById("audioSpanBar").appendChild(label);
        document.getElementById("audioSpanBar").appendChild(newddm);
        newddm.setAttribute("onchange", "makeColSelector()");
      }
    }
}