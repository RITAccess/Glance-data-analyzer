var hot1 = null;
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

var linkChart = function(chart){
  //local hook (has same effect as a callback)
  hot1.addHook('afterChange', function(changes, source) {
    for (var changeNum = 0; changeNum < changes.length; changes++){
      // changes[changeNum] = [row, col, old, new]
      var newValue = changes[changeNum][3];
      if (changes[changeNum][0]-1 == -1){
        // the change was in a label
        for (var row = 0; row < chart.datasets.length-1; row++){// TODO why not the last one?
          chart.datasets[row].points[changes[changeNum][1]].label = newValue;
        }
      }
      // if new value isn't a number, revert to old value.
      else if (!isNaN(newValue)){
        // change value
        chart.datasets[changes[changeNum][0]-1].points[changes[changeNum][1]].value = newValue;
      } else {
        // revert to old value
        hot1.setDataAtCell(changes[changeNum][0],changes[changeNum][1],changes[changeNum][2]);
      }
      chart.update();
    }
  });
}
