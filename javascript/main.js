"use strict"; // strict mode syntax

//Any file that requires jQuery should be
//placed within this annon function
require(["libs/jquery/jquery-1.11.2.js"],function(jquery) {
  require(["libs/jquery/jquery-ui.js"]);
  require(["libs/SlickGrid/lib/jquery.event.drag-2.2.js"],function(drag) {
    require(["libs/SlickGrid/slick.core.js"], function(core) {
      require(["libs/SlickGrid/slick.editors.js"]);
      require(["libs/SlickGrid/lib/firebugx.js"]);
      require(["javascript/slickTable.js"]);
      require(["libs/SlickGrid/slick.grid.js"]);
    });
  });
});

require(["libs/PapaParse/papaparse.min.js"]);
require(["libs/chartjs/Chart.js"]);

require(["libs/jsfx/audio.js"], function (audio) {
    require(["libs/jsfx/jsfx.js"]);
    require(["libs/jsfx/jsfxlib.js"]);
});

require(["javascript/files.js"], function(print){
  loadListener();
  createListener();
});

require(["javascript/chart.js"]);
require(["javascript/overlay.js"]);
require(["javascript/arrayInfo.js"]);
require(["javascript/audioPlayer.js"]);
require(["javascript/arrayCollection.js"]);
require(["javascript/global.js"]);
require(["javascript/summary.js"]);

var player;
var overlay;
var summary;
var chart;
var type = null;
var lineColors = [];
// initial data load
// (this is called after fileOpen from files.js)
var loadData = function (data) {
    document.querySelector('#overlay').setAttribute('style', '');
    document.querySelector('#slickTable').innerHTML = '';
    var slickTable = loadSlickTable(data.data);
    chart = loadChart(data.data, type);
    player = new AudioPlayer();
    overlay = new Overlay(data);
    overlay.updateSize(chart);
    var collection = new ArrayCollection(data.data);
    player.setCollection(collection.collection);
    summary = new DataSummary(collection);
    summary.dataSummary();
    linkSlickTable(chart, player, overlay, summary);
    document.getElementById('color-expand').style.display = 'block';
    document.getElementById('plot-header').style.display = 'block';
    document.getElementById('tableControls').style.display = 'block';
    document.getElementById('rTypeSel').style.display = 'block';
}

// The play button
var playStopAudioButton = function () {
    player.playToggle(document.getElementById("lineDropdown").value - 1, overlay.slider[0], overlay.slider[1]);
}

// Opens the color editor
var openColorEditor = function () {
    var editor = document.getElementById('color-editor');
    editor.style.display = editor.style.display == 'inline' ? 'none' : 'block';
}
//Download CSV file of current chart
    function download() {
        var s;
        //retrieve chart data and put into a csv file
        if(type === "line" || type === "scatter"){
			for (var i = 0; i < chart.datasets.length; i++) {
				for (var j = 0; j < chart.datasets[i].points.length; j++) {
					if (i === 0 && j === 0) {
						for (var k = 0; k < chart.datasets[i].points.length; k++) {
							s += chart.datasets[i].points[k].label;
							if (k + 1 < chart.datasets[i].points.length)
								s += ",";
						}
						s += chart.datasets[i].points[j].value;
						if (j + 1 < chart.datasets[i].points.length)
							s += ",";
					}
					s += "\n";
				}
			}
		}
		else if (type === "bar") {
            for (var i = 0; i < chart.datasets.length; i++) {
                for (var j = 0; j < chart.datasets[i].bars.length; j++) {
                    if (i === 0 && j === 0) {
                        for (var k = 0; k < chart.datasets[i].bars.length; k++) {
                            s += chart.datasets[i].bars[k].label;
                            if (k + 1 < chart.datasets[i].bars.length) s += ",";
                        }
                        s += "\n";
                    }
                    s += chart.datasets[i].bars[j].value;
                    if (j + 1 < chart.datasets[i].bars.length) s += ",";
                }
                s += "\n";
            }

        }
        s = s.substring(9); //Do this to remove strange 'undefined' that is appended to beginning of file
        var pom = document.createElement('a');
        pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(s));
        pom.setAttribute('download', "Data Analyzer.csv");
        pom.style.display = 'none';
        document.body.appendChild(pom);
        pom.click();
        document.body.removeChild(pom);


        document.body.removeChild(pom);
    }
    
    //File Alert Box
    function CustomAlert() {
        this.render = function (dialog) {
          var winW = window.innerWidth;
          var winH = window.innerHeight;
          var dialogoverlay = document.getElementById('dialogoverlay');
          var dialogbox = document.getElementById('dialogbox');
          dialogoverlay.style.display = "block";
          dialogoverlay.style.height = winH + "px";
          dialogbox.style.left = (winW / 2) - (550 * .5) + "px";
          dialogbox.style.top = "100px";
          dialogbox.style.display = "block";
          document.getElementById('dialogboxhead').innerHTML = "Data Analyzer";
          document.getElementById('dialogboxbody').innerHTML = dialog + "<select><option onclick='Alert.ok()' value='graphSelect'>select a type of graph</option><option value='Line'>Line Graph</option><option value='Bar'>Bar Graph</option><option value='scatter'>Scatter Plot</option></select>";
          document.getElementById('dialogboxfoot').innerHTML = "<button onclick='Alert2.cancel()'>Cancel</button><button onclick='Alert.ok()'>Submit</button>"
          document.getElementById('dialogbox').style.visibility = "visible";
          document.getElementById('dialogoverlay').style.visibility = "visible";
        }
        this.ok = function () {
          var e = document.getElementById('dialogboxbody').firstChild.nextSibling;
          type = e.options[e.selectedIndex].value.toLowerCase();
          loadFile();
          if (type === "line") document.getElementById("lineRadioButton").checked = true;
          else if (type === "bar") document.getElementById("barRadioButton").checked = true;
          else if (type === "scatter") document.getElementById("scatterRadioButton").checked = true;
          document.getElementById('dialogbox').style.visibility = "hidden";
          document.getElementById('dialogoverlay').style.visibility = "hidden";
          document.getElementsByClassName('uploadBtn')[0].focus();
        }
        this.cancel= function(){
          document.getElementById('dialogbox').style.visibility = "hidden";
          document.getElementById('dialogoverlay').style.visibility = "hidden";
          document.getElementsByClassName('createBtn')[0].focus();
        }
    }

    function CustomAlert2() {
        this.render = function (dialog) {
            var winW = window.innerWidth;
            var winH = window.innerHeight;
            var dialogoverlay = document.getElementById('dialogoverlay');
            var dialogbox = document.getElementById('dialogbox');
            dialogoverlay.style.display = "block";
            dialogoverlay.style.height = winH + "px";
            dialogbox.style.left = (winW / 2) - (550 * .5) + "px";
            dialogbox.style.top = "100px";
            dialogbox.style.display = "block";
            document.getElementById('dialogboxhead').innerHTML = "Data Analyzer";
            document.getElementById('dialogboxbody').innerHTML = dialog + "<select><option onclick='Alert2.ok()' value='graphSelect'>select a type of graph</option><option value='Line'>Line Graph</option><option value='Bar'>Bar Graph</option><option value='scatter'>Scatter Plot</option></select><br><label>Choose number of row: </label><input id='rows' type='text' value='0' /><br><label>Choose number of column: </label><input id='columns' type='text' value='0' />";
            document.getElementById('dialogboxfoot').innerHTML = "<button onclick='Alert2.cancel()'>Cancel</button><button onclick=Alert2.reset()>Reset</button><button onclick='Alert2.ok()'>Submit</button>";
            document.getElementById('dialogbox').style.visibility = "visible";
            document.getElementById('dialogoverlay').style.visibility = "visible";
        }
        this.ok = function () {
            var e = document.getElementById('dialogboxbody').firstChild.nextSibling;
            type = e.options[e.selectedIndex].value.toLowerCase();
            createFile(document.getElementById('rows').value, document.getElementById('columns').value);
            if (type === "line") document.getElementById("lineRadioButton").checked = true;
            else if (type === "bar") document.getElementById("barRadioButton").checked = true;
            else if (type === "scatter") document.getElementById("scatterRadioButton").checked = true;
            document.getElementById('dialogbox').style.visibility = "hidden";
            document.getElementById('dialogoverlay').style.visibility = "hidden";
            document.getElementsByClassName('createBtn')[0].focus();
        }
        this.reset = function () {
            document.getElementById("rows").value=0;
            document.getElementById("columns").value=0;
        }
        this.cancel= function(){
          document.getElementById('dialogbox').style.visibility = "hidden";
          document.getElementById('dialogoverlay').style.visibility = "hidden";
          document.getElementsByClassName('createBtn')[0].focus();
        }
    }
var Alert = new CustomAlert();
var Alert2 = new CustomAlert2();


//Radio Button Chart/Graph Type Selection
var rType = function (rType) {
    var selType = document.getElementById("rTypeSel");
    if (selType.firstChild.nextSibling.checked) type = "line";
    else if (document.getElementById("barRadioButton").checked) {
        type = "bar";
    } else if (document.getElementById("scatterRadioButton").checked) {
        type = "scatter";
    }
        document.getElementById("colors").innerHTML="";
        changeType();

}
