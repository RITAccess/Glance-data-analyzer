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
require(["javascript/prompts.js"]);
require(["javascript/printer.js"]);

var player;
var overlay;
var summary;
var chart;
var type = null;
var lineColors = [];
var slickTable;
// initial data load
// (this is called after fileOpen from files.js)
var loadData = function (data) {
    document.getElementById('start').style.display = 'none';
    document.querySelector('#overlay').setAttribute('style', '');
    document.querySelector('#slickTable').innerHTML = '';
    slickTable = loadSlickTable(data.data);
    document.getElementById('tableCount').innerHTML = "[ Total Row: " + (data.data.length - 1) + " ] [ Total Column: " + (data.data[0].length - 1) + " ]";
    document.getElementById('remInstruction').innerHTML = "*To remove specific row or column: delete the contents in the chosen labels cell"
    chart = loadChart(data.data, type);
    player = new Instrument(2);
    overlay = new Overlay(data);
    overlay.updateSize(chart);
    var collection = new ArrayCollection(data.data);
    player.setCollection(collection.collection);
    summary = new DataSummary(collection);
    summary.dataSummary();
    linkSlickTable(chart, player, overlay, summary);
    document.getElementById('content').style.position = "inherit"; //overides corresponding style in index.html that hides the content tag
    document.getElementById('content').style.top = ""; // meant to leave it blank: to overide corresponding style in index.html that hides the content tag
    document.getElementById('content').style.left = ""; // meant to leave it blank: to overide corresponding style in index.html that hides the content tag
    document.getElementById('rTypeSelBody').style.display = 'block';
    document.getElementById('plot-header').style.display = 'inline';
    document.getElementById('tableControls').style.display = 'block';
    document.getElementById('summaryBox').style.display = 'block';
    fixSlick();
}

console.warn = function(){};

// The play button
var playStopAudioButton = function () {
    var bpm = 80 + 40 * document.getElementById('bpm').value;
    player.bpm = bpm;
    if(overlay.slider[0] === 0 && overlay.slider[1] === 0){
      overlay.slider[1] = chart.datasets[0].length;
    }
    player.playToggle(document.getElementById("lineDropdown").value - 1, overlay.slider[0], overlay.slider[1]);
}

// Opens the color editor
var openColorEditor = function () {
    var editor = document.getElementById('summary-editor');
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
