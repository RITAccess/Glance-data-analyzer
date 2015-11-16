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

require(["javascript/chart.js"]);
require(["javascript/overlay.js"]);
require(["javascript/arrayInfo.js"]);
require(["javascript/arrayCollection.js"]);
require(["javascript/global.js"]);
require(["javascript/summary.js"]);
require(["javascript/prompts.js"]);
require(["javascript/printer.js"]);
require(["javascript/reset.js"]);
require(["javascript/contrast.js"]);
require(["javascript/audioControls.js"]);
require(["javascript/UI.js"]);

require(["javascript/files.js"], function(print){
  loadListeners();
  //createListener();
  //loadListener();
});

var player;
var overlay;
var summary;
var chart;
var collection;
var type = null;
var lineColors = [];
var slickTable;
var uncheckCalled = false;
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor')>0;
// initial data load
// (this is called after fileOpen from files.js)
var loadData = function (data) {
    document.getElementById('myChart').style.display = 'inline';
    document.getElementById('start').style.display = 'none';
    document.querySelector('#overlay').setAttribute('style', '');
    document.querySelector('#slickTable').innerHTML = '';
    slickTable = loadSlickTable(data.data);
    var tempData = [];
    for(var i = 0; i < data.data.length; i++){
      tempData[i] = [];
      for(var j = 0; j<data.data[i].length; j++){
        if(i>0)
          tempData[i][j] = parseFloat(data.data[i][j]);
        else
          tempData[i][j] = data.data[i][j];
      }
    }
    chart = loadChart(tempData, type);
    if(oldGraphText){
    chart.scales['x-axis-0'].options.labels.fontColor = oldGraphText;
      chart.scales['y-axis-0'].options.labels.fontColor = oldGraphText;
    }
    initUI(data);
    if(Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0)
      player = new WaveForm("sine");
    else
      player = new Instrument(1);
    overlay = new Overlay(data, type);
    overlay.updateSize(chart);
    collection = new ArrayCollection(tempData);
    player.setCollection(collection.collection);
    summary = new DataSummary(collection);
    summary.dataSummary();
    linkSlickTable(chart, player, overlay, summary);
    document.getElementById('instrumentDropdown').innerHTML = "";
    if(!isSafari){
      for(var i = 1; i < 128; i ++){
        var newElem = document.createElement("option");
        newElem.value = i;
        newElem.innerHTML = instruments[i];
        document.getElementById('instrumentDropdown').appendChild(newElem);
      }
    }
    else{
      var waves = ["Sine Wave","Triangle Wave","Square Wave","Sawtooth Wave"];
      for(var i = 0; i < waves.length; i ++){
        var newElem = document.createElement("option");
        newElem.value = waves[i];
        newElem.innerHTML = waves[i];
        document.getElementById('instrumentDropdown').appendChild(newElem);
      }
    }
    document.getElementById("content").style.position = 'inherit'; //overides corresponding style in index.html that hides the content tag
    document.getElementById("content").style.top = ''; // meant to leave it blank: to overide corresponding style in index.html that hides the content tag
    document.getElementById("content").style.left = ''; // meant to leave it blank: to overide corresponding style in index.html that hides the content tag
    document.getElementById('typeSelBody').style.display = 'block';
    document.getElementById('audioHeader').style.display = 'inherit';
    document.getElementById('graphHeader').style.display = 'inherit';
    document.getElementById('plot-header').style.display = 'inherit';
    document.getElementById('tableControls').style.display = 'inherit';
    document.getElementById('summary-header').style.display = 'inherit';
    document.getElementById('bgColorChange').style.display = 'inherit';
    var jumpElements = document.getElementsByClassName("pageJump");
    for(var i = 0; i < jumpElements.length; i++){
      jumpElements[i].style.display = "inline";     
    }
    fixSlick();
    if(type === "line"){
      document.getElementById('typeSel').selectedIndex = 0;
    }
    else if(type === "bar"){
      document.getElementById('typeSel').selectedIndex = 1;
    }
    else{
      document.getElementById('typeSel').selectedIndex = 2;
    }
    checkWarningLabels();
    checkColorBoxes();

    oldColor = document.getElementsByTagName("body")[0].style.color;
    oldGraphColor = chart.options.scaleFontColor;
    oldBGColor = document.getElementsByTagName('body')[0].style.background;
    if(!uncheckCalled){
      uncheckBoxes();
      uncheckCalled= true;
    }
    updateRowDropDown();
}
