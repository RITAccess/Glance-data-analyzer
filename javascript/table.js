"use strict"; // strict mode syntax
var hot1 = null;
// initial table properties, after getting the data from the file.
var loadTable = function(fileData){
  /*
    Handsontable
  */
  var container1 = document.getElementById('table');
  var settings1 = { data: fileData };
  hot1 = new Handsontable(container1, settings1);
  hot1.render();

  function bindDumpButton() {

    Handsontable.Dom.addEvent(document.body, 'click', function (e) {

      var element = e.target || e.srcElement;

      if (element.nodeName == "BUTTON" && element.name == 'dump') {
        var name = element.getAttribute('data-dump');
        var instance = element.getAttribute('data-instance');
        var hot = window[instance];
        console.log('data of ' + name, hot.getData());
      }
    });
  }
  bindDumpButton();
  return hot1;
}

// links the table object with the chart, the player, and the overlay
var linkTable = function(chart, player, overlay, summary){
  //local hook (has same effect as a callback)
  hot1.addHook('afterChange', function(changes, source) {
    // changes[changeNum] = [row, col, old, new]
    for (var changeNum = 0; changeNum < changes.length; changes++){
      //check to see if any changes were made
      if(changes[changeNum][2] != changes[changeNum][3]){
        var newValue = changes[changeNum][3];
        if (changes[changeNum][0]-1 == -1){
          // the change was in a label
          for (var row = 0; row < chart.datasets.length; row++){
            // TODO How many labels do I actually have to update
            console.log(chart.datasets[row].points[changes[changeNum][1]].label);
            chart.datasets[row].points[changes[changeNum][1]].label = newValue;
          }
        }
        // if new value isn't a number, revert to old value.
        else if ((!isNaN(newValue)) && (newValue != "")){
          //Update audio with new value
          player.changeLine(changes[changeNum][0] - 1,changes[changeNum][2],changes[changeNum][3]);
          // change value
          chart.datasets[changes[changeNum][0]-1].points[changes[changeNum][1]].value = newValue;
        } else {
          // revert to old value
          hot1.setDataAtCell(changes[changeNum][0],changes[changeNum][1],changes[changeNum][2]);
        }
        chart.update();
        overlay.updateSize(chart);
      }
    }
  });
}
